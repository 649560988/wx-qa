// pages/fifthPart/fifthPart.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
import replace from '../../utils/replaceSpecialChar.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar: ["客户1", "客户2", "客户3"],
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    wenxinHeight:0,
    wenxin:"温馨提示：在这一部分，我们邀请您填写您最熟悉的三个重点客户，以便我们后续为您提供针对性的任务匹配及商机推送。本部分数据仅会用于后台计 算，不会以任何形式提供给第三方，但数据的真实性和完整性将会影响后续任务匹配及商机推开的优先级，还请您认真填写。",
    tianxie:"填写说明：本部分数据仅用于后台计算，不会以任何形式对其他第三方进行展示。该部分数据的真实性将会影响匹配效果和您在平台的可置信。",
    //默认展示页面
    current_tags:"tag1",
    // 弹窗显示的开关
    xianshi_switch:false,
    signParent:0,
    signChild:0,
    showError:'',
    
    current_buttom:'3',
    customernameList:[],
    status:[],
    customername:'',
    isCheckout: false,
    customer: [],
    enterpriseQuality:[],
    enterpriseQualitySource: [],
    organizationalCode: [],
    target: [],
    open:[false,false,false],
    cycle: [],
    amount: [],
    incomeScale: [],
    staffSize: [],
    budgetYear: [],
    countParent: 1,
    departmentList: [
      [], [], []
    ],
    dutyList: [
      [], [], []
    ],
    nameList: [
      [],[],[]
    ],
    telList: [
      [], [], []
    ],
    mailList: [
      [], [], []
    ],
    relationshipList: [
      [3], [3], [3]
    ],
    signYearList: [
      [], [], []
    ],
    targetParent: [
      [], [], []
    ],
    targetChild: [
      [], [], []
    ],
    targetOther: [
      [], [], []
    ],
    amountList: [
      [], [], []
    ],
    valueList: [],
    targetChildSource: [
        [], [], []
    ],
    isempty: true,
    signingRecordCount: [1, 1, 1],
    customerResourcesCertificateCount: [1,1,1],
    pictureList: [
      [
        []
      ],
      [
        []
      ],
      [
        []
      ],

    ],
    certificateIdList: [
      [
        []
      ],
      [
        []
      ],
      [
        []
      ],
    ],
    tempararycount: 0,
    userIdEnc: '',
    departmentSource: [
      '高层管理',
      'IT部',
      '研发部',
      '生产部',
      '采购部',
      '市场营销部',
      '销售部',
      '人力资源部',
      '财务部',
      '综合管理部',
      '其他'
    ],
    dutySource: [
      'CEO', 'VP/CXO', '总监', '经理', '专员'
    ],
    amountSource: ['100万以内', '100-500万', '500-1000万', '1000万以上'],
    relationshipSource: [
      {
      name: 1,
        value: '1-语音通话超过3次/面谈1次'
    },
      {
        name: 2,
        value: '  2-面谈超过1次'
      },
      {
        name: 3,
        value: '  3-有过单次非公场合共处90分钟以上的经历'
      },
      {
        name: 4,
        value: ' 4-有过单次私聊超过60分钟的经历'
      },
      {
        name: 5,
        value: ' 5-双方有背靠背的互信和达成合作的明确策略/计划'
      },
    ],
  },
  // 改变当前标签 
  changeCurrentTag:function(e){
    let tag_name = e.currentTarget.dataset.name
    this.setData({
      current_tags:tag_name
    })
  },
  getTargetParentFirst() {
    let url = '/dictionary/first?question=' + '负责产品/服务'
    api.get(url).then((res) => {
      this.setData({
        targetParentSource: res.data
      })
    })
  },
  /**
   * 
   */
