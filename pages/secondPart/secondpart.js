// pages/secondPart/secondpart.js
// pages/thirdPart/thirdPart.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
import upload from '../../utils/upload.js'
import form_verify from '../../utils/formVerify.js'
import replace from '../../utils/replaceSpecialChar.js'

// 9.1 日 剩下 负责行业 和负责产品服务 
// 自动提交 和手动提交
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 重写 workhistory 
    my_workhistory: {
      "workHistories": [{
        startTime: null,
        endTime: null,
        moodyhas: null,
        job: null,
        scale: null,
        salesIndicators: null,
        completion: null,
        averagePerformance: null,
        dimissionCause: null,
      }],
      "workHistoryExtends": [{
          "year": null,
          "salesIndicators": null,
          "completion": null,
          "productsServices": null
        },
        {
          "year": null,
          "salesIndicators": null,
          "completion": null,
          "productsServices": null
        },
        {
          "year": null,
          "salesIndicators": null,
          "completion": null,
          "productsServices": null
        }
      ]
    },

    //判断其他属于哪一个
    current_chose:null,
    temp_qita:'',
    // 判断哪一年
    redyears: null,
    redindex:null,
    redname: '',
    // 缓存 公司名称
    // 薪资索引
    salary_index: null,
    // 薪资选项：salary
    salesIndicators_model_first: [true, true, true],

    // 组织机构代码 
    organizationalCode_hide: [true, ],
    organizationalCode: [],
    // 主营业务 
    mainBusiness_my_str: [],
    mainBusiness_my_chosed: [
      []
    ],
    // 负责区域
    // 选择状态
    responsibleArea_my_checked: [
      []
    ],
    // 显示字符串
    responsibleArea_my_str: [
      []
    ],
    // 负责行业 显示内容
    industry_my_str: [
      []
    ],

    // 负责产品 和服务
    productsServices_my_str: [
      []
    ],
    productsServices_my_str_chose: [
      []
    ],
    // 关键经历 
    // 关键内容的选择框 内容 二维列表
    key_experiences_checked: [
      [false, false, false, false, false]
    ],
    key_experiences_content: [
      [null, null, null, null, null]
    ],






    // 控制 复选框的显示和隐藏
    hide_model: [{
      zhuying: false,
      fuzhe: false,
      guanjian: false,
      lizhi: false
    }],

    // 9.16 日 头部的负责产品和服务
    // 储存选中的字符串
    header_products_services: [
      [null, null],
      [null, null],
      [null, null]
    ],

    // 储存第二题中为其他的选项
    header_productsServices_content_list: [
      null, null, null
    ],
    // 储存负责行业的所有的已选项
    industry_chosed_list: [
      [],
    ],
    industry_show_chosed_str: [
      null
    ],
    // 储存 得到的第二题选项
    // header_products_services: [
    //   ["saas"], [null, null], [null, null]
    // ],

    history: {
      workHistories: [{
        "averagePerformance": null,
        "baseId": null,
        "completion": null,
        "dimissionCause": null,
        "endTime": null,
        "id": null,
        "industry": null,
        "job": null,
        "keyExperiences": null,
        "mainBusiness": null,
        "moodyhas": null,
        "otherBusiness": null,
        "productsServices": null,
        "responsibleArea": null,
        "salary": null,
        "salesIndicators": null,
        "scale": null,
        "sort": null,
        "startTime": null,
      }],
      workHistoryExtends: [{
          "baseId": null,
          "completion": null,
          "id": null,
          "salesIndicators": null,
          "year": null
        },
        {
          "baseId": null,
          "completion": null,
          "id": null,
          "salesIndicators": null,
          "year": null
        },
        {
          "baseId": null,
          "completion": null,
          "id": null,
          "salesIndicators": null,
          "year": null
        },
      ],
    },
    base_workHistories: {
      "averagePerformance": null,
      "baseId": null,
      "completion": null,
      "dimissionCause": null,
      "endTime": null,
      "id": null,
      "industry": null,
      "job": null,
      "keyExperiences": null,
      "mainBusiness": null,
      "moodyhas": null,
      "otherBusiness": null,
      "otherCause": null,
      "productsServices": null,
      "responsibleArea": null,
      "salary": null,
      "salesIndicators": null,
      "scale": null,
      "sort": null,
      "startTime": null,
    },
    // 主营业务列表选择框 
    main_business_checked: [
      [false, false, false, false, false, false]
    ],
    // 负责区域的选择框 内容 二维列表
    responsible_area_checked: [
      [false, false, false, false, false]
    ],
    responsible_area_content: [
      [null, null, null, null, null]
    ],


    // 离职原因 选择框 二维列表
    dimission_cause_checked: [
      [false, false, false, false, false, false, false, false]
    ],
    // 增加 离职原因内容存储框
    dimission_cause_content: [
      [null, null, null, null, null, null, null, null, ]
    ],
    // 负责行业选择项 的value 值
    industry_first_index_list: [],
    // 放存储的负责行业选中的字符串
    industry_first_str_list: [],

    // 负责产品服务选择项 的value 值
    productsServices_first_index_list: [
      [null, null]
    ],
    // 负责产品服务选择项中的字符串
    productsServices_first_str_list: [
      [null, null]
    ],
    // 负责产品为其他时的 内容存储
    productsServices_content_list: [null],
    array: ["至今"],
    index: null,
    // 薪资水平索引
    salary_index: null,

    endTime: '',
    keyExperiencesTextValue: [],
    selected: [],
    parentIndex: 1,
    maxpage: 9,
    null_data_list: true,
    // 记录，公司主营按钮选择情况
    textarea_checked: [true, ],
    textarea_value: [],
    // 记录，公司主营按钮选择情况
    dismiss_checked: [true, ],
    dismiss_value: [],
    // 负责区域
    area_str: "",
    area_list: [],
    base_area_list: {},
    area_list_tank: [{}],
    area_show_list: [
      [true, true, true, true, true]
    ],
    base_chose_list: [true, true, true, true, true],
    // 存储头部销售指标 和完成金额的信息




    data_list: [{}
      // { "startTime": "2019-08-31"},
      // {"startTime":"2019-06-31"},
    ],
    options: ['OP产品', 'SAAS产品', '物联网', '人工智能', '解决方案', '其他'],


    responsible_areaAption: [{
        name: 1,
        value: '华东',
        hidden: true
      },
      {
        name: 2,
        value: '华中',
        hidden: true
      },
      {
        name: 3,
        value: '华南',
        hidden: true
      },
      {
        name: 4,
        value: '华北',
        hidden: true
      },
      {
        name: 5,
        value: '华西',
        hidden: true
      },
    ],
    key_experiences: [{
        name: 0,
        value: '关键赢单',
        "content": '时间、客户名称、合同'
      },
      {
        name: 1,
        value: '市场开拓',
        "content": '时间、市场/行业、拓展规模'
      },
      {
        name: 2,
        value: '组建团队',
        "content": '时间、团队规模、团队业绩'
      },
      {
        name: 3,
        value: '扭转士气',
        "content": '时间、背景、主要举措、结果'
      },
      {
        name: 4,
        value: '其他',
        "content": '关键经历主题+描述'
      },
    ],
    salary: [{
        name: 1,
        value: '（0-20万】'
      },
      {
        name: 2,
        value: '（20-40万】'
      },
      {
        name: 3,
        value: '（40-60万】'
      },
      {
        name: 4,
        value: '（60-80万】'
      },
      {
        name: 5,
        value: '（80-100万】'
      },
      {
        name: 6,
        value: '（100-120万】'
      },
      {
        name: 7,
        value: '（120-140万】'
      },
      {
        name: 8,
        value: '（140-160万】'
      },
      {
        name: 9,
        value: '(160-180万】'
      },
      {
        name: 10,
        value: '(180-200万】'
      },
      {
        name: 11,
        value: '200万以上'
      },
    ],
    dimissionCause: [{
        name: 1,
        value: '个人成长'
      },
      {
        name: 2,
        value: '职业发展'
      },
      {
        name: 3,
        value: '薪酬待遇'
      },
      {
        name: 4,
        value: ' 家庭原因'
      },
      {
        name: 5,
        value: '公司及团队原因'
      },
      {
        name: 6,
        value: ' 工作内容原因'
      },
      {
        name: 7,
        value: '身体原因'
      },
      {
        name: 8,
        value: ' 其他',
        hidden: true
      },
    ],

    checkout: [],
    checked_box: [],
    template_list: ['temp1', 'temp2'],
    // 控制 第二页开始的单项的展开 和收缩
    mainBusiness: true,
    base_dict: {}
  },

  // 头部 输入框 
  header_key_input: function(e) {
    console.log("头部aaa", e)
    let that = this
    let baseId = that.data.baseId
    let pid = e.currentTarget.dataset.pid
    let year = e.currentTarget.dataset.year
    console.log("年份", year)
    let value = e.detail.value
    let category = e.currentTarget.dataset.name
    let my_workhistory = that.data.my_workhistory
    my_workhistory.workHistoryExtends[pid]['year'] = year
    my_workhistory.workHistoryExtends[pid]['baseId'] = baseId
    if (category == "salesIndicators") {
      my_workhistory.workHistoryExtends[pid].salesIndicators = value
    } else {
      my_workhistory.workHistoryExtends[pid].completion = value
    }
    that.setData({
      my_workhistory
    })
  },

  /**
   *  客户全称
   */
  bindinputCustomer(e) {
    let that = this
    let my_workhistory = that.data.my_workhistory
    let pid = e.currentTarget.dataset.pid;
    let value = e.detail.value
    console.log("公司输入", e)
    my_workhistory.workHistories[pid].moodyhas = value
    that.setData({
      my_workhistory
    })
  },

  // 公司主营业务
  mainBusiness_change: function(e) {
    console.log("主营业务", e)
    let that = this
    let options = that.data.options
    let mainBusiness_my_str = that.data.mainBusiness_my_str
    let mainBusiness_my_chosed = that.data.mainBusiness_my_chosed
    let chose_index = e.detail.value
    let pid = e.currentTarget.dataset.pid
    let chose_str = options[chose_index]
    // if(chose_str == "其他"){
    //   that.setData({
    //     modalName: 'other_mainBusiness'
    //   })
    // }
    if (mainBusiness_my_chosed[pid].indexOf(chose_str) > -1) {
      that.exist_tag()
      return
    }
    mainBusiness_my_chosed[pid].push(chose_str)
    mainBusiness_my_str[pid] = chose_str
    that.setData({
      mainBusiness_my_str,
      mainBusiness_my_chosed
    })
    that.zuhe_mainBusiness()
  },
  // 删除 主营
  del_mainBusiness: function(e) {
    console.log("主营业务按钮删除", e)
    let that = this
    let mainBusiness_my_chosed = that.data.mainBusiness_my_chosed
    let mainBusiness_my_str = that.data.mainBusiness_my_str
    let value = e.currentTarget.dataset.value
    let pid = e.currentTarget.dataset.pid
    let len = mainBusiness_my_chosed[pid].length
    // console.log('长度',len)
    if (len > 0) {
      let my_index = mainBusiness_my_chosed[pid].indexOf(value)
      // console.log("索引",my_index)
      if (my_index > -1) {
        mainBusiness_my_chosed[pid].splice(my_index, 1)
        mainBusiness_my_str[pid] = ''
        that.setData({
          mainBusiness_my_chosed,
          mainBusiness_my_str
        })
      }
    }
    that.zuhe_mainBusiness()
  },
  // 遍历组合主营业务
  zuhe_mainBusiness: function(e) {
    let that = this
    let options = that.data.options
    let mainBusiness_my_chosed = that.data.mainBusiness_my_chosed
    let len = mainBusiness_my_chosed.length
    let my_workhistory = that.data.my_workhistory

    if (len > 0) {
      for (let i = 0; i < len; i++) {
        let one_str_list = mainBusiness_my_chosed[i]
        let base_list = []
        one_str_list.forEach(function(value, index) {
          let my_index = options.indexOf(value)
          if (my_index > -1) {
            console.log('my_inr', my_index)
            base_list.push(my_index)
          }
        })
        let base_str = base_list.join("|")
        my_workhistory.workHistories[i].mainBusiness = base_str
      }
      that.setData({
        my_workhistory
      })
    }
  },

  // 存在
  exist_tag: function() {
    wx.showToast({
      title: '所选项已存在',
      icon: 'none',
    })
  },
  // 个人中心等首次弹窗
  salesIndicators_model: function(e) {
    console.log("个人首次弹窗", e)
    let salesIndicators_model_first = this.data.salesIndicators_model_first
    // let pid = 
    let index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.pid == 0 && salesIndicators_model_first[index]) {
      salesIndicators_model_first[index] = false
      this.setData({
        modalName: 'salesIndicators_model',
        salesIndicators_model_first,
      })
    }
  },
  // 9.29
  // 负责区域弹窗
  show_fuzhe_model: function(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 隐藏弹窗
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


  // 9.27
  // 控制显示和隐藏
  showModal: function(e) {
    let that = this
    let pid = e.currentTarget.dataset.pid
    let name = e.currentTarget.dataset.name
    let hide_model = that.data.hide_model
    hide_model[pid][name] = !hide_model[pid][name]
    that.setData({
      hide_model
    })
  },
  // 行业的数据组合 
  zuhe_industry: function() {
    let that = this
    let industry_chosed_list = that.data.industry_chosed_list
    let history = that.data.my_workhistory
    industry_chosed_list.forEach(function(value, index) {
      console.log("index", index)
      console.log("value", value)
      let str = value.join("|")
      console.log("str", str)
      history.workHistories[index].industry = str
    })
    that.setData({
      my_workhistory: history
    })
  },
  // 行业的删除 按钮
  del_industry: function(e) {
    console.log("行业的删除", e)
    let that = this
    let industry_chosed_list = that.data.industry_chosed_list
    let industry_show_chosed_str = that.data.industry_show_chosed_str
    let index = e.currentTarget.dataset.index
    let pid = e.currentTarget.dataset.pid
    let len = industry_chosed_list[pid].length
    if (len > 0) {
      industry_chosed_list[pid].splice(index, 1)
      industry_show_chosed_str[pid] = industry_chosed_list[pid][len - 1]
    }
    that.setData({
      industry_chosed_list,
      industry_show_chosed_str
    })
    that.zuhe_industry()
  },
  // 行业 新增为多选
  industry_change: function(e) {
    console.log("行业多选事件", e)
    let that = this
    // 储存答案
    let indus_first_answer = that.data.indus_first_answer
    // 储存结果
    let industry_chosed_list = that.data.industry_chosed_list
    // 储存显示的内容
    let industry_show_chosed_str = that.data.industry_show_chosed_str
    let pid = e.currentTarget.dataset.pid
    let index = e.detail.value
    let chose_str = indus_first_answer[index]
    let parentIndex = that.data.parentIndex
    console.log("选中的字符串是", chose_str)
    if (parentIndex > industry_chosed_list.length) {
      industry_chosed_list.push([])
    }
    // 判断重新选择的在不在已选择列表中
    let is_exist = industry_chosed_list[pid].indexOf(chose_str)
    // console.log("is_exist", is_exist)
    if (is_exist > -1) {
      wx.showToast({
        title: '所选项已存在',
        icon: 'none',
      })
      return
    }
    industry_chosed_list[pid].push(chose_str)
    industry_show_chosed_str[pid] = chose_str
    that.setData({
      industry_chosed_list,
      industry_show_chosed_str
    })
    that.zuhe_industry()

  },
  // 头部负责产品和服务 改变事件
  first_header_change: function(e) {
    console.log("头部负责产品改变", e)
    let that = this
    let uid = e.currentTarget.dataset.uid
    let index = e.currentTarget.dataset.index
    let first_answer = that.data.productsServices_first_answer
    let header_products_services = that.data.header_products_services
    let value = e.detail.value
    let chose_str = first_answer[value]
    that.getSecond(chose_str, '')
    // console.log("已经选择的第一题是", chose_str)
    header_products_services[index][uid] = chose_str
    header_products_services[index][1] = null
    that.setData({
      header_products_services
    })
  },
  // 头部的第二个选项
  second_header_change: function(e) {
    console.log("头部负责产品改变第二个", e)
    let that = this
    let index = e.currentTarget.dataset.index
    let uid = e.currentTarget.dataset.uid
    let value = e.detail.value
    let productsServices_second_answer = that.data.productsServices_second_answer
    let chose_str = productsServices_second_answer[value]
    let header_products_services = that.data.header_products_services
    header_products_services[index][uid] = chose_str
    that.setData({
      header_products_services
    })
  },
  // 头部的负责产品行业的其他 多选框
  header_qita_textarea: function(e) {
    let that = this
    let header_productsServices_content_list = that.data.header_productsServices_content_list
    console.log("其他 多选框eeeeeee", e)
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    // console.log("index", index)
    // console.log("value", value)
    // console.log("列表长度", header_productsServices_content_list)
    header_productsServices_content_list[index] = value
    that.setData({
      header_productsServices_content_list
    })
  },
  // 其他 多选框
  qita_textarea: function(e) {
    let that = this
    let productsServices_content_list = that.data.productsServices_content_list
    console.log("其他 多选框eeeeeee", e)
    let pid = e.currentTarget.dataset.pid
    let content = e.detail.value
    productsServices_content_list[pid] = content
    that.setData({
      productsServices_content_list: productsServices_content_list
    })
  },
  today_change: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  getSecond: function(first_q, name) {
    let that = this
    let url = "/dictionary/second?sectionLevel=" + first_q
    api.get(url).then((res) => {
      // console.log(res.data)
      let indus_first_answer = res.data
      if (name == "industry") {
        that.setData({
          indus_second_answer: indus_first_answer
        })
      } else {
        console.log("获取负责产品的第二题选项", indus_first_answer)
        that.setData({
          productsServices_second_answer: indus_first_answer
        })
      }

    })
  },
  // 负责行业的 下拉框改变事件
  firstchange: function(e) {
    let that = this
    let index = parseInt(e.detail.value)
    let pid = e.currentTarget.dataset.pid
    let uid = e.currentTarget.dataset.uid
    let name = e.currentTarget.dataset.name
    console.log("eeeee", e)
    // 题目
    let indus_first_answer = that.data.productsServices_first_answer
    // 存储数据
    // 存储的单个 已选项列表
    let indus_str_answer = that.data.productsServices_first_str_list
    let industry_index_list = that.data.productsServices_first_index_list

    let old_base_chose_list = industry_index_list[pid]
    let old_base_str_list = indus_str_answer[pid]

    let chose_str = indus_first_answer[index]
    old_base_chose_list[uid] = index
    old_base_str_list[uid] = chose_str
    // 
    //    置空第二个选项
    old_base_str_list[1] = ""
    old_base_chose_list[1] = ""
    console.log("开始获取负责产品第二个选项")
    that.getSecond(chose_str, name)
    console.log("old_base_chose_list", old_base_chose_list)
    console.log("old_base_str_list", old_base_str_list)
    console.log("chose_str", chose_str)
    indus_str_answer[pid] = old_base_str_list
    industry_index_list[pid] = old_base_chose_list
    that.setData({
      productsServices_first_index_list: industry_index_list,
      productsServices_first_str_list: indus_str_answer
    })
    console.log("industry_index_list", industry_index_list)

  },
  // 其他弹出框字改变
  model_textarea:function(e){
    console.log("弹出其他输入框",e)
    let that = this
    let value = e.detail.value
    that.setData({
      temp_qita:value
    })
  },
  bitian_qita:function(e){
    console.log("必填其他弹出",e)
    let that = this
    let temp_qita = that.data.temp_qita
    let pid = e.currentTarget.dataset.pid
    let category = e.currentTarget.dataset.name
    if (category == 'other_mainBusiness'){
      console.log("主营业务其他",e)
      let mainBusiness_my_chosed = that.data.mainBusiness_my_chosed
      let one_list = mainBusiness_my_chosed[pid]
      if(temp_qita){
        that.setData({ modalName: '' })
        let len =one_list.length
        if(len >0){
          one_list[len-1] = temp_qita
          mainBusiness_my_chosed[pid] = one_list
          that.setData({
            mainBusiness_my_chosed
          })
          // that.write_mainBusiness_my_chosed()
        }
      }else{
        wx.showToast({
          title: '输入框必填',
          icon: 'none',
        })
      }
    }else{
    let productsServices_my_str = that.data.productsServices_my_str
    let one_list = productsServices_my_str[pid]
    if (temp_qita){
      console.log("tianxie",temp_qita)
      that.setData({ modalName:''})
      let len = one_list.length
      if (len>0){
        let last_str = one_list[len-1]
        let last_str_list = last_str.split("-")
        let new_str = last_str_list[0] + "-" + temp_qita
        one_list[len - 1] = new_str
        productsServices_my_str[pid] = one_list
        that.setData({ productsServices_my_str})
        that.write_productsServices_my_str()
      }
    }else{
      wx.showToast({
        title: '输入框必填',
        icon:'none',
      })
    }
    }
  },
  // 删除按钮
  del_productsServices_my_str:function(e){
    console.log("负责产品服务的删除",e)
    let that = this
    let productsServices_my_str = that.data.productsServices_my_str
    let pid = e.currentTarget.dataset.pid
    let value = e.currentTarget.dataset.value
    let my_index = productsServices_my_str[pid].indexOf(value)
    if(my_index > -1){
      productsServices_my_str[pid].splice(my_index,1)
    }
    that.setData({
      productsServices_my_str
    })
    that.write_productsServices_my_str()
  },
  // 写入 上传数据
  write_productsServices_my_str:function(pid){
    let that = this
    let my_workhistory = that.data.my_workhistory
    let productsServices_my_str = that.data.productsServices_my_str
    let len = productsServices_my_str.length
    for(let i=0;i<len;i++){
      console.log("目前索引",i)
      let base_str=productsServices_my_str[i].join("|")
      console.log("写入的字符串",base_str)
      my_workhistory.workHistories[i].productsServices = base_str
    }
    that.setData({ my_workhistory})
  },
  secondchange: function(e) {
    console.log(e)
    let that = this
    let index = parseInt(e.detail.value)
    let pid = e.currentTarget.dataset.pid
    let uid = e.currentTarget.dataset.uid
    let name = e.currentTarget.dataset.name
    // 存储数据
    let indus_str_answer = that.data.productsServices_first_str_list
    let industry_index_list = that.data.productsServices_first_index_list
    // 取出老的
    let old_base_chose_list = industry_index_list[pid]
    let old_base_str_list = indus_str_answer[pid]

    var indus_second_answer = that.data.productsServices_second_answer
    console.log("负责产品选择", indus_second_answer)

    let chose_str = indus_second_answer[index]
    // 重新赋值
    console.log("选中的字符串", chose_str)

    old_base_chose_list[uid] = index
    old_base_str_list[uid] = chose_str
    indus_str_answer[pid] = old_base_str_list
    industry_index_list[pid] = old_base_chose_list
    console.log("industry_index_list", industry_index_list)
    console.log("indus_str_answer", indus_str_answer)

    that.setData({
      productsServices_first_index_list: industry_index_list,
      productsServices_first_str_list: indus_str_answer
    })
    console.log("负责产品的全部数据", indus_str_answer)
    // 结果写入 字典对象
    that.write_to_history(pid);
  },
  write_to_history: function(pid) {
    let that = this
    let history = this.data.my_workhistory
    let productsServices_my_str = this.data.productsServices_my_str
    let productsServices_first_str_list = this.data.productsServices_first_str_list
    productsServices_first_str_list.forEach(function(value, index) {
      console.log("索引", index)
      console.log("值", value)
      console.log("父级ID",pid)
      if(index == pid){
      if (value[0]) {
        let str = value[0] + "-" + value[1]
        if (value[1] == '其他') {
          that.setData({
            modalName: 'other_product',
          })
        }
        if (productsServices_my_str[pid].indexOf(str)>-1){
          that.exist_tag()
        }else{
          productsServices_my_str[pid].push(str)
        }
      }
      }
    })
    this.setData({
      productsServices_my_str,
    })
    that.write_productsServices_my_str()
    console.log("productsServices_my_str", productsServices_my_str)
  },

  /**
   * 负责区域checkoutbox选择框
   */
  checkboxChange: function(e) {

    let that = this
    console.log("checkoutbox选择框", e)
    let name = e.currentTarget.dataset.name
    if (name == "dimissionCause") {
      // 离职原因处理
      that.dimissionCause(e)
    } else if (name == "mainBusiness") {
      // 公司主营业务
      that.mainBusiness(e)
    } else if (name == 'responsibleArea') {
      // 选中负责区域
      that.responsibleArea(e)
    }

  },
  // 负责区域 数据的处理，取消选择，赋值为空
  set_null: function() {
    let that = this
    let new_area_show_list = that.data.responsible_area_checked
    let responsible_area_content = that.data.responsible_area_content
    let len = new_area_show_list.length
    for (let i = 0; i < len; i++) {
      let one_list = new_area_show_list[i]
      one_list.forEach(function(value, index) {
        console.log("键", index)
        console.log("值", value)
        if (value != true) {
          responsible_area_content[i][index] = null
        }
      })
    }
    that.setData({
      responsible_area_checked: new_area_show_list,
      responsible_area_content: responsible_area_content
    })
  },
  // 负责区域确定按钮
  responsibleArea_confirm: function(e) {
    console.log("负责区域确定按钮", e)
    let that = this
    let responsibleArea_str = that.data.responsibleArea_str
    let pid = e.currentTarget.dataset.pid
    let responsibleArea_show_list = that.recover_responsible_button(responsibleArea_str)
    let responsibleArea_my_str = that.data.responsibleArea_my_str
    responsibleArea_my_str[pid] = responsibleArea_show_list
    that.setData({
      responsibleArea_my_str
    })
    that.hideModal()

  },
  // 还原负责区域按钮状态
  recover_responsible_button: function(mystr) {
    let that = this
    if (mystr) {
      let responsibleArea_str_list = mystr.split("|")
      let responsible_areaAption = that.data.responsible_areaAption
      let show_responsibleArea_list = []
      responsibleArea_str_list.forEach(function(value, index) {
        let my_value_list = value.split("-")
        console.log("my_value_list", my_value_list)
        let arae_str = ""
        if (my_value_list[0]) {
          let area_name = responsible_areaAption[my_value_list[0]].value
          if (my_value_list[1]) {
            area_name = area_name + "-" + my_value_list[1]
          }
          show_responsibleArea_list.push(area_name)
        }
      })
      // that.setData({ show_responsibleArea_list})
      return show_responsibleArea_list
    }
  },
  // 负责区域 的
  responsibleArea: function(e) {

    let that = this
    // 选中的
    let index = e.currentTarget.dataset.index
    let pid = e.currentTarget.dataset.pid
    let chose_list = e.detail.value
    // 
    let new_area_show_list = that.data.responsible_area_checked
    new_area_show_list[pid][index] = !new_area_show_list[pid][index]
    let responsible_area_content = that.data.responsible_area_content
    let len = new_area_show_list.length
    for (let i = 0; i < len; i++) {
      let one_list = new_area_show_list[i]
      one_list.forEach(function(value, index) {
        if (value != true) {
          responsible_area_content[i][index] = null
        }
      })
    }
    that.setData({
      responsible_area_checked: new_area_show_list
    })
    that.set_null()
    that.area_data_parse(pid)

    console.log("responsible_area_checked", new_area_show_list)
  },
  // 公司主营业务
  mainBusiness: function(e) {
    var that = this
    let index = e.currentTarget.dataset.index
    console.log("选中的索引", index)
    // 父级判定
    let pid = e.currentTarget.dataset.pid
    let name = e.currentTarget.dataset.name
    let main_business_checked = that.data.main_business_checked
    main_business_checked[pid][index] = !main_business_checked[pid][index]
    // console.log("主营业务的选择框状态", main_business_checked)
    let history = that.data.history
    let mainBusiness = ""
    // 遍历选中的 进行组合
    main_business_checked[pid].forEach(function(value, index) {
      // console.log("选择的val", index)
      if (value == true) {
        let str1 = index.toString()
        mainBusiness += str1 + "|"
      }
    })
    history.workHistories[pid].mainBusiness = mainBusiness
    that.setData({
      main_business_checked: main_business_checked,
      history: history
    })
    console.log("主营业务的选择", mainBusiness)
    console.log("主营业务的选择框状态", main_business_checked)
    console.log("history", history)
    // base_dict['mainBusiness'] = mainBusiness
    // 控制第6个其他选项
  },
  // 离职原因 多选框处理
  dimissionCause: function(e) {
    let that = this
    let chose_list = e.detail.value
    let dimission_cause_checked = that.data.dimission_cause_checked
    let dimission_cause_content = that.data.dimission_cause_content
    // 离职原因 选择框 二维列表
    // 父级判定
    let pid = e.currentTarget.dataset.pid
    let name = e.currentTarget.dataset.name
    let base_str = ""
    let history = that.data.my_workhistory
    dimission_cause_checked[pid].forEach(function(value, index) {
      console.log("值", value)
      console.log("键", index)
      index = index.toString()
      let has_checked = chose_list.indexOf(index)
      if (has_checked > -1) {
        dimission_cause_checked[pid][index] = true
        // let str = key_experiences_content[pid][index]
        let con = dimission_cause_content[pid][index]
        if (con) {
          let str2 = index + "-" + dimission_cause_content[pid][index] + "|"
          base_str += str2

        }
        console.log("组合好的离职原因", base_str)
        // } else if (index == 7) {
        //   dimission_cause_checked[pid][index] = false
        //   history.workHistories[pid].otherCause = null
      } else {
        dimission_cause_checked[pid][index] = false
      }
    })
    history.workHistories[pid].dimissionCause = base_str
    that.setData({
      dimission_cause_checked: dimission_cause_checked,
      my_workhistory: history
    })
    console.log("dimission_cause_checked", dimission_cause_checked)
    console.log("dimission_cause_content", dimission_cause_content)
    console.log("history", history)

  },

  // 显示隐藏字段的增加和删除
  hide_model_func: function(name) {
    let that = this
    let hide_model = that.data.hide_model
    let parentIndex = that.data.parentIndex
    if (name == 'add') {
      if (parentIndex > hide_model.length) {
        hide_model.push({
          zhuying: false,
          fuzhe: false,
          guanjian: false,
          lizhi: false
        })
      } else {
        console.log("长度一致hide_model")
      }
    } else {
      hide_model.pop()
    }
    that.setData({
      hide_model
    })
  },

  // 用户手动增加新页面 空白数据
  user_addnew: function() {
    let that = this
    // 不是手动增加的 用下面的
    // let workHistories = that.data.history.workHistories
    // let parentIndex = workHistories.length
    // console.log("workHistories", workHistories)
    let pass_list = this.new_form_verify()
    if (pass_list == true) {
      let parentIndex = this.data.parentIndex
      parentIndex += 1
      that.setData({
        parentIndex: parentIndex
      })
      console.log("页面个数", parentIndex)
      // 页面数据的增加
      // for(let i=0;i<parentIndex;i++){
      that.main_business_func("add")
      that.responsible_area_func("add")
      that.key_experiences_func("add")
      that.dimission_cause_func("add")
      that.base_workHistories_func("add")
      that.industry_first_func("add")
      that.products_services_func("add")
      // 隐藏显示字段 的增加
      that.hide_model_func("add")
      // 搜索结果展示情况的增加
      that.company_content("add")
      wx.showToast({
        title: '新增数据成功',
        icon: 'info',
        duration: 2000
      })
    }
    // }
  },
  // 任职公司展示按钮
  company_content: function(type) {
    let that = this
    let organizationalCode_hide = that.data.organizationalCode_hide
    let parentIndex = that.data.parentIndex
    if (organizationalCode_hide.length < parentIndex) {
      if (type = "add") {
        organizationalCode_hide.push(true)
      }
    } else if (organizationalCode_hide.length = parentIndex) {
      if (type = "add") {
        organizationalCode_hide.push(true)
      } else {
        organizationalCode_hide.pop()
      }
    }
    that.setData({
      organizationalCode_hide
    })
  },
  // 删除页面 仅仅是删除了本地的 。数据库的没有改变
  user_del: function() {
    let that = this
    // 不是手动增加的 用下面的
    // let workHistories = that.data.history.workHistories
    // let parentIndex = workHistories.length
    // console.log("workHistories", workHistories)
    let parentIndex = this.data.parentIndex
    if (parentIndex > 1) {
      parentIndex -= 1
      that.setData({
        parentIndex: parentIndex
      })
      console.log("页面个数", parentIndex)
      // 页面数据的增加
      // for(let i=0;i<parentIndex;i++){
      that.main_business_func()
      that.responsible_area_func()
      that.key_experiences_func()
      that.dimission_cause_func()
      that.base_workHistories_func()
      that.industry_first_func()
      that.products_services_func()
      that.hide_model_func()
      that.company_content()


      wx.showToast({
        title: '删除数据成功',
        icon: 'info',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '最少一条数据',
        icon: 'info',
        duration: 2000
      })
    }
  },
  // 基础数据增加
  base_workHistories_func(type) {
    let history = this.data.my_workhistory
    // 引用类型的对象，。尴尬
    let base_workHistories = this.data.base_workHistories
    let new_obj = {}
    // Object.keys(base_workHistories).forEach(function(value,index){
    //   console.log("vaule",value)
    //   new_obj
    // })
    // new_obj = base_workHistories
    console.log("改变前的结果", history)
    console.log("改变前的base_workHistories结果", new_obj)
    if (type == "add") {
      history.workHistories.push(new_obj)
    } else {
      history.workHistories.pop()
    }
    this.setData({
      my_workhistory: history
    })
    console.log("改变后的结果", history)
    console.log("改变后的base_workHistories结果", base_workHistories)
  },
  // 负责行业 增加
  industry_first_func: function(type) {
    // industry_first_index_list: [],
    //   // 放存储的负责行业选中的字符串
    //   industry_first_str_list: [],
    let parentIndex = this.data.parentIndex
    let new_industry_first_index_list = this.data.industry_first_index_list
    let industry_chosed_list = this.data.industry_chosed_list
    let industry_show_chosed_str = this.data.industry_show_chosed_str
    let new_industry_first_str_list = this.data.industry_first_str_list
    if (type == "add" && parentIndex > industry_chosed_list.length) {
      new_industry_first_index_list.push(null)
      new_industry_first_str_list.push(null)
      industry_chosed_list.push([])
      industry_show_chosed_str.push(null)
    } else if (parentIndex == industry_chosed_list.length) {

    } else {
      new_industry_first_index_list.pop()
      new_industry_first_str_list.pop()
      industry_chosed_list.pop()
    }
    this.setData({
      industry_first_index_list: new_industry_first_index_list,
      industry_first_str_list: new_industry_first_str_list,
      industry_chosed_list: industry_chosed_list
    })
  },
  // 负责产品服务选择 的增加
  products_services_func: function(type) {
    let parentIndex = this.data.parentIndex
    let new_productsServices_first_index_list = this.data.productsServices_first_index_list
    let new_productsServices_first_str_list = this.data.productsServices_first_str_list
    let productsServices_my_str = this.data.productsServices_my_str
    // 其他处理 框
    let productsServices_content_list = this.data.productsServices_content_list
    if (type == "add") {
      if (parentIndex > new_productsServices_first_str_list.length) {
        new_productsServices_first_index_list.push([null, null])
        new_productsServices_first_str_list.push([null, null])
        productsServices_content_list.push(null)
        productsServices_my_str.push([])
      } else {
        console.log("长度保持一致new_productsServices_first_str_list")
      }

    } else {
      new_productsServices_first_index_list.pop()
      new_productsServices_first_str_list.pop()
      productsServices_content_list.pop()
      productsServices_my_str.pop()
    }
    this.setData({
      productsServices_first_index_list: new_productsServices_first_index_list,
      productsServices_first_str_list: new_productsServices_first_str_list,
      productsServices_content_list: productsServices_content_list,
      productsServices_my_str

    })
  },


  // 增加主营业务 页面数据
  main_business_func: function(type) {
    let parentIndex = this.data.parentIndex
    let new_main_business_checked = this.data.main_business_checked
    let mainBusiness_my_chosed = this.data.mainBusiness_my_chosed
    if (type == "add") {
      let basedata_main_business_checked = [false, false, false, false, false, false, ]
      if (parentIndex > new_main_business_checked.length) {
        new_main_business_checked.push(basedata_main_business_checked)
        mainBusiness_my_chosed.push([])
      }
    } else {
      new_main_business_checked.pop()
      mainBusiness_my_chosed.pop()
    }
    this.setData({
      main_business_checked: new_main_business_checked,
      mainBusiness_my_chosed
    })
  },
  // 操作负责区域的选择框 内容 二维列表
  responsible_area_func: function(type) {
    let parentIndex = this.data.parentIndex
    let new_responsible_area_checked = this.data.responsible_area_checked
    let new_responsible_area_content = this.data.responsible_area_content
    if (type == "add") {
      if (parentIndex > new_responsible_area_checked.length) {
        let basedata_responsible_area_checked = [false, false, false, false, false, ]
        new_responsible_area_checked.push(basedata_responsible_area_checked)
        let basedata_responsible_area_content = [null, null, null, null, null]
        new_responsible_area_content.push(basedata_responsible_area_content)
      }
    } else {
      new_responsible_area_checked.pop()
      new_responsible_area_content.pop()
    }
    this.setData({
      responsible_area_content: new_responsible_area_content,
      responsible_area_checked: new_responsible_area_checked
    })
  },
  // 操作高科技技术产业，两个字段
  // products_services_func: function (type) {
  //   let new_products_services = this.data.products_services
  //   if (type == "add") {
  //     let basedata_products_services = [null, null]
  //     new_products_services.push(basedata_products_services)
  //   } else {
  //     new_products_services.pop()
  //   }
  //   this.setData({
  //     products_services: new_products_services
  //   })
  // },
  // 关键内容的选择框 内容 二维列表
  key_experiences_func: function(type) {
    let parentIndex = this.data.parentIndex
    let new_key_experiences_checked = this.data.key_experiences_checked
    let new_key_experiences_content = this.data.key_experiences_content
    if (type == "add") {
      if (parentIndex > new_key_experiences_checked.length) {
        let basedata_key_experiences_checked = [false, false, false, false, false]
        let basedata_key_experiences_content = [null, null, null, null, null]
        new_key_experiences_checked.push(basedata_key_experiences_checked)
        new_key_experiences_content.push(basedata_key_experiences_content)
      }
    } else {
      new_key_experiences_checked.pop()
      new_key_experiences_content.pop()
    }
    this.setData({
      key_experiences_content: new_key_experiences_content,
      key_experiences_checked: new_key_experiences_checked
    })
  },
  // 离职原因 选择框 二维列表
  dimission_cause_func: function(type) {
    let parentIndex = this.data.parentIndex
    let new_dimission_cause_checked = this.data.dimission_cause_checked
    let new_dimission_cause_content = this.data.dimission_cause_content

    if (type == "add") {
      if (parentIndex > new_dimission_cause_checked.length) {
        new_dimission_cause_checked.push([false, false, false, false, false, false, false, false, ])

      }
      if (parentIndex > new_dimission_cause_content.length) {
        new_dimission_cause_content.push([null, null, null, null, null, null, null])
      }
    } else {
      new_dimission_cause_checked.pop()
      new_dimission_cause_content.pop()
    }
    this.setData({
      dimission_cause_checked: new_dimission_cause_checked,
      dimission_cause_content: new_dimission_cause_content
    })
  },


  // 主营业务列表选择框 

  addnew_old: function() {
    var parentIndex = this.data.parentIndex
    let maxpage = this.data.maxpage
    let textarea_checked = this.data.textarea_checked

    let dismiss_checked = this.data.dismiss_checked
    if (parentIndex < maxpage) {
      // 可增加页面
      let base_dict = {}
      let new_data_list = this.data.data_list
      new_data_list.push(base_dict)
      // 负责行业 
      let indus_str_answer = this.data.industry_first_str_list
      let industry_index_list = this.data.industry_first_index_list
      let base_list = ["", ""]
      indus_str_answer.push(base_list)
      industry_index_list.push(base_list)
      // 负责产品

      let productsServices_first_index_list = this.data.productsServices_first_index_list
      let productsServices_first_str_list = this.data.productsServices_first_str_list
      productsServices_first_index_list.push(base_list)
      productsServices_first_str_list.push(base_list)
      // 增加负责区域的内容容器
      let area_list_tank = this.data.area_list_tank
      area_list_tank.push({})
      textarea_checked.push(true)
      dismiss_checked.push(true)
      // area_show_list: [
      //   [true, true, true, true, true]
      // ],
      let base_chose = [true, true, true, true, true]
      let new_area_show_list = this.data.area_show_list
      // let base_chose_list = this.data.base_chose_list
      new_area_show_list.push(base_chose)
      console.log("初始化new_area_show_list", new_area_show_list)
      console.log("初始化base_chose_list", base_chose)
      this.setData({
        parentIndex: parentIndex + 1,
        data_list: new_data_list,
        textarea_checked: textarea_checked,
        dismiss_checked: dismiss_checked,
        area_show_list: new_area_show_list,
        area_list_tank: area_list_tank,
        //       let indus_str_answer = that.data.industry_first_str_list
        // let industry_index_list = that.data.industry_first_index_list
        industry_first_str_list: indus_str_answer,
        industry_first_index_list: industry_index_list,
        productsServices_first_index_list: productsServices_first_index_list,
        productsServices_first_str_list: productsServices_first_str_list,
      })
      // console.log(new_data_list)
      // console.log("公司主营业务其他按钮选择情况", textarea_checked)


    } else {
      wx.showToast({
        title: '到达经历上限',
        // icon: 'info',
        duration: 2000
      })
    }
    console.log(parentIndex)
  },

  // 删除页面
  // 删除最后一个页面
  delnew: function() {
    var parentIndex = this.data.parentIndex
    if (parentIndex > 1) {
      // 此处补充：删除最后一条要存储的数据，然后上传数据
      wx.showToast({
        title: '删除数据成功',
        icon: 'info',
        duration: 2000
      })
      let new_daya_list = this.data.data_list
      new_daya_list.pop()
      let textarea_checked = this.data.textarea_checked
      textarea_checked.pop()
      let dismiss_checked = this.data.dismiss_checked
      dismiss_checked.pop()
      let new_area_show_list = this.data.area_show_list
      new_area_show_list.pop()
      let area_list_tank = this.data.area_list_tank
      area_list_tank.pop()


      let industry_first_str_list = this.data.industry_first_str_list
      let industry_first_index_list = this.data.industry_first_index_list
      industry_first_str_list.pop()
      industry_first_index_list.pop()

      let productsServices_first_index_list = this.data.productsServices_first_index_list
      let productsServices_first_str_list = this.data.productsServices_first_str_list
      productsServices_first_index_list.pop()
      productsServices_first_str_list.pop()
      this.setData({

        parentIndex: parentIndex - 1,
        data_list: new_daya_list,
        textarea_checked: textarea_checked,
        dismiss_checked: dismiss_checked,
        area_show_list: new_area_show_list,
        area_list_tank: area_list_tank,
        industry_first_index_list: industry_first_index_list,
        industry_first_str_list: industry_first_str_list,
        productsServices_first_index_list: productsServices_first_index_list,
        productsServices_first_str_list,
        productsServices_first_str_list

      })
      console.log("删除后的", new_area_show_list)
    } else {
      wx.showToast({
        title: '请先新增数据',
        icon: 'info',
        duration: 2000
      })
    }

  },
  // 控制元素的收起和展示
  packup: function(e) {
    let pack = e.currentTarget.dataset.pack
    let that = this
    if (pack == "mainBusiness") {
      that.setData({
        mainBusiness: !that.data.mainBusiness
      })
    }

  },


  startTimeChange(e) {
    let pid = e.currentTarget.dataset.pid
    let startTime = e.detail.value
    let history = this.data.my_workhistory
    history.workHistories[pid].startTime = startTime
    this.setData({
      my_workhistory: history
    })
    console.log("开始时间改变history", history)
  },
  endTimeChange(e) {
    let pid = e.currentTarget.dataset.pid
    let chose_date = e.detail.value
    let history = this.data.my_workhistory
    history.workHistories[pid].endTime = chose_date
    this.setData({
      my_workhistory: history
    })
    console.log("结束时间改变history", history)
  },
  // 自动聚焦
  autofocus: function(e) {
    console.log("自动聚焦")
  },
  // 输入事件
  bindKeyInput: function(e) {
    console.log("所有的输入事件", e)
    let that = this
    let content = e.detail.value
    let pid = e.currentTarget.dataset.pid
    let year = e.currentTarget.dataset.year
    let name = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index
    let mainBusiness_textarea_list = this.data.textarea_checked
    let dismiss_checked = this.data.dismiss_checked

    console.log("name====", name)
    console.log("content====", content)
    let history = that.data.my_workhistory
    // 主营业务 选择框
    let main_business_checked = that.data.main_business_checked
    // 离职原因的 选择框 
    let dimission_cause_checked = that.data.dimission_cause_checked
    let dimission_cause_content = that.data.dimission_cause_content
    if (name == "responsibleArea") {
      that.responsibleArea_input(e)
    } else if (name == "mainBusiness") {
      // 主营业务插入数据
      if (main_business_checked[pid][5]) {
        history.workHistories[pid].otherBusiness = content
      }
    } else if (name == "dimissionCause" && dimission_cause_checked[pid][index]) {
      dimission_cause_content[pid][index] = content
      console.log("其他离职原因离职原因", dimission_cause_content)
      that.setData({
        dimission_cause_content: dimission_cause_content
      })
      // 拼接离职原因
      that.pinjie_lizhi(dimission_cause_checked, dimission_cause_content, pid)
    } else if (year) {
      console.log("year存在", year)
    } else if (name == "salesIndicators") {
      history.workHistories[pid].salesIndicators = content
    } else if (name == "completion") {
      history.workHistories[pid].completion = content
    } else if (name == "averagePerformance") {
      history.workHistories[pid].averagePerformance = content
    } else if (name == "moodyhas") {
      history.workHistories[pid].moodyhas = content
    } else if (name == "job") {
      history.workHistories[pid].job = content
    } else if (name == "scale") {
      history.workHistories[pid].scale = content
    }
    that.setData({
      my_workhistory: history
    })
    console.log("监控键盘输入history", history)
  },

  // 处理离职原因字符串拼接
  pinjie_lizhi: function(dimission_cause_checked, dimission_cause_content, pid) {
    let history = this.data.my_workhistory
    let parentIndex = this.data.parentIndex
    let len = dimission_cause_checked.length
    console.log("dimission_cause_checked长度", len)
    console.log("dimission_cause_checked", dimission_cause_checked)
    console.log("dimission_cause_content", dimission_cause_content)
    for (let i = 1; i < len; i++) {
      let base_str = ""
      dimission_cause_checked[i].forEach(function(value, index) {
        if (value) {
          let content = dimission_cause_content[i][index]
          let str1 = index + "-" + content + "|"
          base_str += str1
        }
      })
      console.log("拼接好的离职原因", base_str)
      console.log("history", history)
      console.log("iiiiiiii", i)
      history.workHistories[i].dimissionCause = base_str
    }
    this.setData({
      my_workhistory: history
    })
  },
  // 负责区域函数相关
  responsibleArea_input: function(e) {
    // console.log("负责区域",e)
    let that = this
    that.set_null()
    let content = e.detail.value
    let pid = e.currentTarget.dataset.pid
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    let new_datalist = this.data.data_list
    // 存储主的
    let onestr = index + "-" + content + "|"
    let responsible_area_content = that.data.responsible_area_content
    let base_area_list = responsible_area_content[pid]
    base_area_list[index] = content
    responsible_area_content[pid] = base_area_list

    that.setData({
      responsible_area_content: responsible_area_content
    })
    console.log("responsible_area_content", responsible_area_content)
    that.area_data_parse(pid)
  },
  // 组合区域内容
  area_data_parse: function(pid) {
    let that = this
    let responsible_area_content = that.data.responsible_area_content
    let responsible_area_checked = that.data.responsible_area_checked
    let len = responsible_area_content.length
    for (let i = 0; i < len; i++) {
      // console.log("i",i)
      let base_list = responsible_area_checked[i]
      let responsible_content_list = responsible_area_content[i]

      console.log("base_list", base_list)
      console.log("responsible_content_list", responsible_content_list)
      let base_str = ""
      base_list.forEach(function(value, index) {
        console.log("base_list---val", value)
        console.log("base_list---index", index)
        if (value) {
          let str = responsible_content_list[index]
          if (str) {
            let str2 = index + "-" + str + "|"
            base_str += str2
          } else {
            let str2 = index + "|"
            base_str += str2
          }
        }
      })
      console.log("组合好的负责区域内容", base_str)
      let history = that.data.my_workhistory
      history.workHistories[pid].responsibleArea = base_str
      console.log("负责区域history", history)
      that.setData({
        my_workhistory: history,
        responsibleArea_str: base_str
      })
    }

  },
  /**
   * 搜索公司
   */
  handShowItem: function(e) {
    let _this = this
    let pid = e.currentTarget.dataset.pid;
    let my_workhistory = _this.data.my_workhistory
    let name = my_workhistory.workHistories[pid].moodyhas
    if (name == null || name == '') {
      wx.showToast({
        title: '公司名称为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://open.api.tianyancha.com/services/open/search/2.0?word=' + name,
        method: 'GET',
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': '98730b45-26cb-4dd5-ac64-5375d7477cb5',
        },
        success(res) {
          if (res.statusCode === 200) {
            if (res.data.result != null) {
              let value = []
              res.data.result.items.forEach(function(item, index) {
                value[index] = replace.replaceSpecialChar(item.name)
              })
              console.log('value', value)
              let organizationalCode_hide = _this.data.organizationalCode_hide
              organizationalCode_hide[pid] = false
              _this.setData({
                customernameList: value,
                organizationalCode_hide,
                open: true
              })
            } else {
              wx.showToast({
                title: '请增加字数',
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
  selectShowItem: function(e) {
    console.log('点击公司', e)
    let that = this
    let chose_index = e.currentTarget.dataset.mmindex
    let pid = e.currentTarget.dataset.pid
    let customernameList = that.data.customernameList
    let company_name = customernameList[chose_index]
    console.log("选择的公司", company_name)
    let my_workhistory = that.data.my_workhistory
    console.log("嘎嘎嘎", my_workhistory)
    my_workhistory.workHistories[pid].moodyhas = company_name
    let organizationalCode_hide = that.data.organizationalCode_hide
    organizationalCode_hide[pid] = true
    that.setData({
      my_workhistory,
      organizationalCode_hide
    })
    that.handGetCode(company_name, pid)
  },
  handGetCode(name, parentindex) {
    let _this = this
    wx.request({
      url: 'https://open.api.tianyancha.com/services/open/ic/baseinfo/2.0?name=' + name,
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': '98730b45-26cb-4dd5-ac64-5375d7477cb5',
      },
      success(res) {
        if (res.statusCode === 200) {
          console.log('res.data', res.data)
          if (res.data.result != null) {
            let my_workhistory = _this.data.my_workhistory
            my_workhistory.workHistories[parentindex].organizationalCode = res.data.result.creditCode
            // my_workhistory[parentindex] = res.data.result.creditCode
            _this.setData({
              my_workhistory: my_workhistory
            })
          } else {
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
  },
  keyExperiencesContentChange(e) {
    let key_experiences_content = this.data.key_experiences_content
    let pid = e.currentTarget.dataset.pid
    console.log("111eeeeee", e)
    let index = e.currentTarget.dataset.index
    key_experiences_content[pid][index] = e.detail.value
    this.setData({
      key_experiences_content: key_experiences_content
    })
    // let history = this.data.my_workhistory
    // console.log("关键经历组合后的history", history)
    console.log("key_experiences_content", key_experiences_content)
    this.zuhe_keyExperiencesData()
  },
  // 组合关键经历的数据 
  zuhe_keyExperiencesData: function() {
    let that = this
    let key_experiences_checked = that.data.key_experiences_checked
    let key_experiences_content = that.data.key_experiences_content
    let history = this.data.my_workhistory
    let len = key_experiences_checked.length
    for (let i = 0; i < len; i++) {
      let base_str = ''
      let one_checked_list = key_experiences_checked[i]
      let one_str_list = key_experiences_content[i]
      one_checked_list.forEach(function(value, index) {
        if (value) {
          let str = one_str_list[index]
          let str2 = index + "-" + str + "|"
          base_str += str2
        }
      })
      console.log("遍历选择框后的结果", base_str)
      history.workHistories[i].keyExperiences = base_str
    }
    this.setData({
      my_workhistory: history
    })
    console.log("遍历选择框后的结果history", history)
  },
  // 关键内容的选择框 内容 二维列表
  // key_experiences_checked: [
  //   [false, true, false, false, false]
  // ],
  // key_experiences_content: [
  //   ["", "hhhhh", "", "", ""]
  // ],
  keyExperiencesData: function(e) {
    let that = this
    // 父级
    let pid = e.currentTarget.dataset.pid
    let key_experiences_checked = that.data.key_experiences_checked
    let key_experiences_content = that.data.key_experiences_content
    let checked_list = e.detail.value
    // 关键内容的选择框 内容 二维列表
    let base_str = ''
    console.log("选中的关键经历有", checked_list)
    key_experiences_checked[pid].forEach(function(value, index) {
      index = index.toString()
      let has_checked = checked_list.indexOf(index)
      if (has_checked > -1) {
        key_experiences_checked[pid][index] = true
        let str = key_experiences_content[pid][index]
        let str2 = index + "-" + str + "|"
        base_str += str2
      } else {
        key_experiences_checked[pid][index] = false
      }
    })
    let history = that.data.my_workhistory
    history.workHistories[pid].keyExperiences = base_str
    that.setData({
      key_experiences_checked: key_experiences_checked,
      my_workhistory: history
    })
    console.log("关键经历组合后的history", history)
  },
  keyExperiencesCheckboxChange: function(e) {
    let data = [0, 0, 0, 0, 0]
    let pid = e.currentTarget.dataset.pid
    console.log("pid", pid)
    e.detail.value.forEach(function(item, index) {
      switch (item) {
        case '0':
          data[0] = 1
          //   //TODO
          break;
        case '2':
          data[2] = 1
          //TODO
          break;
        case '3':
          data[3] = 1
          //TODO
          break;
        case '4':
          data[4] = 1
          //TODO
          break;
        case '1':
          data[1] = 1
          //TODO
          break;
      }
    })
    let selected = this.data.selected
    let checked_box = this.data.checked_box
    selected[pid] = data
    checked_box[pid] = e.detail.value
    this.setData({
      selected: selected,
      checked_box: checked_box
    })
    console.log("checked_box", checked_box)
    console.log("selected", selected)

    this.keyExperiencesData(e)
  },
  habitationProvincesChange: function(e) {
    console.log("下拉框事件", e)
    let that = this
    let content = e.detail.value
    let pid = e.currentTarget.dataset.pid
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    let history = that.data.my_workhistory
    history.workHistories[pid].salary = content
    let salary_index = that.data.salary_index
    salary_index = content
    that.setData({
      my_workhistory: history,
      salary_index: salary_index
    })
    console.log("薪资水平history", history)
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  // 验证近三年 的业绩指标
  yeji_zhibiao: function() {
    let that = this
    let history = this.data.my_workhistory
    let workHistoryExtends = this.data.my_workhistory.workHistoryExtends
    console.log("workHistoryExtends", workHistoryExtends)
    for (let i = 0; i < 3; i++) {
      let salesIndicators = workHistoryExtends[i].salesIndicators
      let completion = workHistoryExtends[i].completion
      // let productsServices = workHistoryExtends[i].productsServices
      if (salesIndicators == "" || typeof(salesIndicators) == "undefined" || salesIndicators == null) {
        that.verify_values("header_salesIndicators", i)
        return false
      }
      if (completion == "" || typeof(completion) == "undefined" || completion == null) {
        that.verify_values("completion_1", i)
        return false
      }

      // if (productsServices == "" || typeof(productsServices) == "undefined" || productsServices == null) {
      //   that.verify_values("productsServices")
      //   return false
      // }
    }
    that.setData({
      redyears: null,
      redname: '',
    })
    return true
  },
  // 验证是不是在一条记录中
  // confirm_is_exit(name)
  // 重写验证逻辑
  new_form_verify: function() {
    let that = this
    let history = this.data.my_workhistory
    this.header_tihuan_second_qita()
    let workHistories_list = this.data.my_workhistory.workHistories
    let result = that.yeji_zhibiao()

    if (result) {
      console.log("========================================")
      console.log("workHistories_list", workHistories_list)
      // 判断长度 如页面长度大于1 
      // 余下的都要验证--》写了一个，全都要写，一个没写可以通过
      let my_len = workHistories_list.length
      console.log("储存的数据的长度", my_len)
      for (let i = 0; i < my_len; i++) {
        let one_history = workHistories_list[i]
        console.log("asdja", one_history.startTime)
        if ('startTime' in one_history && one_history.startTime) {
          console.log("开始时间存在")
        } else {
          console.log("开始时间不存在")
          that.verify_values("startTime","startTime"+i)
          return
        }
        if ('endTime' in one_history && one_history.endTime) {
          console.log("endTime存在")
        } else {
          console.log("endTime不存在")
          // that.verify_values("endTime")
          that.verify_values("endTime", "endTime" + i)

          return
        }
        if ('moodyhas' in one_history && one_history.moodyhas) {
          console.log("moodyhas存在")
        } else {
          console.log("moodyhas不存在")
          that.verify_values("moodyhas", "moodyhas" + i)
          // that.verify_values("moodyhas")
          return
        }
        if ('organizationalCode' in one_history && one_history.organizationalCode) {
          console.log("organizationalCode存在")
        } else {
          console.log("organizationalCode不存在")
          that.verify_values("organizationalCode", "organizationalCode" + i)

          // that.verify_values("organizationalCode")
          return
        }
        if ('job' in one_history && one_history.job) {
          console.log("job存在")
        } else {
          console.log("job不存在")
          that.verify_values("job", "job" + i)

          // that.verify_values("job")
          return
        }
        if ('mainBusiness' in one_history && one_history.mainBusiness) {
          console.log("mainBusiness存在")
        } else {
          console.log("mainBusiness不存在")
          that.verify_values("mainBusiness", "mainBusiness" + i)

          // that.verify_values("mainBusiness")
          return
        }
        if ('responsibleArea' in one_history && one_history.responsibleArea) {
          console.log("responsibleArea存在")
        } else {
          console.log("responsibleArea不存在")
          that.verify_values("responsibleArea", "responsibleArea" + i)

          // that.verify_values("responsibleArea")
          return
        }
        if ('industry' in one_history && one_history.industry) {
          console.log("industry存在")
        } else {
          console.log("industry不存在")
          that.verify_values("industry", "industry" + i)

          // that.verify_values("industry")
          return
        }
        if ('productsServices' in one_history && one_history.productsServices) {
          console.log("productsServices存在")
        } else {
          console.log("productsServices不存在")
          that.verify_values("productsServices", "productsServices" + i)

          // that.verify_values("productsServices")
          return
        }
      }
      return true
    } else {
      return false
    }
  },

  // 验证逻辑
  myform_verify: function() {
    let that = this
    let history = this.data.history
    let workHistories_list = this.data.history.workHistories
    console.log("========================================")
    console.log("workHistories_list", workHistories_list)
    let workHistoryExtends = this.data.history.workHistoryExtends
    let str = form_verify.form_verify(workHistoryExtends[0])
    let str2 = form_verify.form_verify(workHistoryExtends[1])
    let base_str = str + str2
    workHistories_list.forEach(function(value, index) {
      let str3 = form_verify.form_verify(value)
      let str4 = ""
      // 第一页 字段过滤
      if (index == 0) {
        let str3_list = str3.split("|")
        let position = str3_list.indexOf("endTime")
        let position_2 = str3_list.indexOf("dimissionCause")
        let position_3 = str3_list.indexOf("otherCause")
        str3_list[position_2] = ""
        str3_list[position] = ""
        str3_list[position_3] = ""
        console.log("删除第一个的endtime", str3_list)
        str3_list.forEach(function(v, i) {
          if (v) {
            v = v + "|"
            str4 += v
          }
        })
      } else {
        let str3_list = str3.split("|")
        let position = str3_list.indexOf("salary")
        str3_list[position] = ""
        console.log("删除除了第一个的salary", str3_list)
        str3_list.forEach(function(v, i) {
          if (v) {
            v = v + "|"
            str4 += v
          }
        })
      }
      base_str += str4
    })
    console.log("总的空值数据", base_str)
    if (base_str) {
      let more_null_list = base_str.split("|")
      let base_null_list = []
      base_null_list.push(more_null_list[0])
      let result_list = []
      base_null_list.forEach(function(value, index) {
        let result = that.verify_values(value)
        if (typeof(result) == "undefined") {
          result_list.push(false)
          return false
        } else {
          result_list.push[true]
        }
      })
      console.log("验证结果", result_list)
      return result_list
      // 验证不通过
    } else {
      // 验证通过
      console.log("直接全部验证通过")

      return true
    }

  },
  // 错误弹窗
  show_error: function(msg) {
    wx.showModal({
      title: '温馨提示',
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 组织机构代码
  bindinputOrganizationalCode:function(e){
    let that = this
    console.log("组织机构代码输入",e)
    let pid = e.currentTarget.dataset.pid
    let value = e.detail.value
    let my_workhistory = that.data.my_workhistory
    my_workhistory.workHistories[pid]['organizationalCode'] = value
    that.setData({ my_workhistory})
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
      let miss = res[1].scrollTop + res[0].top -100 ;
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
    console.log("滚动到", name)
    this.find_position(name)
  },
  verify_values: function(value, year) {

    switch (value) {
      case "header_salesIndicators":
        this.show_error('请选择销售指标')
        this.setData({
          redyears: year,
          redname: 'salesIndicators_1'
        })
        let str = "#" +"salesIndicators_1"
        this.scroll(str)
        return
        break;
      case "completion_1":
        this.show_error('请选择完成金额')
        this.setData({
          redyears: year,
          redname: 'completion_1'
        })
        this.scroll('#completion_1')
        return 
        break;
      case "organizationalCode":
        this.show_error('请填写机构代码')
        this.setData({
          // redyears: year,
          redname: year
        })
        this.scroll('#'+year)
        break;
      case "startTime":
        this.show_error('请选择开始时间')
        this.setData({
          redname: year
        })
        this.scroll('#'+year)
        break;
      case "endTime":
        //TODO
        this.show_error('请选择结束时间')
        break;
      case "mainBusiness":
        //TODO
        this.show_error('请选择主营业务')
        break;
      case "averagePerformance":
        this.show_error("请选择平均业绩")
        break;
      case "completion":
        this.show_error("请选择完成金额")
        break;
      case "dimissionCause":
        this.show_error("请选择离职原因")
        break;
      case "industry":
        this.show_error("请选择负责行业")
        break;
      case "job":
        this.show_error("请选择岗位名称")
        break;
      case "keyExperiences":
        this.show_error("请选择关键经历")
        break;
      case "moodyhas":
        this.show_error("请选择任职公司")
        break;
      case "productsServices":
        this.show_error("请选择产品服务")
        break;
      case "responsibleArea":
        this.show_error("请选择负责区域")
        break;
      case "salesIndicators":
        this.show_error("请选择销售指标")
        break;
      case "scale":
        this.show_error("请选择管理规模")
        break;
      default:
        console.log("全部通过")
        return true
    }
    this.setData({
      redname: year
    })
    this.scroll('#' + year)
 
  },
  // 表单提交 
  formSubmit: function(e) {
    let salary = this.data.my_workhistory.workHistories[0].salary
    let salary_index = this.data.salary_index
    console.log("薪资索引", salary_index)
    // if (salary_index == null || salary_index == "") {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: "薪资水平为空",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    //   return false
    // }
    let pass_list = this.new_form_verify()
    if (pass_list == true) {
      console.log("验证通过")
      this.upload_data()
    } else {
      console.log("验证失败")
    }
  },
  // 替换头部第二个选择框中的其他
  header_tihuan_second_qita: function() {
    let that = this
    let header_products_services = that.data.header_products_services
    let header_productsServices_content_list = that.data.header_productsServices_content_list
    header_products_services.forEach(function(value, index) {
      if (value[1] == "其他") {
        header_products_services[index][1] = header_productsServices_content_list[index]
      }
    })
    that.setData({
      header_products_services
    })
    console.log("替换其他后的内容header_products_services", header_products_services)
    this.header_write_to_history();
  },
  // 拼接头部产品服务信息
  header_write_to_history: function() {
    let history = this.data.my_workhistory
    let header_products_services = this.data.header_products_services
    header_products_services.forEach(function(value, index) {
      console.log("拼接头部value", value)
      console.log("拼接头部index", index)
      if (value[0]) {
        let base_str = value[0] + "|" + value[1]
        history.workHistoryExtends[index].productsServices = base_str
      }
    })
    this.setData({
      my_workhistory: history
    })
    console.log("替换后的结果my_workhistory，", history)
  },
  // 替换第二个选择框中的其他
  tihuan_second_qita: function() {
    // 储存选项内容的列表
    let productsServices_first_str_list = this.data.productsServices_first_str_list
    // 储存 其他选项内容的列表
    let productsServices_content_list = this.data.productsServices_content_list
    productsServices_first_str_list.forEach(function(value, index) {
      if (value[1] == "其他") {
        productsServices_first_str_list[index][1] = productsServices_content_list[index]
      }
    })

    this.setData({
      productsServices_first_str_list: productsServices_first_str_list
    })
    console.log("替换其他后的内容productsServices_first_str_list", productsServices_first_str_list)
    this.write_to_history();

  },
  // 手动点击提交按钮  最后的数据处理 
  upload_data: function() {
    let history = this.data.my_workhistory
    let baseId = this.data.baseId
    let parentIndex = this.data.parentIndex
    for (let i = 0; i < parentIndex; i++) {
      history.workHistories[i].baseId = baseId
    }
    // 
    this.tihuan_second_qita()
    // 
    let status = wx.getStorageSync('status')
    if (status.workHistory) {
      //为真 增加前先删除原有记录在增加新纪录
      let _this = this
      let delUrl = '/work/history/baseId/' + baseId
      api.remove(delUrl).then((res) => {
        // 数据库id 不存在 
        let url = "/work/history"
        api.post(url, history).then(function(res) {
          console.log("先删除后上传返回的数据", res)
          if (res.data == true) {
            upload.success()
            wx.navigateTo({
              url: '../thirdPart/thirdPart',
            })
          }
        })
      })
    } else {
      // 第一次 增加
      // 数据库id 不存在 
      let url = "/work/history"
      api.post(url, history).then(function(res) {
        console.log("直接上传返回的数据", res)
        if (res.data == true) {
          upload.success()
          wx.navigateTo({
            url: '../thirdPart/thirdPart',
          })
        }
      })
    }

    console.log("上传的数据", history)
    // let sj_id = history.workHistories[parentIndex -1].id
    // if (sj_id) { 
    //   // 此处有疑问 。数据库id存在 说明是更新操作 
    //   // 但是如果用户新增页面， 数据库id 将不存在 我也不能本地加1 考虑多人上传时候
    //   let url = "/work/history"
    //   api.put(url, history).then(function (res) {
    //     console.log("返回的数据", res)
    //     if (res.data == true) {
    //       upload.success()
    //     }
    //   })
    // }else{
    //   // 数据库id 不存在 
    //   let url = "/work/history"
    //   api.post(url, history).then(function (res) {
    //     console.log("返回的数据", res)
    //     if (res.data == true) {
    //       upload.success()
    //     }
    //   })
    // }

  },
  // 首次进入查询 用户数据 
  get_user_data: function() {
    let that = this
    let baseId = that.data.baseId
    console.log("即将用的baseID", baseId)
    if (baseId) {
      let parentIndex = that.data.parentIndex
      let url = "/work/history/baseId/" + baseId
      api.get(url).then(function(res) {
        console.log("返回的数据", res)
        let len = res.data.workHistories.length
        that.setData({
          parentIndex: len,
          my_workhistory: res.data
        })
        that.recover_data()
      })
    } else {
      // baseId 不存在
      console.log(" baseId 不存在")
    }
  },
  // 数据还原
  recover_data: function() {
    let that = this
    that.recover_main_business()
    that.recover_responsible_area()
    that.recover_key_experiences()
    that.recover_timer()
    that.recover_productsServices()
    // 薪资水平
    that.recover_salary()
    // 数据库ID
    that.recover_dimission_cause()
    // 还原 头部的产品和服务
    that.recover_header_productsServices()
    // 还原负责行业
    that.recover_industry()
    // 还原 状态按钮
    // that.recover_hide_model()
  },
  // 还原状态按钮
  recover_hide_model: function() {
    let that = this
    let hide_model = that.data.hide_model
    let industry_chosed_list = that.data.industry_chosed_list
    let parentIndex = that.data.parentIndex
    for (let i = 0; hide_model.length < parentIndex; i++) {
      hide_model.push({
        zhuying: false,
        fuzhe: false,
        guanjian: false,
        lizhi: false
      })
      industry_chosed_list.push([])
    }
    that.setData({
      hide_model,
      industry_chosed_list
    })
  },
  // 还原薪资水平
  recover_salary: function() {
    let that = this
    let salary_index = that.data.salary_index
    let history = that.data.my_workhistory
    salary_index = history.workHistories[0].salary
    that.setData({
      salary_index: salary_index
    })
  },
  // 还原负责行业
  recover_industry: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let workHistories = history.workHistories
    let industry_chosed_list = []
    for (let i = 0; i < parentIndex; i++) {
      let main_str = workHistories[i].industry
      if (main_str) {
        let neibu_list = main_str.split("|")
        industry_chosed_list.push(neibu_list)
      }
    }
    that.setData({
      industry_chosed_list
    })
  },
  // 还原头部产品和服务
  recover_header_productsServices: function() {
    let that = this
    let history = that.data.my_workhistory
    let workHistoryExtends = history.workHistoryExtends
    let header_products_services = []
    for (let i = 0; i < workHistoryExtends.length; i++) {
      header_products_services.push([null, null])
      let main_str = history.workHistoryExtends[i].productsServices
      console.log("头部的负责产品信息", main_str)
      if (main_str) {
        let main_list = main_str.split("|")
        console.log("main_list", main_list)
        header_products_services[i][0] = main_list[0]
        header_products_services[i][1] = main_list[1]
      }
    }
    that.setData({
      my_workhistory: history,
      header_products_services
    })
  },
  // 负责产品和服务
  recover_productsServices: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let productsServices_first_str_list = []
    let productsServices_first_index_list = []
    let productsServices_my_str= []
    for (let i = 0; i < parentIndex; i++) {
      productsServices_first_index_list.push([null, null])
      productsServices_first_str_list.push([null, null])
      productsServices_my_str.push([])
      let main_str = history.workHistories[i].productsServices
      if (main_str) {
        let base_list = main_str.split("|")
        productsServices_my_str[i]=base_list
        // console.log("main_list", main_list)
        // productsServices_first_str_list[i][0] = main_list[0]
        // productsServices_first_str_list[i][1] = main_list[1]
      }
    }
    that.setData({
      productsServices_my_str
      // productsServices_first_str_list: productsServices_first_str_list,
      // productsServices_first_index_list
    })
    console.log("还原后的productsServices_my_str", productsServices_my_str)
  },
  // 时间还原
  recover_timer: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    for (let i = 0; i < parentIndex; i++) {
      let startTime = history.workHistories[i].startTime
      let endTime = history.workHistories[i].endTime
      if (startTime) {
        console.log("startTime", startTime.substring(0, 10))
        history.workHistories[i].startTime = startTime.substring(0, 10)
      }
      if (i == 0 && endTime == null) {
        console.log("将第一个设置为至今")
        that.setData({
          index: 0
        })
      }
      if (endTime) {
        console.log("endTime", endTime.substring(0, 10))
        history.workHistories[i].endTime = endTime.substring(0, 10)
      }
    }
    that.setData({
      my_workhistory: history
    })
  },
  // 离职原因
  recover_dimission_cause: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let dimission_cause_checked = []
    let dimission_cause_content = []
    // console.log("起始main_business_checked", main_business_checked)

    let main_business_str = ""
    for (let i = 0; i < parentIndex; i++) {
      dimission_cause_checked.push([false, false, false, false, false, false, false, false, ])
      dimission_cause_content.push([null, null, null, null, null, null, null, null])
      let main_str = history.workHistories[i].dimissionCause
      if (main_str) {
        let main_list = main_str.split("|")
        console.log("main_list", main_list)
        // main_list = ["0-adas","1-asdasda",]
        main_list.forEach(function(value, index) {
          if (value) {
            let value_list = value.split("-")
            console.log("value_list", value_list)
            console.log("iiiiiiiiiiiiii", i)
            // [0,"adas"]
            let myindex = parseInt(value_list[0])
            let content = value_list[1]
            console.log("myindex", myindex)
            console.log("content", content)

            dimission_cause_checked[i][myindex] = true
            dimission_cause_content[i][myindex] = content
            // console.log("dimission_cause_checked", dimission_cause_checked)
          }
        })
      }
    }
    that.setData({
      dimission_cause_checked: dimission_cause_checked,
      dimission_cause_content: dimission_cause_content
    })
  },
  // 关键内容 二维内容
  recover_key_experiences: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let key_experiences_checked = []
    let key_experiences_content = []
    for (let i = 0; i < parentIndex; i++) {
      key_experiences_checked.push([false, false, false, false, false])
      key_experiences_content.push(["", "", "", "", ""])
      let main_str = history.workHistories[i].keyExperiences
      if (main_str) {
        let main_list = main_str.split("|")
        console.log("main_list", main_list)
        main_list.forEach(function(value, index) {
          if (value) {
            console.log("value存在", value)
            value = value.split("-")
            let index = value[0]
            let con = value[1]
            console.log("索引", index)
            key_experiences_checked[i][index] = true
            key_experiences_content[i][index] = con
          }
        })
      }
    }
    that.setData({
      key_experiences_checked: key_experiences_checked,
      key_experiences_content: key_experiences_content
    })
  },
  // 还原负责区域 有内容的
  recover_responsible_area: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let responsible_areaAption = that.data.responsible_areaAption
    let responsible_area_checked = []
    let responsible_area_content = []
    let responsibleArea_my_str = []
    for (let i = 0; i < parentIndex; i++) {
      responsible_area_checked.push([false, false, false, false, false, ])
      responsible_area_content.push(["", "", "", "", ""])
      responsibleArea_my_str.push([])
      let main_str = history.workHistories[i].responsibleArea
      if (main_str) {
        let main_list = main_str.split("|")
        console.log("main_list", main_list)
        main_list.forEach(function(value, index) {
          if (value) {
            console.log("value存在", value)
            value = value.split("-")
            let my_index = value[0]
            let con = value[1]
            console.log("索引", my_index)
            responsible_area_checked[i][my_index] = true
            responsible_area_content[i][my_index] = con
            let my_str = ''
            if (con) {
              my_str = responsible_areaAption[my_index].value + "-" + con
            } else {
              my_str = responsible_areaAption[my_index].value
            }
            responsibleArea_my_str[i].push(my_str)
          }
        })
      }
    }
    that.setData({
      responsible_area_checked: responsible_area_checked,
      responsible_area_content: responsible_area_content,
      responsibleArea_my_str
    })
  },
  //  还原主营业务
  recover_main_business: function() {
    let that = this
    let history = that.data.my_workhistory
    let parentIndex = that.data.parentIndex
    let mainBusiness_my_chosed = []
    let options = that.data.options
    for (let i = 0; i < parentIndex; i++) {
      let main_str = history.workHistories[i].mainBusiness
      mainBusiness_my_chosed.push([])
      console.log("主营业务main_str", main_str)
      if (main_str == '0' || main_str) {
        let main_list = main_str.split("|")
        console.log("主营业务", main_list)
        main_list.forEach(function(value, index) {
          if (value == '0' || value) {
            console.log("value存在", value)
            let my_index = parseInt(value)
            let one_str = options[my_index]
            mainBusiness_my_chosed[i].push(one_str)
            // console.log("main_business_checked", main_business_checked)
            // main_business_checked[i][value] = true
            // console.log("main_business_checked", main_business_checked)
          }
        })
      }
    }
    that.setData({
      mainBusiness_my_chosed
    })
  },
  panduan_cunzai: function() {
    // 取 status 缓存，判断本页面是否填写 已填写，则查询填写数据并显示
    let status = wx.getStorageSync('status')
    if (status.workHistory) {
      this.get_user_data();
      // this.searchContent(userIdEnc)
    } else {
      console.log("用户未填写过")
    }
    this.setData(({
      status
    }))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 9.5日 记录
    // 首先进入页面以后先给存储页面数据的基础对象 添加已知的元素 baseId id等
    // 获取数据库 记录以后进行数据的还原 数据的分发存储 和对默认数据的赋值 
    // 如果数据是多条，需要自动新增页面，并对新增的页面进行赋默认值
    // let base_workHistories = this.data.base_workHistories
    // 需要将 负责产品服务的 字符串反解析 为存储的 二维列表中的值
    //  关键经历 的也要反解析
    let userIdEnc = wx.getStorageSync('userIdEnc')
    console.log("缓存中的baseID", userIdEnc)
    // 头部三年业绩指标
    let thisyear = (new Date().getFullYear())

    this.setData({
      thisYear: new Date().getFullYear(),
      todayTime: util.formatTime(new Date()),
      baseId: userIdEnc
    })
    console.log('todayTime', util.formatTime(new Date()))
    console.log("今年", thisyear),

      this.initValidate();
    // this.get_baseId();
    this.panduan_cunzai()

  },

  get_baseId: function() {
    var baseId = 10
    this.setData({
      baseId: baseId
    })
    // this.get_id(baseId)
  },
  get_id: function(baseId) {
    // var baseID = 123
    var that = this
    let url = "/work/history/baseId/" + baseId
    console.log("baseId", baseId)
    api.get(url).then((res) => {
      console.log("首次请求返回的数据", res)
      let len = res.data.workHistories.length
      console.log("len", len)
      if (len == 0) {
        // 用户没有上传过
        console.log("用户未填写过，手动提交一次，并且获取id")
        let base_dict = res.data
        console.log("baseId", baseId)
        let data_dict = {}
        data_dict.baseId = baseId
        base_dict.workHistories.push(data_dict)
        base_dict.workHistoryExtends.push(data_dict)
        // let workHistories = that.data.workHistories
        // workHistories[0].baseId =baseId
        let post_url = "/work/history"
        api.post(post_url, base_dict).then(function(res) {
          console.log("首次post的结果", res)
          that.get_id(baseId)
        })
      } else {
        // 用户上传过

        let uid = res.data.workHistories[0].id
        let workHistories = that.data.workHistories
        let workHistoryExtends = that.data.workHistoryExtends
        workHistories[0].id = uid
        workHistories[0].baseId = baseId
        that.setData({
          uid: uid,
          workHistories: workHistories,
          workHistoryExtends: workHistoryExtends,
          // 当前页面数量
          parentIndex: len,
          // 用于用户新增数据
          base_workHistoryExtends: workHistoryExtends
        })
        for (let i = 0; i < len; i++) {
          that.addnew()
        }
        console.log("用户已填写过，使用更新接口", uid)
        console.log("写入workHistories的结果是", workHistories)
      }
    })
  },
  initValidate: function() {
    let rules = {
      startTime: {
        required: true,
      },
      birth: {
        required: true,
      },
      moodyhas: {
        required: true,
      },
      job: {
        required: true,
      },
      scale: {
        required: true,
      },
      mainBusiness: {
        required: true,
      },
      responsibleArea: {
        required: true,
      },
      industry: {
        required: true,
      },
      productsServices: {
        required: true,
      },
      salesIndicators: {
        required: true,
      },
      completion: {
        required: true,
      },
      keyExperiences: {
        required: true,
      },
      dimissionCause: {
        required: true,
      },
      averagePerformance: {
        required: true,
      },
      salesIndicators_1: {
        required: true,

      },
      completion_1: {
        required: true,
      }

    }

    let message = {
      startTime: {
        required: '请选择开始时间',
      },
      birth: {
        required: '请选择结束时间',
      },
      moodyhas: {
        required: '请输入公司名称',
      },
      job: {
        required: '请输入岗位名称',
      },
      scale: {
        required: '请输入下属人数',
      },
      mainBusiness: {
        required: '请选择主营业务',
      },
      responsibleArea: {
        required: '请选择负责区域',
      },
      industry: {
        required: '请选择负责行业',
      },
      productsServices: {
        required: '请选择产品服务',
      },
      salesIndicators: {
        required: '请输入销售指标',
      },
      completion: {
        required: '请输入完成金额',
      },
      keyExperiences: {
        required: '请选择关键经历',
      },
      dimissionCause: {
        required: '请选择离职原因',
      },
      habitationProvince: {
        required: '请选择薪资水平',
      },
      averagePerformance: {
        required: '请选择平均指标',
      },
      salesIndicators_1: {
        required: '请输入销售指标',
      },
      completion_1: {
        required: '请输入完成金额',
      }

    }
    //实例化当前的验证规则和提示消息
    this.wxValidate = new wxValidate(rules, message);
  },

  getFirst: function(first_q, name) {
    let that = this
    let url = "/dictionary/first?question=" + first_q
    api.get(url).then((res) => {
      // console.log(res.data)
      let indus_first_answer = res.data
      if (name == "industry") {
        that.setData({
          indus_first_answer: indus_first_answer
        })
      } else {
        console.log("负责产品第一题获取成功")
        that.setData({
          productsServices_first_answer: indus_first_answer
        })
      }
      console.log(indus_first_answer)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getFirst("负责行业", "industry")
    this.getFirst("负责产品/服务", "productsServices")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

})