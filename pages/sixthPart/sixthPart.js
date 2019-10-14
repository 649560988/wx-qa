// pages/sixthPart/sixthPart.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
import upload from '../../utils/upload.js'
import form_verify from '../../utils/formVerify.js'
let baseUrl = getApp().baseUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 行业选择的数据列表 ——字符串
    industry_chose_str:"",
    industry_list:[],
    industry_option: ['工业', '商业', 'IT行业', '农业'],
    // 组织规模 索引列表
    organizationScale_str:"",
    organizationScale_list:[],
    organizationScale_option:['初创企业','中小型企业','大型企业','世界500强'],
    // 企业性质
    enterpriseQuality_str:"",
    enterpriseQuality_list:[],
    enterpriseQuality_option: ['国企', '民企', '外企', '非营利组织', '事业单位', '合资单位'],

    // 职能领域 单选
    functionField_str:"",
    functionField_option: ["员工", "组长", "班长", "副经理", "总经理", "副总裁", "总裁"],
    //省份 城市 
    workPlaceProvinces_str: "",
    workPlaceProvinces: [],
    workPlaceCitys_str: "",
    workPlaceCitys: [],

    // 期望薪资
    hope_salary: ["（0-20万】", "（20-40万】", "（40-60万】", "（60-80万】", "（80-100万】", "（100-120万】", "（120-140万】", "（140-160万】", "（160-180万】", "（180-200万】", "200万以上"],

    
    finishStatus: [],
    wechatId: '',
    upload_data: {
      "baseId": null,
      "enterpriseQuality": "",
      "expectPost": "",
      "expectSalary": null,
      "functionField": "",
      "id": null,
      "industry": "",
      "organizationScale": "",
      "selfEvaluation": "",
      "workPlace":"",
    },
    // 单选框分开取值
    first_checked: true,
    second_checked: true,
    sales_work_list: ['OP产品', 'SAAS产品', '物联网', '人工智能', '解决方案'],

    // 记录上一次点的那个单选框
    last_checked: null,
    // 记录期望岗位复选框选中的值
    gangwei_checked_value_list: [],
    gangwei_checked_str_list: [],
    // 记录第一题的字符串
    expectPost_str: "",
    other_sales_work_str: "",
    // 销售岗位中的 其他
    first_values: "哈哈",
    othersale_work: "",
    items: [{
        name: '销售类岗位',
        value: '销售类岗位',
        hidden: true,
        checked: false
      },
      {
        name: '非销售类岗位',
        value: '非销售类岗位',
        hidden: true,
        checked: false
      },
    ],
    pageone: [{
      name: "销售类岗位",
      text: " 销售类岗位",
      checked: false
    }, ],
    pagetwo: [{
      name: "非销售类岗位",
      text: " 非销售类岗位",
      checked: false
    }],
    sales_work: [{
        "name": "OP产品",
        "hidden": true,
        checked: false

      },
      {
        "name": "SAAS产品",
        "hidden": true,
        checked: false,
      },
      {
        checked: false,
        "name": "物联网",
        "hidden": true
      },
      {
        checked: false,
        "name": "人工智能",
        "hidden": true
      },
      {
        checked: false,
        "name": "解决方案",
        "hidden": true
      },
      {
        checked: false,
        "name": "其他",
        "hidden": true,
        value: ""
      },
    ],
    plan: [{
        index: null,
        title: "行业：",
        reminder: "行业",

        option: ['工业', '商业', 'IT行业', '农业'],
      },
      {
        index: null,
        reminder: "公司规模",
        title: "期望入职公司规模:",
        option: ['0-12', '12-25', '25-50', '50-75', '75-150', '150-325', '325-750', '750-1500', '1500-3500', '3500-5000', '5000-7500', '7500-30000', '30000-75000']
      },
      {
        index: null,
        reminder: "职能领域",
        title: "职能领域：",
        option: ["员工", "组长", "班长", "副经理", "总经理", "副总裁", "总裁"]
      }
    ],
    salary: [{
      index: null,
      title: "期望薪资：",
      reminder: "期望薪资",
      option: ["（0-20万】", "（20-40万】", "（40-60万】", "（60-80万】", "（80-100万】", "（100-120万】", "（120-140万】", "（140-160万】", "（160-180万】", "（180-200万】", "200万以上"]
    }],
    // 存储要发送的数据
    post_data: [{}],
    selfEvaluation: null,
    qiye: {
      index: null,
      reminder: "企业性质",
      title: "期望入职公司企业性质：",
      option: ['国企', '民企', '外企', '非营利组织', '事业单位', '合资单位'],
    },
    qiye_check_list: [],
  },
  // 第二题列表改变
  picker_change:function(e){
    console.log("第二题列表改变",e)
    let that = this
    let index = e.detail.value
    let category = e.currentTarget.dataset.name
    if(category == "industry"){
      // 行业
      let industry_option = that.data.industry_option
      let chose_str = industry_option[index]
      let industry_list = that.data.industry_list
      if(industry_list.indexOf(chose_str) > -1){
        that.is_exist()
        return
      }else{
        industry_list.push(chose_str)
        that.setData({
          industry_chose_str:chose_str,
          industry_list
        })
      }
    }
    else if (category == "organizationScale"){
      // 期望入职公司规模
      let organizationScale_option = that.data.organizationScale_option
      let chose_str = organizationScale_option[index]
      let organizationScale_list = that.data.organizationScale_list
      if (organizationScale_list.indexOf(chose_str) > -1){
        that.is_exist()
        return
      }else{
        organizationScale_list.push(chose_str)
        that.setData({
          organizationScale_list,
          organizationScale_str:chose_str,
        })
      }
    }
    else if (category == "enterpriseQuality") {
      // 期望入职公司规模
      let enterpriseQuality_option = that.data.enterpriseQuality_option
      let chose_str = enterpriseQuality_option[index]
      let enterpriseQuality_list = that.data.enterpriseQuality_list
      if (enterpriseQuality_list.indexOf(chose_str) > -1) {
        that.is_exist()
        return
      } else {
        enterpriseQuality_list.push(chose_str)
        that.setData({
          enterpriseQuality_list,
          enterpriseQuality_str: chose_str,
        })
      }
    }
  },
  // 删除按钮
  del_picker_change:function(e){
    console.log("删除按钮",e)
    let that = this
    let category = e.currentTarget.dataset.name
    let value = e.currentTarget.dataset.value

    if (category == "industry_list"){
      // 行业
      let industry_list = that.data.industry_list
      let index = industry_list.indexOf(value)
      if(index >-1){
        industry_list.splice(index,1)
        that.setData({ industry_list, industry_chose_str:""})
      }
    }
    else if (category == "organizationScale_list"){
      // 公司规模
      let organizationScale_list = that.data.organizationScale_list
      let index = organizationScale_list.indexOf(value)
      if(index > -1){
        organizationScale_list.splice(index,1)
        that.setData({ organizationScale_list, organizationScale_str:""})
      }
    }
    else if (category == "enterpriseQuality_list") {
      // 公司规模
      let enterpriseQuality_list = that.data.enterpriseQuality_list
      let index = enterpriseQuality_list.indexOf(value)
      if (index > -1) {
        enterpriseQuality_list.splice(index, 1)
        that.setData({ enterpriseQuality_list, enterpriseQuality_str: "" })
      }
    }
  },
  is_exist:function(){
    wx.showToast({
      title: '此选项已存在',
      icon:'none'
    })
  },
  // 更新上传内容
  update_upload_data:function(e){
    let that = this
    let upload_data = that.data.upload_data
    // 行业
    let industry_list = that.data.industry_list
    let industry = industry_list.join("|")
    upload_data.industry = industry
    // 期望入职公司规模
    let organizationScale_option = that.data.organizationScale_option
    let organizationScale_list = that.data.organizationScale_list
    let organizationScale_index_list = []
    organizationScale_list.forEach(function(value,index){
      // console.log("期望入职value",value)
      let myindex = organizationScale_option.indexOf(value)
      if(myindex >-1){
        organizationScale_index_list.push(myindex)
      }
    })
    let organizationScale = organizationScale_index_list.join("|")
    upload_data.organizationScale = organizationScale
    // 企业性质
    let enterpriseQuality_option = that.data.enterpriseQuality_option
    let enterpriseQuality_list = that.data.enterpriseQuality_list
    let enterpriseQuality_index_list = []
    enterpriseQuality_list.forEach(function(value,index){
      let myindex = enterpriseQuality_option.indexOf(value)
      if(myindex > -1){
        enterpriseQuality_index_list.push(myindex)
      }
    })
    let enterpriseQuality = enterpriseQuality_index_list.join("|")
    upload_data.enterpriseQuality = enterpriseQuality
    // 工作地点
    let workPlaceProvinces_str = that.data.workPlaceProvinces_str
    let workPlaceCitys_str = that.data.workPlaceCitys_str
    if (workPlaceProvinces_str && workPlaceCitys_str){
      upload_data.workPlace = workPlaceProvinces_str + "|" + workPlaceCitys_str
    }
    else{
      upload_data.workPlace = ""
    }

    that.setData({
      upload_data
    })
  },
  // 职能领域单选框
  zhineng_picker:function(e){
    console.log("职能领域",e)
    let index = e.detail.value
    let functionField_option = this.data.functionField_option
    let upload_data = this.data.upload_data
    upload_data.functionField = functionField_option[index]
    this.setData({
      upload_data
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 
  yes: function() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url: '../order/order',
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url: '../index/index',
    })
  },
  // 
  firstcheckboxChange: function(e) {
    console.log("单选框切换", e)
    let items = this.data.items
    let index = e.currentTarget.dataset.index

    let first_checked = this.data.first_checked
    let second_checked = this.data.second_checked
    if (index == 1) {
      items[1].hidden = false
      items[0].hidden = true
      items[0].checked = false
      items[1].checked = true
      first_checked = true
      second_checked = false

    } else {
      items[0].hidden = false
      items[1].hidden = true
      items[1].checked = false
      items[0].checked = true
      first_checked = false
      second_checked = true

    }
    this.setData({
      items: items,
      first_checked: first_checked,
      second_checked: second_checked
    })
  },
  // 控制薪资改变
  salary_change: function(e) {
    let hope_salary = this.data.hope_salary
    console.log("期望薪资",e)
    let value = e.detail.value
    let myname = hope_salary[value]
    console.log("薪资", myname)
    let upload_data = this.data.upload_data
    upload_data.expectSalary = myname
    this.setData({
      upload_data
    })
    // this.write_to_upload_data("expectSalary", myname)

  },
  bindChange_select: function(ev) {
    console.log("职业规划", ev)

    const curindex = ev.currentTarget.dataset.current
    const type = ev.currentTarget.dataset.type
    let value = ev.detail.value
    console.log("索引分类", curindex)

    this.data.plan[curindex].index = value
    this.setData({
      plan: this.data.plan
    })
    if (curindex == 0) {
      let myname = this.data.fuzhe_list[value]
      console.log("myname", myname)
      this.write_to_upload_data("industry", myname)
    } else if (curindex == 1) {
      let myname = value
      console.log("myname", myname)
      this.write_to_upload_data("organizationScale", myname)

    } else if (curindex == 2) {
      let myname = this.data.zhineng_list[value]
      console.log("myname", myname)
      this.write_to_upload_data("functionField", myname)
    }



  },
  // 读取原值
  read_from_upload_data: function(key) {
    let value = this.data.upload_data[key]
    console.log("读取的键为：", key, "值为：", value)
    return value
  },
  // 写入
  write_to_upload_data: function(key, value) {
    let that = this
    let new_upload_data = that.data.upload_data
    console.log("写入上传数据", key, value)
    new_upload_data[key] = value
    that.setData({
      upload_data: new_upload_data
    })
    console.log("写入结果", new_upload_data)
  },
  // 获取value的值
  radioChange1: function(e) {
    let pages1 = e.detail.value;
    this.setData({
      seleted: "选中的value：" + pages1
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindtap1: function(e) {
    var newpage = this.data.pageone; /*获取brand数组*/
    var newpage2 = this.data.pagetwo; /*获取brand数组*/
    var new_sales_work = this.data.sales_work;
    let last_checked = this.data.last_checked
    // 处理老数据
    if (last_checked == 0) {
      // 上次点的也是这个
    } else if (last_checked == 1) {
      // 上次是非销售类岗位
      this.write_to_upload_data("expectPost", "")
    } else {
      last_checked = 0
      this.setData({
        last_checked: last_checked
      })
    }
    this.read_from_upload_data("expectPost")

    newpage[0].checked = true;
    new_sales_work[5].hidden = true;
    newpage2[0].checked = !(newpage[0].checked);

    this.setData({
      pageone: newpage,
      pagetwo: newpage2,
      sales_work: new_sales_work
    });
    console.log('newpage', newpage)
  },

  radioChange2: function(e) {
    let pages2 = e.detail.value;
    this.setData({
      seleted: "选中的value：" + pages2
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindtap2: function(e) {
    var newpage = this.data.pageone; /*获取brand数组*/
    var newpage2 = this.data.pagetwo; /*获取brand数组*/
    let last_checked = this.data.last_checked
    // 处理老数据
    if (last_checked == 1) {
      // 上次点的也是这个
    } else if (last_checked == 0) {
      // 上次是非销售类岗位
      let gangwei_checked_value_list = this.data.gangwei_checked_value_list
      gangwei_checked_value_list = []
      this.setData({
        gangwei_checked_value_list: gangwei_checked_value_list
      })
      console.log("清除销售岗位已选中的", gangwei_checked_value_list)
      this.write_to_upload_data("expectPost", "")
    } else {
      last_checked = 1
      this.setData({
        last_checked: last_checked
      })
    }
    this.read_from_upload_data("expectPost")
    newpage2[0].checked = true;
    newpage[0].checked = !(newpage2[0].checked);
    this.setData({
      pageone: newpage,
      pagetwo: newpage2
    });
    console.log('newpage', newpage)
  },
  // 多行文本事件改变
  textareainput: function(e) {

    let that = this
    let type = e.currentTarget.dataset.name
    let value = e.detail.value
    if (type == "notSales") {
      // 非销售岗位处理
      value = "1|" + value
      that.write_to_upload_data("expectPost", value)
    } else if (type == "otherSales") {
      // 销售类岗位——其他
      that.setData({
        other_sales_work_str: value
      })
      that.gangwei_parse_data();
      console.log("销售的其他", that.data.other_sales_work_str)
      that.setData({
        other_sales_work_str: value
      })
    } else if (type == "selfEvaluation") {
      // 自我评价
      that.setData({
        selfEvaluation: value
      })
      that.write_to_upload_data("selfEvaluation", value)
    }
  },
  // 期待的岗位 数据处理
  gangwei_parse_data: function() {
    let that = this
    let gangwei_checked_str_list = []
    let gangwei_checked_value_list = that.data.gangwei_checked_value_list
    let sales_work = that.data.sales_work
    console.log("选择的长度为", gangwei_checked_value_list.length)
    if (gangwei_checked_value_list.length > 0) {
      let str = "0-"
      gangwei_checked_value_list.forEach(function(value, index) {
        // console.log("得到的值",sales_work[value].name)
        let str_value = sales_work[value].name
        if (str_value != "其他") {
          str_value = str_value + "|"
          str += str_value
        }
      })
      let other_sales_work_str = that.data.other_sales_work_str
      str = str + other_sales_work_str
      that.setData({
        gangwei_checked_str_list: gangwei_checked_str_list
      })
      that.write_to_upload_data("expectPost", str)
      console.log("组合后的值为", str)
    } else {
      that.write_to_upload_data("expectPost", "")
    }
  },
  // 企业性质多选框事件
  qiye_check_func: function(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let qiye_check_list = this.data.qiye_check_list
    qiye_check_list[index] = !qiye_check_list[index]
    this.setData({
      qiye_check_list: qiye_check_list
    })
    this.bianli_qiye_checked()

  },
  bianli_qiye_checked: function() {
    let qiye_check_list = this.data.qiye_check_list
    let qiye_str = ""
    qiye_check_list.forEach(function(value, index) {
      if (value) {
        let str = index + "|"
        qiye_str += str
      }
    })
    console.log("组合好的企业字符串为", qiye_str)
    let upload_data = this.data.upload_data
    upload_data.enterpriseQuality = qiye_str
    this.setData({
      upload_data: upload_data
    })
  },
  // 复选框事件处理
  onChangeShowState: function(event) {
    console.log("复选框555555", event)
    let that = this;
    let index = event.currentTarget.dataset.index;
    let type = event.currentTarget.dataset.name;
    let sales_work = that.data.sales_work
    sales_work[index].checked = !sales_work[index].checked
    let gangwei_checked_value_list = []
    sales_work.forEach(function(value, index) {
      if (value.checked) {
        gangwei_checked_value_list.push(index)
      }
    })

    that.setData({
      sales_work: sales_work,
      gangwei_checked_value_list: gangwei_checked_value_list
    })

    // let gangwei_checked_value_list = that.data.gangwei_checked_value_list
    //   // 判断选中的是否在 已选择列表中
    //   let position = gangwei_checked_value_list.indexOf(index)
    //   if (position > -1) {
    //     // 如果在已选择列表中 要移除
    //     if (index == 5) {
    //       console.log("索引为5的其他", that.data.sales_work[5].hidden)
    //       that.data.sales_work[5].hidden = !that.data.sales_work[5].hidden
    //       gangwei_checked_value_list.splice(position, 1);
    //       console.log("已经勾选的列表", gangwei_checked_value_list)

    //       that.setData({
    //         sales_work: that.data.sales_work,
    //         other_sales_work_str:"",
    //         gangwei_checked_value_list: gangwei_checked_value_list
    //       })
    //     }else{
    //       gangwei_checked_value_list.splice(position, 1);
    //       // 
    //       console.log("移除后的结果", gangwei_checked_value_list)
    //       that.setData({ gangwei_checked_value_list: gangwei_checked_value_list })
    //     }

    //   } else if (position == -1) {
    //     // 不在 要添加
    //     gangwei_checked_value_list.push(index)
    //     let sales_work = that.data.sales_work
    //     sales_work[index].hidden = !that.data.sales_work[index].hidden


    //     console.log("添加后的结果", gangwei_checked_value_list)
    //     that.setData({
    //       gangwei_checked_value_list: gangwei_checked_value_list,
    //       sales_work: sales_work
    //     })
    //   }
    that.gangwei_parse_data();

  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  // 定时器 根据定时器 开关判断定时器是否应该清除
  timer_sender: function(value, stop) {
    var that = this;
    var times = 0
    var i = setInterval(function() {
        times++
        // 如果定时器的状态开启 ，每隔30秒执行一次上传
        if (times >= 30 && that.data.timer_switch) {
          console.log("定时器上传数据")
          // 将上传分离出来 。
          // clearInterval(i)
          // that.time_upload()
          times = 0
        }
        // 如果定时器的状态关闭：清除定时器
        else if (that.data.timer_switch == false) {
          clearInterval(i)
        } else {
          console.log("定时器休眠")
        }
      },
      1000)
  },
  // 关闭定时器开关
  switch_false: function() {
    this.setData({
      timer_switch: false
    })
  },
  get_baseId: function() {
    // var baseId = 6
    let userIdEnc = wx.getStorageSync('userIdEnc')
    console.log("缓存中的baseID", userIdEnc)
    // this.data.net_upload.baseId = userIdEnc
    let upload_data = this.data.upload_data
    upload_data.baseId = userIdEnc
    this.setData({
      baseId: userIdEnc,
      upload_data: upload_data
    })
    // 
    this.panduan_cunzai()

  },
  panduan_cunzai: function() {

    // 取 status 缓存，判断本页面是否填写 已填写，则查询填写数据并显示
    let status = wx.getStorageSync('status')
    let baseId = this.data.baseId

    if (status.jobInformation) {
      this.recover_data()
      // this.get_id(baseId)
      // this.searchContent(userIdEnc)
    }
    this.setData(({
      status
    }))
  },
  // 传入baseId 来 查询 id
  // 如果 id存在，说明用户以前填写过此部分表格，使用更新字段
  // 如果返回为空，说明用户以前没填写过此部分表格，
  // 第一次提交使用 post ，在第一次结束以后还要立刻获取一次id,
  // 然后post以后的提交使用更新字段 。
  // 记录的数据不通过return 格式返回 。直接setData
  get_id: function(baseId) {
    // var baseID = 123
    var that = this
    let url = "/job/info/baseId/" + baseId
    api.get(url).then((res) => {
      // console.log("数据库数据为为", res.data != null)
      if (res.data != null) {
        console.log("用户已填写过，使用更新接口")
        let user_id = res.data.id
        var base_data = {}
        base_data['baseId'] = baseId
        base_data['id'] = user_id
        that.write_to_upload_data("baseId", baseId)
        that.write_to_upload_data("id", user_id)
        that.setData({
          // user_id: user_id,
          base_data: base_data
        })
        console.log("用户的基础数据为", that.data.base_data)

      } else {
        console.log("未填写过")
      }
    })
  },

  shangchuan_data: function(data, type, e) {
    var that = this;
    let url = "/job/info"
    console.log("要传输的数据是", data)
    if (type == "put") {
      api.put(url, data).then((res) => {
        // put方式请求成功
        // 异步执行顺序有问题
        if (res.data == true) {

          wx.hideLoading()
          this.checkoutOpenid(e)
          return "true";
        } else {
          //put方式 网络请求失败
          return "false";
        }
      }).catch((res) => {
        console.log("catch的请求", res)
      })
    } else {
      api.post(url, data).then((res) => {
        console.log("post请求的返回数据：", res)
        //post 请求成功
        if (res.data == true) {
          // post 成功
          // upload.success()
          console.log("进行下一步")
          wx.hideLoading()
          console.log("预约出现")

          this.checkoutOpenid(e)

          return "true";
        } else {
          //post 网络请求失败
          return "false";
        }
      })
    }

  },
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
  // 查询元素位置
  find_position:function(e){
    const query = wx.createSelectorQuery()
    query.select(e).boundingClientRect()
    query.selectViewport().scrollOffset()
    let pos = null
    query.exec(function (res) {
      console.log("元素位置",res)
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      let miss = res[1].scrollTop + res[0].top - 100;
      wx.pageScrollTo({
        // selector:'#expectPost',
        scrollTop: miss,
        duration: 300
      })
    })

  },
  // 滚动到必选项
  scroll:function(name){
    console.log("滚动到",name)
    this.find_position(name)

  },
  // 未通过项目提示
  wrong_msg: function(msg) {
    let that = this
    let more_msg_list = msg.split("|")
    // 职能领域非必选
    let functionField_index = more_msg_list.indexOf("functionField")
    if (functionField_index>-1){
      more_msg_list.splice(functionField_index,1)
    }
    // 自我评价非必选
    let selfEvaluation_index = more_msg_list.indexOf("selfEvaluation")
    if (selfEvaluation_index > -1) {
      more_msg_list.splice(selfEvaluation_index, 1)
    }
    // 更改 提示的第一个
    let bixuan_list = ['expectPost', 'industry', 'organizationScale', 'enterpriseQuality', 'expectSalary','workPlace']
    let msg_list = []
    let bixuan_msg = []
    bixuan_list.forEach(function(value,index){
      let my_index = more_msg_list.indexOf(value)
      if(my_index > -1){
        bixuan_msg.push(value)
      }
    })
    msg_list.push(bixuan_msg[0])
    msg_list.forEach(function(value, index) {
      console.log("val", value)
      switch (value) {
        case "expectPost":
          that.show_error("请选择期望岗位")
          that.setData({ redname:'expectPost'})
          that.scroll('#expectPost')
          break;
        case "industry":
          that.show_error("请选择行业")
          that.setData({ redname: 'industry' })
          that.scroll('#industry')
          break;
        case "organizationScale":
          that.show_error("请选择公司规模")
          that.setData({ redname: 'organizationScale' })
          that.scroll('#organizationScale')
          break;
        case "enterpriseQuality":
          that.show_error("请选择企业性质")
          that.setData({ redname: 'enterpriseQuality' })
          that.scroll('#enterpriseQuality')
          break;
        case "functionField":
          that.show_error("请选择职能领域")
          break;
        case "expectSalary":
          that.show_error("请选择期望薪资")
          that.setData({ redname: 'expectSalary' })
          that.scroll('#expectSalary')
          break;
        case "workPlace":
          that.show_error("请填写工作地点")
          that.setData({ redname: 'workPlace' })
          that.scroll('#workPlace')
          break;
        case "selfEvaluation":
          that.show_error("请填写自我评价")
          break;
        
      }
    })
  },
  // 表单验证
  form_v: function() {
    let that = this
    let upload_data = that.data.upload_data
    let result = form_verify.form_verify(upload_data)
    let old_result = result.split("|")
    let pass_list = ['functionField','selfEvaluation']
    console.log("old_result", old_result)
    pass_list.forEach(function(value,index){
      if(value){
        let my_index = old_result.indexOf(value)
        if(my_index >-1){
          console.log("my——index",my_index)
          console.log("删除",value)
          old_result.splice(my_index, 1)
        }
      }
    })
    console.log("old_result", old_result)
    result = old_result.join("|")
    if (result) {
      console.log("表单验证", result)
      that.wrong_msg(result)
    } else {
      console.log("表单验证直接通过")
      that.setData({ redname:''})
      return true
    }
  },
  // 预约提示
  yuyue: function(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  net_upload: function(e) {
    var that = this
    that.update_upload_data()
    let upload_data = that.data.upload_data
    console.log("要上传的数据", upload_data)
    let result = that.form_v()
    if (result) {
      let status = wx.getStorageSync('status')
      console.log("状态：", status.jobInformation)
      if (status.jobInformation) {
        that.shangchuan_data(upload_data, "put", e)
        that.switch_false()
        upload.load()
        that.setData({
          status: "ok"
        })
      } else {
        that.shangchuan_data(upload_data, "post", e)
        that.switch_false()
        upload.load()
        that.setData({
          status: "ok"
        })
      }
      // wx.showToast({
      //   title: "提交成功！",
      //   duration: 2000
      // });
      // wx.navigateTo({
      //   url: '../sixthPart/sixthPart',
      // })
    }
  },
  get_answer: function(quetion) {
    let url = "/dictionary/first?question=" + quetion
    // return new Promise(function (resolve, reject){
    //   wx.request({
    //     url: url,
    //     header: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     success(res){

    //     }
    //   })
    // })
    api.get(url).then((res) => {
      let answer = res.data
      this.belong_question(quetion, answer)
    })
  },
  recover_data: function() {
    let baseId = this.data.baseId
    let url = "/job/info/baseId/" + baseId
    api.get(url).then((res) => {
      console.log("用户已经填写的数据", res.data)
      if (res.data != null && res.data) {
        this.setData({
          old_data: res.data,
          upload_data: res.data
        })
        this.split_data()
      }
    })
  },
  find: function(arr, dst) {
    // console.log("arr",arr)
    console.log("arr是什么", arr)
    console.log("dst", dst)
    if (typeof(arr) != "undefined") {
      var i = arr.length;
      while (i -= 1) {
        if (arr[i] == dst) {
          console.log("iiiiiiiiiii", i)
          return i;
        }
      }
      return false;
    }
  },
  isnull: function(name) {
    if (name) {
      return name
    } else {
      return null
    }
  },
  split_data: function(name) {
    console.log("开始分割数据")
    let old_data = this.data.old_data
    let plan = this.data.plan
    let salary = this.data.salary
    let that = this

    let old_industry = old_data.industry
    old_industry = this.isnull(old_industry)
    if (old_industry) {
      console.log("行业选择")
      let industry_list = old_industry.split("|")
      console.log("行业选择选择的结果", industry_list)
      this.setData({ industry_list})
    }

    let functionField = old_data.functionField
    functionField = this.isnull(functionField)
    if (functionField) {
      console.log("职能领域选择")
      let functionField_str = functionField
      this.setData({ functionField})
      // let zhineng_list = this.data.zhineng_list
      // // console.log("zhineng_list", zhineng_list)
      // if (typeof(zhineng_list) != "undefined") {
      //   let functionField_index = zhineng_list.indexOf(functionField)

      //   plan[2].index = functionField_index
      //   console.log("行业选择选择的结果", plan)
      // }


    }
    // 公司规模
    let organizationScale_index_str = old_data.organizationScale
    let organizationScale_option = that.data.organizationScale_option
    let organizationScale_index_list = organizationScale_index_str.split("|")
    let organizationScale_list = []
    if (organizationScale_index_list){
      organizationScale_index_list.forEach(function(value,index){
        organizationScale_list.push(organizationScale_option[value])
      })
    }
    that.setData({ organizationScale_list})
    // 企业性质
    let chosed_str = old_data.enterpriseQuality
    if (chosed_str != null || typeof(chosed_str) != "undefined") {
      let chose_str_list = chosed_str.split("|")
      let enterpriseQuality_option = that.data.enterpriseQuality_option
      let enterpriseQuality_list = []
      chose_str_list.forEach(function(value,index){
        if(value){
          enterpriseQuality_list.push(enterpriseQuality_option[value])
        }
      })
      this.setData({
        enterpriseQuality_list
      })
    }
    // 工作地点
    let workplace_str = old_data.workPlace
    if(workplace_str){
      let work_place_list = workplace_str.split("|")
      that.setData({
        workPlaceProvinces_str: work_place_list[0],
        workPlaceCitys_str:work_place_list[1]
      })
    }
    // } 
    // 薪资
    let old_salary = old_data.expectSalary
    if (this.isnull(old_salary)) {
      let salary_list = salary[0].option

      let salary_index = this.find(salary_list, old_salary)
      salary[0].index = salary_index
    }
    // 自我评价
    this.setData({
      plan: plan,
      salary: salary,
      selfEvaluation: old_data.selfEvaluation
    })
    this.split_expectPost(old_data.expectPost)
  },
  // 销售岗位 
  split_expectPost: function(expectPost) {
    if (expectPost) {
      let first_num = expectPost[0]
      let that = this
      let items = that.data.items
      let first_checked = that.data.first_checked
      console.log("expectPost", expectPost)
      if (first_num == 0) {
        // 将销售类岗位打钩
        console.log("销售打钩")
        items[0].checked = true
        first_checked = false
        // 属于销售类岗位
        let expec_list = expectPost.split("|")
        let first_name = (expec_list[0].split("-"))[1]
        expec_list.push(first_name)
        expec_list.shift()
        let len = expec_list.length
        console.log("expec_list", expec_list)
        var sale_work_index_list = []
        var sales_work = that.data.sales_work
        expec_list.forEach(function(value, index) {
          let sales_work_list = that.data.sales_work_list
          // console.log("sales_work_list", sales_work_list)
          // console.log("value",value)
          let sales_work_index = sales_work_list.indexOf(value)
          // console.log("sales_work_index", sales_work_index)
          if (sales_work_index > -1) {
            sales_work[sales_work_index].checked = true
            sale_work_index_list.push(sales_work_index)
          } else {
            console.log("销售中的其他", value)
            // 销售岗位中的其他
            sales_work[5].checked = true
            sale_work_index_list.push(5)
            sales_work[5].hidden = false
            sales_work[5].value = value
            console.log("给其他赋值")
            that.setData({
              first_values: value
            })
          }
        })
        console.log("销售岗位的索引有", sale_work_index_list)
        console.log("销售岗位初始状态", sales_work)
        that.setData({
          sales_work: sales_work,
          first_checked: first_checked,
          items: items,
          gangwei_checked_value_list: sale_work_index_list
        })

      } else {
        // 属于非销售类岗位
        let value = (expectPost.split("|"))[1]
        let items = that.data.items
        let second_checked = that.data.second_checked
        items[1].checked = true
        second_checked = false
        that.setData({
          items: items,
          second_checked: second_checked,
          second_values: value
        })

      }
    }
    console.log("first_values", this.data.first_values)

  },
  belong_question: function(quetion, answer) {
    let plan = this.data.plan
    if (quetion == "负责行业") {
      this.setData({
        industry_option: answer
      })
    } else if (quetion == "组织规模(单位百万美金)") {
      this.setData({
        organizationScale_option: answer
      })
    } else if (quetion == "企业性质") {
      // this.data.qiye.option = answer
      // console.log("企业性质长度", answer.length)
      // let new_qiye_check_list = this.data.qiye_check_list
      // for (let i = 0; i < answer.length; i++) {
      //   new_qiye_check_list.push(false)
      // }
      // console.log("企业选择框", new_qiye_check_list)

      this.setData({
        enterpriseQuality_option: answer,
        // qiye_check_list: new_qiye_check_list
      })
      // this.bianli_qiye_checked()
      // bianli_qiye_checked

    } else if (quetion == "职能列表") {
      // plan[2].option = answer
      this.setData({
        functionField_option: answer
      })
    }
    console.log("开始分发数据")
    this.recover_data()
  },
  /**
   * 判断提交时是否全部完成
   */
  checkoutOpenid(e) {
    let _this = this
    let url = '/bind/wechatId?wechatId=' + this.data.wechatId
    api.get(url).then((res) => {
      let arr = Object.keys(res.data);
      console.log('res.data', res.data)
      if (arr.length == 0) {
        //未绑定
      } else {
        let status = res.data.status
        if (status.base && status.customerResources && status.workHistory && status.professionalSkills && status.characterPower && status.jobInformation) {
          this.yuyue(e)
        } else {
          wx.showToast({
            title: '全部填写完成才可预约',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let wechatId = wx.getStorageSync('wechatid')
    if (wechatId) {
      this.setData({
        wechatId: wechatId
      })
    }
    this.get_baseId();
    this.get_province()
    // 问题列表的获取
    this.get_answer("负责行业")
    this.get_answer("组织规模(单位百万美金)")
    this.get_answer("企业性质")
    this.get_answer("职能列表")
  },
  get_province:function(){
    let url = '/v1/school/provinces'
    let that = this
    api.get(url).then((res) => {
      console.log("省份",res.data)
      that.setData({ workPlaceProvinces:res.data})
    })
  },
  get_city:function(uid){
    let that = this
    let url = '/v1/school/cities?pid=' + uid
    api.get(url).then((res) => {
      // console.log("城市列表",res.data)
      that.setData({ workPlaceCitys:res.data})
    })
  },
  // 城市选择
  workPlaceProvincesChange:function(e){
    console.log("省改变",e)
    let that = this
    let province_index = e.detail.value
    let workPlaceProvinces = that.data.workPlaceProvinces
    let uid = workPlaceProvinces[province_index].uid
    let province_name = workPlaceProvinces[province_index].name
    that.setData({
      workPlaceProvinces_str: province_name,
      workPlaceCitys:[],
      workPlaceCitys_str:''
    })
    that.get_city(uid)
    if (province_name == '北京市'){
      that.setData({
        workPlaceCitys_str: '北京城区'
      })
    }
    else if (province_name == '天津市'){
      that.setData({
        workPlaceCitys_str: '天津城区'
      })
    }
    else if (province_name == '上海市') {
      that.setData({
        workPlaceCitys_str: '上海城区'
      })
    }
    else if (province_name == '重庆市') {
      that.setData({
        workPlaceCitys_str: '重庆城区'
      })
    }

    // console.log("uid",uid)
  },
  workPlaceCityChange:function(e){
    console.log("城市改变",e)
    let that = this
    let city_index = e.detail.value
    let workPlaceCitys = that.data.workPlaceCitys
    let city_name = workPlaceCitys[city_index].name
    that.setData({
      workPlaceCitys_str:city_name
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log("页面显示")
    // // 初始化 定时器
    this.setData({
      timer_switch: false
    })
    // var timer_switch = this.data.timer_switch
    // console.log(timer_switch)
    // if (timer_switch) {
    //   this.timer_sender();
    // }
    // // 数据渲染完成后，先获取本地baseid ，然后请求网络，获取 userid
    // var baseId = this.data.baseId
    // if (baseId) {
    //   console.log("baseId存在，页面显示不需要重新获取")
    // } else {
    // }
    // var baseId = this.data.baseId
    // this.get_id(baseId)
    // console.log("用户id为",user_id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("页面隐藏")
    this.switch_false()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})