handInput(e){
this.setData({
  customername: e.detail.value
})
  },
  handGetCode(name,parentindex){
     let _this=this
    wx.request({
      url: 'https://open.api.tianyancha.com/services/open/ic/baseinfo/2.0?name=' + name,
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization':'98730b45-26cb-4dd5-ac64-5375d7477cb5',
      },
      success(res) {
        if (res.statusCode === 200){
          console.log('res.data', res.data)
          if(res.data.result!=null){
            let value = _this.data.organizationalCode
            value[parentindex] = res.data.result.creditCode
            _this.setData({
              organizationalCode: value
            })
          }else{
            let value = _this.data.organizationalCode
            value[parentindex] = ''
            _this.setData({
              organizationalCode: value
            })
            wx.showToast({
              title: res.data.reason,
              icon: 'none',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(error) {
        console.log('error',error)
      }
    })
  },
  /**
   * 选择图片
   */
  myChooseImage(e){
    this.setData({
      modalName: "img_modal"
    })
      let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    this.setData({
      signParent: parentindex,
      signChild:index
    })
  },
  confirm_img:function(e){
    console.log("用户点击确定，上传图片")
    this.hideModal()
    this.myChooseImage2()
  },
  myChooseImage2:function() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        let parentValue = this.data.pictureList;
        let value=this.data.pictureList[this.data.signParent][this.data.signChild]
        value = value.concat(res.tempFilePaths)
        parentValue[this.data.signParent][this.data.signChild] = value
        this.setData({
          pictureList: parentValue
        })
        let _this = this
        res.tempFilePaths.forEach(function(item, mindex) {
          wx.uploadFile({
            url: 'https://topsales.top/custom/resources/certificate/upload', 
            filePath: tempFilePaths[0],
            name: 'file',
            success(value) {
              console.log('choseSucessvalue', value)
              let result = JSON.parse(value.data).data.id
              console.log('result', result)
              let certificateIdList = _this.data.certificateIdList;
              console.log('success-certificateIdList', _this.data.certificateIdList)
              let mvalue = _this.data.certificateIdList[_this.data.signParent][_this.data.signChild]
              mvalue = mvalue.concat(result)
              certificateIdList[_this.data.signParent][_this.data.signChild] = mvalue
              console.log("certificateIdList", certificateIdList)
              _this.setData({
                certificateIdList: certificateIdList
              })
            }
          })
        })
      }
    });
  },
  /**
   * 预览图片
   */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  /**
   * 删除图片
   */
  DelImg(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    console.log('index', index)
    console.log('parentindex', parentindex)

    wx.showModal({
      title: '确定删除',
      content: '确定要删除图片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.pictureList[parentindex][index].splice(e.currentTarget.dataset.mindex, 1);
          let delId = this.data.certificateIdList[parentindex][index][e.currentTarget.dataset.mindex]
          console.log('执行图片删除操作', delId)
          this.data.certificateIdList[parentindex][index].splice(e.currentTarget.dataset.mindex, 1);
          let url = '/custom/resources/certificate?certificateId=' + delId
          console.log('执行图片删除操作url', url)
          api.remove(url).then((res)=>{
  
          })
          this.setData({
            pictureList: this.data.pictureList,
            certificateIdList: this.data.certificateIdList
          })
        }
      }
    })
  },
  /**
   * 显示弹窗
   */
  showModal(e) {
    console.log('modalName', e.currentTarget.dataset.target)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  tianxie_showModal(name) {
    // console.log('modalName', e.currentTarget.dataset.target)
    this.setData({
      modalName: name
    })
  },
  /**
   * 隐藏弹窗
   */
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 部门人员添加
   */
  customerResourcesCertificateAdd(e) {
    let parentindex = e.currentTarget.dataset.parentindex
    let count = this.data.customerResourcesCertificateCount
    if (this.data.nameList[parentindex][count[parentindex] - 1] == null || this.data.nameList[parentindex][count[parentindex] - 1] == '') {
      this.showMessage('姓名不能为空')
      let num = count[parentindex] - 1
      let name = 'name' + parentindex + num
      this.setData({
        showError: name,
        currentTab: parentindex
      })
      this.scroll(name)
      return
    } else if (this.data.relationshipList[parentindex][count[parentindex]-1] == null) {
      this.showMessage('关系深度不能为空')
      return
    } else {
      let mrelationship=this.data.relationshipList
      let mycount = this.data.pictureList
    mrelationship[parentindex][count[parentindex]]=3
      let mCertificateIdList = this.data.certificateIdList
      mycount[parentindex].push([])
      mCertificateIdList[parentindex].push([])
      count[parentindex] = count[parentindex] + 1
      this.setData({
        customerResourcesCertificateCount: count,
        pictureList: mycount,
        certificateIdList: mCertificateIdList,
        relationshipList: mrelationship
      })
    }
  },
  customerResourcesCertificateDelete(e){
    let count = this.data.customerResourcesCertificateCount
    let parentindex = e.currentTarget.dataset.parentindex
    if (count[parentindex]===1){
      this.showMessage('已是最小值')
    }else{
      count[parentindex] = count[parentindex] - 1
      this.setData({
        customerResourcesCertificateCount: count,
      })
    }
  },
  showMessage(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 过往三年签单情况
   */
  signingRecordAdd(e) {
    let parentindex = e.currentTarget.dataset.parentindex
    let targetChildSource = this.data.targetChildSource
    let count = this.data.signingRecordCount
      count[parentindex] = count[parentindex] + 1
      this.setData({
        signingRecordCount: count,
      })
  },
  signingRecordDelete(e){
    let count = this.data.signingRecordCount
    let parentindex = e.currentTarget.dataset.parentindex
    if (count[parentindex] === 1) {
      this.showMessage('已是最小值')
    } else {
      count[parentindex] = count[parentindex] - 1
      this.setData({
        signingRecordCount: count,
      })
    }
  },
  /**
   *  客户全称
   */
  bindinputCustomer(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.customer
    if (e.detail.value == '' && this.data.open[parentindex]==true){
      console.log('open', this.data.open[parentindex])
      this.data.open[parentindex] = false
      this.setData({
        open: this.data.open[parentindex]
      })
    }
    value[parentindex] = e.detail.value
    this.setData({
      customer: value
    })
  },
  /**
   * 组织机构代码
   */
  bindinputOrganizationalCode(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.organizationalCode
    value[parentindex] = e.detail.value
    this.setData({
      organizationalCode: value
    })
  },
  /**
   * 公司收入规模
   */
  bindinputIncomeScale(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.incomeScale
    value[parentindex] = e.detail.value
    this.setData({
      incomeScale: value
    })
  },
  /**
   * 人员规模
   */
  bindinputStaffSize(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.staffSize
    value[parentindex] = e.detail.value
    this.setData({
      staffSize: value
    })
  },
  /**
   * 当年客户信息化预算 -项目标的
   */
  bindinputTarget(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.target
    value[parentindex] = e.detail.value
    this.setData({
      target: value
    })
  },
  /**
   * 当年客户信息化预算 -项目周期
   */
  bindinputCycle(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.cycle
    value[parentindex] = e.detail.value
    this.setData({
      cycle: value
    })
  },
  /**
   * 当年客户信息化预算 -项目金额
   */
  bindinputAmount(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.amount
    value[parentindex] = e.detail.value
    this.setData({
      amount: value
    })
  },
  /**
   * 所属部门
   */
  bindDepartmentChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.departmentList[parentindex];
    let parentValue = this.data.departmentList;
    if (index == 1) {
      if (value[index - 1] != this.data.departmentSource[e.detail.value]) {
        wx.showToast({
          title: '同一部门条线数据不少于三人，匹配权重系数将显著提升',
          icon: 'none',
          duration: 5000
        })
      }
    } else if (index == 2) {
      if (value[1] != this.data.departmentSource[e.detail.value] && value[1] != value[0]) {
        wx.showToast({
          title: '同一部门条线数据不少于三人，匹配权重系数将显著提升',
          icon: 'none',
          duration: 5000
        })
      }
    } else if (index > 2) {
      if (value[index - 1] != this.data.departmentSource[e.detail.value] && value[1] != value[index - 2]) {
        wx.showToast({
          title: '同一部门条线数据不少于三人，匹配权重系数将显著提升',
          icon: 'none',
          duration: 5000
        })
      }
    }
    value[index] = this.data.departmentSource[e.detail.value];
    parentValue[parentindex] = value
    this.setData({
      departmentList: parentValue
    })
  },
  /**
   * 职务
   */
  bindDutyChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.dutyList[parentindex];
    let parentValue = this.data.dutyList;
    console.log('e.detail.value', e.detail.value)
    value[index] = this.data.dutySource[e.detail.value];
    parentValue[parentindex] = value
    console.log('parentValue', parentValue)
    this.setData({
      dutyList: parentValue
    })
  },
  // 添加姓名
  bindNameChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.nameList[parentindex];
    let parentValue = this.data.nameList;
    value[index] = e.detail.value;
    parentValue[parentindex] = value
    this.setData({
      nameList: parentValue
    })
  },
  /**
   * 联系方式
   */
  bindTelChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.telList[parentindex];
    let parentValue = this.data.telList;
    value[index] = e.detail.value;
    parentValue[parentindex] = value
    this.setData({
      telList: parentValue
    })
  },
  /**
   * 
   */
  bindMailChange(e){
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.mailList[parentindex];
    let parentValue = this.data.mailList;
    value[index] = e.detail.value;
    parentValue[parentindex] = value
    this.setData({
      mailList: parentValue
    })
  },
  /**
   * 签单日期
   */
  handSignYearChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    console.log('parentindex', parentindex)
    console.log('index', index)
    let value = this.data.signYearList[parentindex];
    let parentValue = this.data.signYearList;
    value[index] = e.detail.value;
    parentValue[parentindex] = value
    this.setData({
      signYearList: parentValue
    })
  },
  /**
   * 产品类别
   */
  bindTargetParentChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    console.log('产品类别', this.data.targetParent)
    console.log('index', index)
    console.log('this.data.targetChildSource', this.data.targetChildSource)
    let value=this.data.targetParent[parentindex];
    let parentValue = this.data.targetParent;
    value[index] = this.data.targetParentSource[e.detail.value];
    parentValue[parentindex] = value
    console.log('parentValue', parentValue[parentindex][index])
    let _this = this
    this.setData({
      targetParent: parentValue
    })
    let url = '/dictionary/second?sectionLevel=' + this.data.targetParentSource[e.detail.value]
    api.get(url).then((res) => {
      let sourceValue = _this.data.targetChildSource
      let mvalue=res.data
      sourceValue[parentindex][index] = mvalue
      this.setData({
        targetChildSource: sourceValue
      })
    })
  },
