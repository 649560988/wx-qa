// pages/order/order.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[
      '深圳南山区科苑南路2666号中国华润大厦',
      '北京东长安街1号东方广场',
      '上海市静安区东海广场3号楼'
    ],
  },
  /**
 * 校验函数
 */
  initValidate() {
    let rules = {
      address: {
        required: true,
      },
      date: {
        required: true
      },
      time:{
        required: true
      }
    }
    let message = {
      address: {
        required: '请选择预约地址',
      },
      date: {
        required: '请输入验证码',
      },
      required: {
        required: '请选择时间',
      }
    }
    //实例化当前的验证规则和提示消息
    this.wxValidate = new wxValidate(rules, message);
  },
  /**
   * 预约时间
   */
  DateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 预约地址
   */
  handAddressChange(e){
    this.setData({
        index:e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit(e){
    let _this = this
    let params = e.detail.value;
    let value = {};
    console.log('params', params)
    if (!this.wxValidate.checkForm(params)) {
      //表单元素验证不通过，此处给出相应提示
      let error = this.wxValidate.errorList[0];
      switch (error.param) {
        case "address":
          this.shoewErrorMessage(error.msg)
          //TODO
          break;
        case "date":
          this.shoewErrorMessage(error.msg)
          //TODO
          break;
      }
      return false;
    } else {
      let date = params.date.split('-')
      let time = params.time.split(':')
      let yueyueTime = Date.UTC(date[0], date[1] - 1, date[2], time[0] - 8, time[1])
      let wechatid = wx.getStorageSync('wechatid')
      if (wechatid) {
        let url = '/bind/sendOrderInfo?address=' + this.data.address[params.address] + '&date=' + yueyueTime + '&wechatId=' + wechatid
        api.put(url, value).then((res) => {
          if(res.data==true){
            wx.redirectTo({
              url: '../finish/finish',
            })
            wx.showToast({
              title: '预约成功',
              icon: 'sucess',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '预约失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }
  },
  onLoad:function(){
    this.initValidate();
  },
  shoewErrorMessage(mes) {
    wx.showToast({
      title: mes,
      icon: 'none',
      duration: 2000
    })
  },
})