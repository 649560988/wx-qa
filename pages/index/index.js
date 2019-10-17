//index.js
//获取应用实例
import replace from '../../utils/replaceSpecialChar.js'
import wxValidate from '../../utils/wxValidate.js'
const app = getApp()
import api from '../../utils/http.js'
Page({
  data: {
    my_width: app.globalData.my_width,
    my_height: app.globalData.my_height,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isbind: false,
    openid: '',
    code: '',
    hasCode: true,
    phone: '',
    status: [],
    second: 60
  },
  /**
   * 校验函数
   * app.globalData.StatusBar
   */
  initValidate() {
    let rules = {
      phone: {
        required: true,
        tel: true
      },
      code: {
        required: true
      }
    }

    let message = {
      phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号'
      },
      code: {
        required: '请输入验证码',
      }

    }
    //实例化当前的验证规则和提示消息
    this.wxValidate = new wxValidate(rules, message);
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.initValidate();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log('onLoad')
  },
  wxLogin:function(){
    let _this = this
    wx.login({
      success(res) {
        console.log('正在获取绑定信息')
        if (res.code) {
          let url = '/login?code=' + res.code
          api.get(url).then((res1) => {
            console.log('login',res1)
            _this.setData({
              openid: res1.openid
            })
            _this.checkoutOpenid(res1.openid)
            wx.setStorage({
              key: "wechatid",
              data: res1.openid
            })
          }).catch(e => {
            console.log('wx.login', e)
          })
          //发起网络请求
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '正在获取绑定信息',
    })
    let wechatid = wx.getStorageSync('wechatid')
    let userIdEnc = wx.getStorageSync('userIdEnc')
    if (wechatid && userIdEnc){
      this.checkoutOpenid(wechatid)
      this.setData({
        openid: wechatid
      })
    }else{
      console.log('为重新加载数据')
      this.wxLogin()
    }
  },
  getUserInfo: function (e) {
    console.log('getUserInfo')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  checkoutOpenid(openid) {
    let _this = this
    let url = '/bind/wechatId?wechatId=' + openid
    console.log('openid', openid)
    api.get(url).then((res) => {
      let arr = Object.keys(res.data);
      console.log('res.data', res.data)
      if (arr.length == 0) {
        _this.setData({
          isbind: true
        })
      } else {
        // if (res.data.status.base) {
          let url = '/v1/answerBankBase?wechatId=' + openid
          api.get(url).then((res) => {
            console.log('userIdEnc', res.data.id)
            wx.setStorage({
              key: "userIdEnc",
              data: res.data.id
            })
          })
        // }
        console.log('status', res.data.status)

        wx.setStorage({
          key: "status",
          data: res.data.status
        })
        _this.setData({
          status: res.data.status
        })
      }
    }).catch(e => {
      console.log('checkoutOpenid', e)
    })
    wx.hideLoading()
  },
  formSubmit(e) {
    let _this = this
    let params = e.detail.value;
    let value = {};
    if (!this.wxValidate.checkForm(params)) {
      //表单元素验证不通过，此处给出相应提示
      let error = this.wxValidate.errorList[0];
      switch (error.param) {
        case "phone":
          this.shoewErrorMessage(error.msg)
          //TODO
          break;
        case "code":
          this.shoewErrorMessage(error.msg)
          //TODO
          break;
      }
      return false;
    } else {
      value.phone = this.data.phone
      value.wechatId = this.data.openid
      let url = '/bind?code=' + params.code
      api.post(url, value).then((res) => {
        _this.checkoutOpenid(_this.data.openid)
        _this.setData({
          isbind: false
        })
      }).catch(e => {
        console.log('formSubmit', e)
      })
    }
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handGetCode() {
    let _this = this
    // let value = {}
    // value.phone = this.data.phone
    if (this.data.phone == '' || this.data.phone == null){
      this.shoewErrorMessage('请输入手机号码');
      return false
    }
    // value.code = '1'
    // if (!this.wxValidate.checkForm(value)) {
    //   //表单元素验证不通过，此处给出相应提示
    //   let error = this.wxValidate.errorList[0];
    //   switch (error.param) {
    //     case "phone":
    //       this.shoewErrorMessage(error.msg)
    //       //TODO
    //       break;
    //   }
    //   return false;
    // }
    let url = '/bind/sendCode?phone=' + this.data.phone + '&wechatId=' + this.data.openid
    api.put(url).then((res) => {
      if (res.data == true) {
        let second = _this.data.second
        let id = setInterval(function () {
          second = second - 1
          _this.setData({
            second,
          })
        }, 1000)
        setTimeout(function () {
          clearInterval(id)
          _this.setData({
            second: 60,
          })
        }, 60000)
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        console.log('111155555')
      }
    }).catch(e=>{
      console.log('handGetCode',e)
    })
  },
  shoewErrorMessage(mes) {
    wx.showToast({
      title: mes,
      icon: 'none',
      duration: 2000
    })
  },
  handClickFirst() {
    wx.navigateTo({
      url: '../firstPart/firstPart',
    })
  },
  handClickSecond() {
    if (this.data.status.base) {
      wx.navigateTo({
        url: '../fifthPart/fifthPart',
      })
    } else {
      this.shoewErrorMessage('第一部分必填')
    }
  },
  handClickThird() {
    if (this.data.status.base) {
      wx.navigateTo({
        url: '../secondPart/secondpart',
      })
    } else {
      this.shoewErrorMessage('第一部分必填')
    }

  },
  handClickFourth() {
    if (this.data.status.base) {
      wx.navigateTo({
        url: '../thirdPart/thirdPart',
      })
    } else {
      this.shoewErrorMessage('第一部分必填')
    }

  },
  handClickFifth() {
    if (this.data.status.base) {
      wx.navigateTo({
        url: '../fourthPart/fourthPart',
      })
    } else {
      this.shoewErrorMessage('第一部分必填')

    }

  },
  handClickSixth() {
    if (this.data.status.base) {
      wx.navigateTo({
        url: '../sixthPart/sixthPart',
      })
    } else {
      this.shoewErrorMessage('第一部分必填')
    }
  },
})