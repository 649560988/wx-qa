// pages/firstPart/firstPart.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree_sign:false,
    status:{},
    show:false,
    processnameSource:[],
    schoolName:'',
    subiectSource:[],
    isCommit:false,
    workPlaceCity:[],
    academyCity:[],
    academyName:[],
    academyNameList:[],
    name: '',
    gender: '',
    birth: '',
    marryStatus: '',
    habitation: [],
    workPlace: [],
    academy: [],
    education: '',
    subject: '',
    professionalName: '',
    showErroe: '',
    errorMessage: '',
    timer_switch: false,
    habitationProvinces: [],
    habitationCity: [],
    url:'',
    wechatid:'',
    searchContent:{},
    isUpload:false,
    educationList: [{
        name: 1,
      value: '硕士研究生及以上'
      },
      {
        name: 2,
        value: '大学本科'
      },
      {
        name: 3,
        value: '大学专科'
      },
      {
        name: 4,
        value: '高中/中专/技校'
      },
      {
        name: 5,
        value: '初中'
      },
      {
        name: 6,
        value: '小学及以下'
      },
    ]
  },
  initValidate() {
    let rules = {
      name: {
        required: true,
        maxlength: 10
      },
      englishName: {
        required: true
        // maxlength: '不能超过20个字'
      },
      nickname: {
        required: true
        // maxlength: '不能超过20个字'
      },
      gender: {
        required: true,
        number: true
      },
      birthday: {
        required: true
      },
      // marryStatus: {
      //   required: true,
      //   number: true
      // },
      // habitationProvince: {
      //   required: true
      // },
      // habitationCity: {
      //   required: true
      // },
      // 
      // workPlaceProvince: {
      //   required: true
      // },
      // workPlaceCity: {
      //   required: true
      // },
      education: {
        required: true,
        number: true
      },
      // subject: {
      //   required: true
      // },
      // professionalName: {
      //   required: true
      // },
      // academyProvince: {
      //   required: true
      // },
      // academyCity: {
      //   required: true
      // },
      academyName: {
        required: true
      },


    }

    let message = {
      name: {
        required: '请输入姓名',
        maxlength: '名字不能超过10个字'
      },
      englishName: {
        required: '请输入英文名',
        // maxlength: '不能超过20个字'
      },
      nickname: {
        required: '请输入昵称',
        // maxlength: '不能超过20个字'
      },
      gender: {
        required: "请选择您的性别",
        number: '请您选择您的性别'
      },
      birthday: {
        required: '请选择出生年月',
      },
      // marryStatus: {
      //   required: "请选择您的婚姻状况",
      //   number: '请选择您的婚姻状况'
      // },
      // habitationProvince: {
      //   required: "请选择您的居住城市"
      // },
      // habitationCity: {
      //   required: "请选择您的居住城市"
      // },
      // workPlaceProvince: {
      //   required: "请选择您的工做地点"
      // },
      // workPlaceCity: {
      //   required: "请选择您的工做地点"
      // },
      education: {
        required: "请选择您的学历",
        number: '请选择您的学历'
      },
      // subject: {
      //   required: "请输入您的学科"
      // },
      // professionalName: {
      //   required: "请输入您的专业名称"
      // },
      // academyProvince: {
      //   required: "请选择您的毕业学校"
      // },
      // academyCity: {
      //   required: "请选择您的毕业学校"
      // },
      academyName: {
        required: "请选择您的毕业学校"
      }
    }
    //实例化当前的验证规则和提示消息
    this.wxValidate = new wxValidate(rules, message);
  },
  
  // 按钮变为可选状态
  kexuan:function(e){
    console.log("滚动到底部了")
  },
  getProvinces: function() {
    let url = '/v1/school/provinces'
    api.get(url).then((res) => {
      this.setData({
        habitationProvinces: res.data,
        workPlaceProvinces: res.data,
        academyProvinces: res.data
      })
    })
  },
  getSubject:function(){
    let url = '/dictionary/first?question=' + '学科'
    api.get(url).then((res) => {
      console.log('res',res.data)
      this.setData({
        subiectSource: res.data
      })
    })
  },
  // setInterval()
  /**
   * 表单确认按钮
   */

  /**
   * 姓名
   */
  bindinputName(e) {
    let searchContent = this.data.searchContent
    let name=e.currentTarget.dataset.name
    if (name == 'englishName'){
      searchContent.englishName = e.detail.value
      this.setData({ englishName: e.detail.value})
    }
    else if (name == "nickname"){
      searchContent.nickname = e.detail.value
      this.setData({ nickname: e.detail.value })

    }
    else{
      searchContent.name = e.detail.value
      this.setData({name: e.detail.value })
    }
    this.setData({
      searchContent
    })
  },
  /**
   * 性别
   */
  bindGenderChange(e) {
    let searchContent = this.data.searchContent
    searchContent.gender = e.detail.value
    this.setData({
      gender: e.detail.value,
      searchContent
    })
  },
  /**
   * 出生日期
   */
  DateChange(e) {
    this.setData({
      birth: e.detail.value
    })
  },
  /**
   * 婚姻状况
   */
  bindMarryStatusChange(e) {
    let searchContent = this.data.searchContent
    searchContent.marryStatus = e.detail.value
    this.setData({
      marryStatus: e.detail.value,
      searchContent
    })
  },
  /**
   * 居住城市 -省
   */
  habitationProvincesChange: function(e) {
    console.log("habitationProvincesChange",e)
    let uid = this.data.habitationProvinces[e.detail.value].uid
    let list = this.data.habitation
    list[0] = this.data.habitationProvinces[e.detail.value].name
    let value = e.detail.value
    if(value == 0){
      let habitationCity = [{}]
      habitationCity[0].name = "北京城区"
      list[0] = "北京市"
      list[1] = "北京城区"
      this.setData({
        // searchContent,
        habitationCity,
        index1:0,
        index2: 0,
        habitation:list,
      })
      return 
    }
    else if(value == 1){
      let habitationCity = [{}]
      habitationCity[0].name = "天津城区"
      list[0] = "天津市"
      list[1] = "天津城区"
      this.setData({
        // searchContent,
        habitationCity,
        index1: 1,
        index2: 0,
        habitation: list,
      })
      return 
    }
    else if (value == 8) {
      let habitationCity = [{}]
      habitationCity[0].name = "上海城区"
      list[0] = "上海市"
      list[1] = "上海城区"
      this.setData({
        // searchContent,
        habitationCity,
        index1: 8,
        index2: 0,
        habitation: list,
      })
      return
    }
    else if (value == 21) {
      let habitationCity = [{}]
      habitationCity[0].name = "重庆城区"
      list[0] = "重庆市"
      list[1] = "重庆城区"
      this.setData({
        // searchContent,
        habitationCity,
        index1: 21,
        index2: 0,
        habitation: list,
      })
      return
    }
    let url = '/v1/school/cities?pid=' + uid
    api.get(url).then((res) => {
      this.setData({
        habitationCity: res.data,
        index1: e.detail.value,
        habitation: list,
        index2: ''
      })
    })
  },
  /**
   * 居住城市 - 市
   */
  habitationCityChange: function(e) {
    let list = this.data.habitation
    list[1] = this.data.habitationCity[e.detail.value].name
    this.setData({
      index2: e.detail.value,
      habitation: list
    })
  },
  /**
   * 您期望的工作地点 -省
   */
  workPlaceProvincesChange: function(e) {
    let uid = this.data.workPlaceProvinces[e.detail.value].uid
    let list = this.data.workPlace
    list[0] = this.data.workPlaceProvinces[e.detail.value].name
    let url = '/v1/school/cities?pid=' + uid
    api.get(url).then((res) => {
      this.setData({
        workPlaceCity: res.data,
        index3: e.detail.value,
        index4: '',
        workPlace: list
      })
    })
  },
  /**
   * 您期望的工作地点 -市
   */
  workPlaceCityChange: function(e) {
    let list = this.data.workPlace
    list[1] = this.data.workPlaceCity[e.detail.value].name
    this.setData({
      index4: e.detail.value,
      workPlace: list
    })
  },
  /**
   * 最高学历学历
   */
  bindeducationChange(e) {
    this.setData({
      education: e.detail.value
    })
  },
  /**
   * 学科
   */
  bindsubjectChange(e) {
    let subject = this.data.subiectSource[e.detail.value]
    let url = '/dictionary/second?sectionLevel=' + subject
    api.get(url).then((res) => {
      console.log('res', res.data)
      this.setData({
        processnameSource: res.data,
        professionalName:''
      })
    })
    this.setData({
      subject
    })
  },
  /**
   * 专业名称
   */
  bindprofessionalChange(e) {
    let professionalName = this.data.processnameSource[e.detail.value]
    this.setData({
      professionalName
    })
  },

  /**
   * 毕业学校 省份
   */
  academyProvincesChange: function (e) {
    let schoolName = this.data.schoolName
    let uid = this.data.academyProvinces[e.detail.value].uid
    let list = this.data.academy
    list[0] = this.data.academyProvinces[e.detail.value].name
    let url = '/v1/school/cities?pid=' + uid
    schoolName=''
    api.get(url).then((res) => {
      this.setData({
        academyCity: res.data,
        index5: e.detail.value,
        index6: '',
        academy:list,
        schoolName
      })
    })
  },
    /**
   * 毕业学校 市
   */
  academyCityChange: function (e) {
    let schoolName = this.data.schoolName
    schoolName = ''
    let list = this.data.academy
    let value = []
    list[1] = this.data.academyCity[e.detail.value].name
    let academyCityPid = this.data.academyCity[e.detail.value].uid
    let url = '/v1/school/schools?pid=' + academyCityPid
    api.get(url).then((res) => {
      res.data.forEach(function(item,index){
       value.push(item.name)
      })
      this.setData({
        academyName: value,
        index6: e.detail.value,
        academy:list,
        schoolName
      })
    })
  },
  /**
   * 毕业学校 名称
   */
  handAcademyName(e){
    if(e.detail.value!=''){
      this.setData({
        show: true
      })
    }else{
      this.setData({
        show: false
      })
    }
    let value=[]
    let schoolName = e.detail.value
    this.getReadySchool(schoolName)
    // let searchContent = this.data.searchContent
    // searchContent.academy = schoolName
    // if (this.data.academyName.length != 0) {
    //   list[2] =e.detail.value
    // }
    // this.data.academyName.forEach(function(item){
    //   if (item.indexOf(e.detail.value)>-1){
    //     value.push(item)
    //   }
    // })
    this.setData({
      schoolName,
      // searchContent
    })
  },
  // 获取待选学校列表
  getReadySchool:function(name){
    console.log("学校名称",name)
    let that = this
    if(name){
      let url = "/v1/school/schools/keyword?keyword=" + name
      api.get(url).then(function (res) {
        if(res.data.length>0){
          that.setData({
            academyNameList: res.data,
          })
        }else{
         console.log("学校不存在") 
          that.setData({
            academyNameList: [],
          })
        }
      })
    }
  },
  selectShowItem(e) {
    let schoolName = this.data.schoolName
    // let list = this.data.academy
    // if (this.data.academyName.length != 0) {
    //   list[2] = this.data.academyNameList[e.currentTarget.dataset.mmindex]
    //   schoolName = this.data.academyNameList[e.currentTarget.dataset.mmindex]
    // }
    let searchContent = this.data.searchContent
    let academyNameList = this.data.academyNameList
    let index = e.currentTarget.dataset.mmindex
    searchContent.academy = academyNameList[index]
    schoolName = academyNameList[index]
    console.log("下拉框选择的学校名称",schoolName)
    this.setData({
      // academy: list,
      searchContent,
      schoolName,
      show: false
    })
  },