/**
 * 产品选择
 */
  bindTargetChildChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value = this.data.targetChild[parentindex];
    let parentValue = this.data.targetChild;
    let otherValue = this.data.targetOther;
    otherValue[parentindex][index]=''
    value[index] = this.data.targetChildSource[parentindex][index][e.detail.value];
    parentValue[parentindex] = value
    this.setData({
      targetChild: parentValue,
      targetOther: otherValue
    })
  },
  bindTargetOther(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value
    let parentValue = this.data.targetOther;
    if (index == 0) {
      value = []
    } else {
      value = this.data.targetOther[parentindex];
    }
    value[index] = e.detail.value;
    parentValue[parentindex] = value
    this.setData({
      targetOther: parentValue
    })
  },
  /**
   * 签单金额
   */
  bindAmountChange(e) {
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let value
    let parentValue = this.data.amountList;
    if (index == 0) {
      value = []
    } else {
      value = this.data.amountList[parentindex];
    }
    value[index] = this.data.amountSource[e.detail.value];
    parentValue[parentindex] = value
    this.setData({
      amountList: parentValue
    })
  },
  /**
   * 校验数据
   */
  checkoutValue() {

  },
  /**
   * 数据汇总提交
   */
  formSubmit(e) {   
    console.log('this.data.certificateIdList', this.data.certificateIdList)
    let list=[]
    for (let i = 0; i < 3; i++) {
      let value = {}
      let temporaryCustomerResourceList = []
      let temporarySingerRecordList = []
      if (this.data.customer[i] == null || this.data.customer[i] == '') {
        this.shoewErrorMessage('客户全称不能为空')
        this.setData({
           showError:'custom'+i,
           currentTab:i
        })
        // this.scroll('custom' + i)
        wx.pageScrollTo({
          // selector:'#expectPost',
          scrollTop: 0,
          duration: 300
        })
        return
      }
      if (this.data.organizationalCode[i] == null || this.data.organizationalCode[i] == '') {
        this.shoewErrorMessage('组织机构不能为空')
        this.setData({
          showError: 'organizationalCode' + i,
          currentTab: i
        })
        wx.pageScrollTo({
          // selector:'#expectPost',
          scrollTop: 0,
          duration: 300
        })
        return
      }
      value.customer = this.data.customer[i]
      value.enterpriseQuality=this.data.enterpriseQuality[i]
      value.organizationalCode = this.data.organizationalCode[i]
      value.incomeScale = this.data.incomeScale[i]
      value.staffSize = this.data.staffSize[i]
      value.target = this.data.target[i]
      value.cycle = this.data.cycle[i]
      value.amount = this.data.amount[i]
      console.log('customerResourcesCertificateCount[i]', this.data.customerResourcesCertificateCount[i])
      for (let j = 0; j < this.data.customerResourcesCertificateCount[i]; j++) {
        let customerResourcesChildDTOS = {}
         if (this.data.nameList[i][j] == null || this.data.nameList[i][j] == '') {
          this.shoewErrorMessage('请输入姓名')
          let name='name'+i+j
           this.setData({
             showError: name,
             currentTab: i
           })
           this.scroll(name)
          return
        } 
        else if (this.data.relationshipList[i][j] == null || this.data.relationshipList[i][j] == '') {
          this.shoewErrorMessage('请选择关系深度')
          return
        } 
        else {
          customerResourcesChildDTOS.certificateIds = this.data.certificateIdList[i][j]
          customerResourcesChildDTOS.duty = this.data.dutyList[i][j]
          customerResourcesChildDTOS.department = this.data.departmentList[i][j]
          customerResourcesChildDTOS.name = this.data.nameList[i][j]
          customerResourcesChildDTOS.tel = this.data.telList[i][j]
          customerResourcesChildDTOS.relationship = this.data.relationshipList[i][j]
          customerResourcesChildDTOS.mail=this.data.mailList[i][j]
          customerResourcesChildDTOS.sort = j + 1
          temporaryCustomerResourceList[j] = customerResourcesChildDTOS
        }
      }
      for (let m = 0; m < this.data.signingRecordCount[i]; m++) {
        let signingRecordDTOS = {}
          signingRecordDTOS.signYear = this.data.signYearList[i][m]
        if (this.data.targetParent[i][m] == undefined && this.data.targetChild[i][m] == undefined){
          signingRecordDTOS.target=''+''
        } else if (this.data.targetParent[i][m] != undefined && this.data.targetChild[i][m] == undefined){
          signingRecordDTOS.target = this.data.targetParent[i][m] + '-'+''
         
        }else{
          signingRecordDTOS.target = this.data.targetParent[i][m] + '-' + this.data.targetChild[i][m]
        }
          signingRecordDTOS.amount = this.data.amountList[i][m]
          signingRecordDTOS.targetOther = this.data.targetOther[i][m]
          temporarySingerRecordList[m] = signingRecordDTOS
      }
      value.customerResourcesChildDTOS = temporaryCustomerResourceList
      value.signingRecordDTOS = temporarySingerRecordList
      value.baseId = this.data.userIdEnc
      value.sort = i + 1
      list[i] = value
    }
    console.log('value', list)
      if (this.data.status.customerResources) {
        let _this = this
        let delUrl = '/custom/resources/baseId?baseId=' + this.data.userIdEnc
        api.remove(delUrl).then((res) => {
          let addUrl = '/custom/resources/list'
          api.post(addUrl, list).then((res) => {
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            })
          })
        })
      } else {
        let addUrl = '/custom/resources/list'
        api.post(addUrl, list).then((res) => {
          let _this = this
          let status = _this.data.status
          status.customerResources = true
          wx.setStorage({
            key: "status",
            data: status
          })
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        })
      }
      wx.navigateTo({
        url: '../secondPart/secondpart',
      })
  },
  /**
   * 监听是开始判断是否填写
   */
  onLoad: function() {
    this.getTargetParentFirst()
    this.getEnterpriseQualitySource()
    let userIdEnc = wx.getStorageSync('userIdEnc')
    console.log('userIdEnc', userIdEnc)
    if (userIdEnc) {
      let status = wx.getStorageSync('status')
      if (status.customerResources) {
        this.searchContent(userIdEnc)
        console.log('status', status)
      }
      this.setData(({
        userIdEnc,
        status
      }))
    }
    let that = this;
    let query1 = wx.createSelectorQuery()
    let query2 = wx.createSelectorQuery()
    let mybutton = query2.select('#mybutton').boundingClientRect()
    let custom = query1.select('#cu-custom').boundingClientRect()
    mybutton.exec(function (res) {
      console.log('mybutton', res[0].height)
      that.setData({
        mybutton: res[0].height
      })
    })
    custom.exec(function (res) {
      that.setData({
        custom: res[0].height
      })
      console.log('cu-custom', res[0].height)
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let windowWidth = res.windowWidth; 
        let calc = res.screenHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        let windowHeight = res.windowHeight; 
        let statusBarHeight = res.statusBarHeight;
        console.log('高度自适应calc', calc)
        console.log('高度自适应windowHeight', windowHeight )
        console.log('高度自适应statusBarHeight', statusBarHeight)
      
        that.setData({
          winHeight: calc,
          statusBarHeight: statusBarHeight
        });
      }
    })
 
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    let that = this;
    that.setData({
      currentTab: e.detail.current
    });
    that.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    let that = this;
    if (that.data.currentTab > 3) {
      that.setData({
        scrollLeft: 300
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  },
  onShow: function () {
    console.log("页面显示")
    if(this.data.xianshi_switch){
      this.tianxie_showModal("DialogModal1")
      this.setData({
        xianshi_switch:false
      })
    }
  },
  /**
   * 给数组增加长度
   */
  addLength(){
    let mPictureList = this.data.pictureList
    let mCertificateIdList = this.data.certificateIdList
    let mDutyList = this.data.dutyList
    // console.log('mDutyList', mDutyList[])
    let mdepartmentList = this.data.departmentList
    mdepartmentList.push([])
    let mnameList = this.data.nameList
    mnameList.push([])
    let telList = this.data.telList
    telList.push([])
    let relationshipList = this.data.relationshipList
    relationshipList.push([])
    let signYearList = this.data.signYearList
    signYearList.push([])
    let targetParent = this.data.targetParent
    targetParent.push([])
    let targetChild = this.data.targetChild
    targetChild.push([])
    let targetOther = this.data.targetOther
    targetOther.push([])
    let amountList = this.data.amountList
    amountList.push([])
    mPictureList.push([
      []
    ])
    mCertificateIdList.push([
      []
    ])
    mDutyList.push([])
    this.setData({
      pictureList: mPictureList,
      certificateIdList: mCertificateIdList,
      dutyList: mDutyList,
      departmentList: mdepartmentList,
      nameList: mnameList,
      telList,
      relationshipList,
      signYearList,
      targetParent,
      targetChild,
      amountList,
      isCheckout: false,
      targetOther
    })
  },
  /**
   * 通过baseId来搜索已填写的信息
   */
  searchContent(baseId) {
    let url = '/custom/resources/baseId/' + baseId
    let _this = this
    let customerResourcesCertificateCount = this.data.customerResourcesCertificateCount
    let signingRecordCount = this.data.signingRecordCount
    let targetChindsource = this.data.targetChildSource
    api.get(url).then((res) => {
      console.log('searchContent', res.data)
      res.data.customerResources.forEach(function(item, parentIndex) {
        if(parentIndex!=0){
          _this.addLength()
        }
        targetChindsource.push([[]])
        _this.data.customer[parentIndex] = item.customer
        // _this.data.temperycustomer[parentIndex] = item.customer
        _this.data.organizationalCode[parentIndex] = item.organizationalCode
        _this.data.incomeScale[parentIndex] = item.incomeScale
        _this.data.staffSize[parentIndex] = item.staffSize
        _this.data.target[parentIndex] = item.target
        _this.data.cycle[parentIndex] = item.cycle
        _this.data.amount[parentIndex] = item.amount
        _this.data.enterpriseQuality[parentIndex]=item.enterpriseQuality
        customerResourcesCertificateCount[parentIndex] = item.customerResourcesChildCount
        signingRecordCount[parentIndex] = item.signingRecordCount
        item.customerResourcesChildDTOS.forEach(function(item2, index) {
          let valueUrl = []
          let valueId = []
          _this.data.nameList[parentIndex][index] = item2.name
          _this.data.telList[parentIndex][index] = item2.tel
          _this.data.departmentList[parentIndex][index] = item2.department
          _this.data.dutyList[parentIndex][index] = item2.duty
          if (item2.certificates!=null){
            item2.certificates.forEach(function (item3, index2) {
              valueUrl[index2] = item3.url
              valueId[index2] = item3.id
              _this.data.pictureList[parentIndex][index] = valueUrl
              _this.data.certificateIdList[parentIndex][index] = valueId
            })
          }
          _this.data.relationshipList[parentIndex][index] = item2.relationship
        })
        item.signingRecordDTOS.forEach(function(item2, index) {
          targetChindsource[parentIndex].push([])
          _this.data.amountList[parentIndex][index] = item2.amount
          _this.data.targetOther[parentIndex][index] = item2.targetOther
          _this.data.signYearList[parentIndex][index] = item2.signYear
          if (item2.target==null){
            _this.data.targetParent[parentIndex][index] =''
            _this.data.targetChild[parentIndex][index] = ''
          }else{
            let targetParent = item2.target.split('-')[0]
            let targetChild = item2.target.split('-')[1]
            _this.data.targetParent[parentIndex][index] = targetParent
            _this.data.targetChild[parentIndex][index] = targetChild
          }

        })
      })
      _this.setData({
        countParent: res.data.count,
        customerResourcesCertificateCount,
        signingRecordCount,
        customer: this.data.customer,
        // temperycustomer:this.data.temperycustomer,
        organizationalCode: this.data.organizationalCode,
        incomeScale: this.data.incomeScale,
        staffSize: this.data.staffSize,
        target: this.data.target,
        cycle: this.data.cycle,
        amount: this.data.amount,
        nameList: this.data.nameList,
        telList: this.data.telList,
        departmentList: this.data.departmentList,
        pictureList: this.data.pictureList,
        relationshipList: this.data.relationshipList,
        dutyList: this.data.dutyList,
        amountList: this.data.amountList,
        signYearList: this.data.signYearList,
        targetParent: this.data.targetParent,
        targetChild: this.data.targetChild,
        certificateIdList:this.data.certificateIdList,
        targetChildSource: targetChindsource,
        targetOther: this.data.targetOther,
        enterpriseQuality: this.data.enterpriseQuality
      })
    })
    console.log('this.data.certificateIdList', this.data.certificateIdList)
  },
  shoewErrorMessage(mes) {
    wx.showToast({
      title: mes,
      icon: 'none',
      duration: 2000
    })
  },
  /**
 * 搜索公司
 */
  handShowItem: function (e) {
    let _this = this
    let parentindex = e.currentTarget.dataset.parentindex;
    if (this.data.open[parentindex]){
      wx.showToast({
        title: '已完成',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://open.api.tianyancha.com/services/open/search/2.0?word=' + _this.data.customer[parentindex],
        method: 'GET',
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': '98730b45-26cb-4dd5-ac64-5375d7477cb5',
        },
        success(res) {
          if (res.statusCode === 200) {
            if (res.data.result != null) {
              let value = []
              res.data.result.items.forEach(function (item, index) {
                value[index] = replace.replaceSpecialChar(item.name)
              })
              console.log('value', value)
              let open=_this.data.open
              open[parentindex]=true
              _this.setData({
                customernameList: value,
                open,
              })
            } else {
              wx.showToast({
                title: '请输入',
                icon: 'none',
                duration: 2000
              })
            }
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(error) {
          console.log('error', error)
        }
      })
    } 
  },
  /**
   * 模糊搜搜结果列表
   */
  selectShowItem(e){ 
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.customer
    value[parentindex] = this.data.customernameList[e.currentTarget.dataset.mmindex]
    let open=this.data.open
    open[parentindex]=false
    this.setData({
      customer: value,
      open
    })
    this.handGetCode(this.data.customernameList[e.currentTarget.dataset.mmindex], parentindex)
  },
  /**
   * 获取企业性质
   */
  getEnterpriseQualitySource(){
    let url = '/dictionary/first?question=' + '企业性质'
    api.get(url).then((res) => {
      console.log('res111',res)
      this.setData({
        enterpriseQualitySource: res.data
      })
    })
  },
  /**
   * 选择企业性质
   */
  bindenterpriseQualityChange(e){
    let parentindex = e.currentTarget.dataset.parentindex;
    let value = this.data.enterpriseQuality
    value[parentindex] = this.data.enterpriseQualitySource[e.detail.value]
    this.setData({
      enterpriseQuality: value
    })
  },
    /**
   * 客户关系深度
   */
  changeCurrentButtom(e){
    let parentindex = e.currentTarget.dataset.parentindex;
    let index = e.currentTarget.dataset.index;
    let buttonNo = e.currentTarget.dataset.buttom
    let value = this.data.relationshipList[parentindex];
    let parentValue = this.data.relationshipList;
    value[index] = e.currentTarget.dataset.buttom
    parentValue[parentindex] = value

    this.setData({
      relationshipList: parentValue
    })
  },
  // 查询元素位置
  find_position: function (e) {
    const query = wx.createSelectorQuery()
    query.select(e).boundingClientRect()
    query.selectViewport().scrollOffset()
    // let pos = null
    query.exec(function (res) {
      console.log("元素位置", res)
      // res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      let miss = res[1].scrollTop-200;
      console.log("滚动距离", miss)
      wx.pageScrollTo({
        // selector:'#expectPost',
        scrollTop: miss,
        duration: 300
      })
    })

  },
  // 滚动到必选项
  scroll: function (name) {
    console.log("滚动到", name)
    this.find_position(name)
  }
})