autoCommit(){
  let value={}
  console.log("同意并上传")
  value.birthday=this.data.birth
  value.name = this.data.name;
  value.nickname = this.data.nickname
  value.englishName = this.data.englishName
  value.gender = this.data.gender;
  value.marryStatus = this.data.marryStatus

  value.habitation = this.data.habitation.join("|")
  value.academy = this.data.schoolName

  value.workPlace = this.data.workPlace.join("|")
  value.education = this.data.education;
  value.subject = this.data.subject;
  value.professionalName = this.data.professionalName;
  console.log("上传的数据",value)
    let url = '/v1/answerBankBase'
    try {
      if (this.data.status.base) {
        let userIdEnc = wx.getStorageSync('userIdEnc')
        value.id = userIdEnc
        api.put(url, value).then((res) => {
          // wx.showToast({
          //   title: '更新成功',
          //   icon: 'success',
          //   duration: 2000
          // })

        })
      } else {
        value.wechatId = this.data.wechatid
        console.log('wechatId', this.data.wechatid)
        api.post(url, value).then((res) => {
          console.log('res',res.data)
          // wx.showToast({
          //   title: '保存成功',
          //   icon: 'success',
          //   duration: 2000
          // })
          wx.setStorage({
            key: "userIdEnc",
            data: res.data.id
          })
        })
      }
    } catch (e) {
      console.log(e)
    }
},
  // 滚动位置：
  // 查询元素位置
  find_position: function (e) {
    const query = wx.createSelectorQuery()
    query.select(e).boundingClientRect()
    query.selectViewport().scrollOffset()
    let pos = null
    query.exec(function (res) {
      console.log("元素位置", res)
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      let miss = res[1].scrollTop + res[0].top - 100;
      console.log("Math.abs(res[0].bottom)", miss)
      wx.pageScrollTo({
        // selector:'#expectPost',
        scrollTop: miss,
        duration: 300
      })
    })
  },
  // 滚动到必选项
  scroll: function (name) {
    console.log("滚动到", '#' + name)
    this.find_position('#'+name)
    this.setData({
      redname: '#' + name
          })
  },
  handSubmit(e){
    let params = e.detail.value;
    console.log('params', params)
    if (!this.wxValidate.checkForm(params)) {
      //表单元素验证不通过，此处给出相应提示
      let error = this.wxValidate.errorList[0];
      switch (error.param) {
        case "name":
          this.shoewErrorMessage(error.msg)
          this.scroll('name')
          break;
        case "englishName":
          this.shoewErrorMessage(error.msg)
          this.scroll('englishName')
          break;
        case "nickname":
          this.shoewErrorMessage(error.msg)
          this.scroll('nickname')
          break;
        case "gender":
          this.shoewErrorMessage(error.msg)
          this.scroll('gender')
          break;
        case "birthday":
          this.shoewErrorMessage(error.msg)
          this.scroll('birthday')
          break;
        case "marryStatus":
          this.shoewErrorMessage(error.msg)
          break;
        case "subject":
          this.shoewErrorMessage(error.msg)
          break;
        case "education":
          this.shoewErrorMessage(error.msg)
          this.scroll('education')

          break;
        case "professionalName":
          this.shoewErrorMessage(error.msg)
          break;
        case "habitationProvince":
          this.shoewErrorMessage(error.msg)
          break;
        case "habitationCity":
          this.shoewErrorMessage(error.msg)
          break;
        case "workPlaceProvince":
          this.shoewErrorMessage(error.msg)
          break;
        case "workPlaceCity":
          this.shoewErrorMessage(error.msg)
          break;
        case "academyProvince":
          this.shoewErrorMessage(error.msg)
          break;
        case "academyCity":
          this.shoewErrorMessage(error.msg)
          break;
        case "academyName":
          this.shoewErrorMessage(error.msg)
          this.scroll('academyName')
          break;
      }
      return
    }else{
      console.log("全部通过显示弹窗")
      this.showModal2('DialogModal1')
      this.setData({
        redname:''
      })

    }
  },
  // 只控制 协议弹
  showModal2(name) {
    this.setData({
      modalName: name
    })
  },
  agree:function(e){
    let agree_sign = this.data.agree_sign
    if (agree_sign){
      this.autoCommit()
      wx.navigateTo({
        url: '../fifthPart/fifthPart',
      })
    }
    else{
      this.hideModal()
          wx.showToast({
            title: '同意方可继续填写',
            duration: 2000
          })
    }

  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * educationChange 最高学历单选框
   */
  educationChange:function(e){
    console.log("educationChange",e)
    let that = this
    let index = e.currentTarget.dataset.index
    let searchContent = that.data.searchContent
    let education = that.data.education
    education = index
    searchContent.education = index
    that.setData({
      searchContent,
      education,
    })
    that.hideModal()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate();
    this.getProvinces();
    this.getSubject();
    let wechatid = wx.getStorageSync('wechatid')
    if (wechatid) {
      console.log('wechatid', wechatid)
      this.setData({
        wechatid,
      })
    }
    let status = wx.getStorageSync('status')
    if (status.base) {
      this.searchContent(wechatid)
      this.setData({
        status
      })
    }
  },
  // 改变change_agree
  change_agree:function(e){
    let agree_sign = true
    console.log("agree_sign的状态",agree_sign)

    this.setData({
      agree_sign
    })
  },
  searchContent(wechatid){
    let _this = this
    let url = '/v1/answerBankBase?wechatId=' + wechatid
    api.get(url).then((res) => {
      if(res.data!=null){
        wx.setStorage({
          key: "userIdEnc",
          data: res.data.id
        })
        let searchContent = {}
        console.log("res.data",res.data)
        searchContent = res.data
        searchContent.nickname = res.data.nickname
        searchContent.englishName = res.data.englishName
        
        searchContent.workPlaceShen = res.data.workPlace.split('|')[0]
        searchContent.workPlaceShi = res.data.workPlace.split('|')[1]
        searchContent.habitationShen = res.data.habitation.split('|')[0]
        searchContent.habitationShi = res.data.habitation.split('|')[1]
        searchContent.academy = res.data.academy
        _this.setData({
          searchContent: res.data,
          birth: res.data.birthday.substring(0, 10),
          name: res.data.name,
          nickname: res.data.nickname,
          englishName: res.data.englishName,
          gender: res.data.gender,
          marryStatus: res.data.marryStatus,
          schoolName:res.data.academy,
          habitation: [searchContent.habitationShen, searchContent.habitationShi],
          workPlace: [searchContent.workPlaceShen, searchContent.workPlaceShi],
          academy: [searchContent.academyShen, searchContent.academyShi, searchContent.academyXuex],
          education: res.data.education,
          subject: res.data.subject,
          professionalName: res.data.professionalName
        })
      }
     
    })
  },
  shoewErrorMessage(mes) {
    wx.showToast({
      title: mes,
      icon: 'none',
      duration: 2000
    })
  },
    /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏")
    this.hideModal()
  },
})
