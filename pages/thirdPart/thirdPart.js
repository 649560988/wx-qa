// pages/thirdPart/thirdPart.js
import api from '../../utils/http.js'
import wxValidate from '../../utils/wxValidate.js'
import upload from '../../utils/upload.js'

Page({

      /**
       * 页面的初始数据
       */
      data: {
        showErroe: '',
        errorMessage: '',
        region: [],
        timer_switch:true,
        konwledges: [{
            'id': 0,
            name: 'basicCompetence',
            value: '产品/解决方案知识',
            checked:false,
            radio_value:null,
            "hidden": true
          },
          {
            'id': 1,
            name: 'profession',
            checked: false,
            radio_value: null,
            value: '行业知识',
            "hidden": true
          },
          {
            'id': 2,
            name: 'sell',
            value: '销售渠道',
            radio_value: null,
            checked: false,
            "hidden": true
          },
          {
            'id': 3,
            name: 'flow',
            value: '销售业务流程',
            radio_value: null,
            checked: false,
            "hidden": true
          },
          {
            'id': 4,
            name: 'business',
            radio_value: null,
            value: '商务礼仪',
            checked: false,
            "hidden": true
          },
          {
            'id': 5,
            name: 'accomplishment',
            value: '职业素养',
            radio_value: null,
            checked: false,
            "hidden": true
          },
          {
            'id': 6,
            name: 'theory',
            value: '销售理论',
            radio_value: null,
            checked: false,
            "hidden": true
          },
          {
            'id': 7,
            name: 'knowOthers',
            value: '其他知识类型，请注明',
            radio_value: null,
            checked: false,
            "hidden": true
          },

        ],
        skill: [{
            'id': 0,
            name: 'communication',
          radio_value: null,
            value: '沟通技能',
          checked: false,
            "hidden": true
          },
          {
            'id': 1,
            name: 'influence',
            radio_value: null,
            value: '影响技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 2,
            name: 'manage',
            radio_value: null,
            value: '管理技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 3,
            name: 'negotiate',
            radio_value: null,
            value: '谈判技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 4,
            name: 'timeManage',
            radio_value: null,
            value: '时间管理',
            checked: false,
            "hidden": true
          },
          {
            'id': 5,
            name: 'teleSale',
            radio_value: null,
            value: '电话销售技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 6,
            name: 'netSale',
            radio_value: null,
            value: '网络销售技能',
            checked: false,
            "hidden": true
          },

          {
            'id': 7,
            name: 'meetingSale',
            radio_value: null,
            value: '会议销售技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 8,
            name: 'exhibitionSale',
            radio_value: null,
            value: '展会销售技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 9,
            radio_value: null,
            name: 'developCustom',
            value: '开发客户技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 10,
            name: 'handleDissent',
            radio_value: null,
            value: '处理异议技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 11,
            radio_value: null,
            name: 'dealMaking',
            value: '促成交易技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 12,
            name: 'customerMaintenance',
            radio_value: null,
            value: '客户维护技能',
            checked: false,
            "hidden": true
          },
          {
            'id': 13,
            name: 'salePlan',
            radio_value: null,
            value: '销售计划管理',
            checked: false,
            "hidden": true
          },

          {
            'id': 14,
            name: 'saleContract',
            radio_value: null,
            value: '销售合同管理',
            checked: false,
            "hidden": true
          },
          {
            'id': 15,
            name: 'salesReturn',
            radio_value: null,
            value: '销售回款管理',
            checked: false,
            "hidden": true
          },
          {
            'id': 16,
            name: 'crm',
            radio_value: null,
            value: '客户关系管理',
            checked: false,
            "hidden": true
          },
          {
            'id': 17,
            name: 'salesPerformance',
            radio_value: null,
            value: '销售业绩管理',
            checked: false,
            "hidden": true
          },
          {
            'id': 18,
            name: 'skillOthers',
            radio_value: null,
            value: '其他专业技能，请注明',
            checked: false,
            "hidden": true
          },

        ],
        level: [{
            name: '1',
            value: '初级'
          },
          {
            name: '2',
            value: '中级'
          },
          {
            name: '3',
            value: '高级'
          },
          {
            name: '4',
            value: '资深'
          },
          {
            name: '5',
            value: '专家'
          },
        ],
        // 提示框
        reminder: [{
            name: "初级",
            value: "在专业上具备入门级别的基础知识，能够辅助高级别同事进行工作，并进行常规工作的执行，对专业问题的影响有限"
          },
          {
            name: "中级",
            value: "在专业上具备广泛的知识，能够分析或辨识专业问题，对专业问题的成败有间接影响"
          },
          {
            name: "高级",
            value: "在专业上具备较为扎实的知识，能够处理异常问题或项目协调统筹，与专业问题的成败有直接影响"
          },
          {
            name: "资深",
            value: "在专业上具备全面的知识，和项目主导能力，能够对问题进行改善或控制，对关键专业问题的成败具有显著影响"
          },
          {
            name: "专家",
            value: "在专业上具备精深的知识，和项目引领能力，能够通过定义概念或模型来解决问题，在行业内具有一定的权威性"
          },
        ],
        index: 0,
        show_radio: [],
        knowledge_textarea: "",
        skill_textarea: "",

        // 有问题的数据，用户取消后无法删除 ：字段说明，后面有数字的才是用户真正选中的
        // 产品/解决方案知识: "5"
        // 促成交易技能: "5"
        // 网络销售技能: ""
        // 销售合同管理: ""
        // 销售渠道: ""
        post_data: {},
        net_upload_data:{},
        tishi_1: "请填写您所掌握的其他知识类型",
        tishi_2:"请填写您所掌握的其他专业技能",
      },
      // 控制提示框
      showModal(e) {
        let net_upload_data = this.data.net_upload_data
        let knowOthers = net_upload_data['knowOthers']
        let skillOthers = net_upload_data['skillOthers']
        if(knowOthers){

        }else{
          this.setData({
            knowledge_textarea: "请填写您所掌握的其他知识类型",
          })
        }
        if (skillOthers){

        }else{
          this.setData({
            skill_textarea: "请填写您所掌握的其他专业技能",
          })
        }
        this.setData({
          modalName: e.currentTarget.dataset.target,
        })
        //console.log("隐藏提示", this.data.tishi_1)
        //console.log("隐藏提示",this.data.tishi_2)

      },
      hideModal(e) {
        let net_upload_data = this.data.net_upload_data
        let knowOthers = net_upload_data['knowOthers']
        let skillOthers = net_upload_data['skillOthers']
        if (knowOthers != "请填写您所掌握的其他知识类型") {
          this.setData({
            knowledge_textarea: knowOthers
          })
        } else {
          this.setData({
            knowledge_textarea: null,
          })
        }
        if (skillOthers != "请填写您所掌握的其他专业技能") {
          this.setData({
            skill_textarea: skillOthers
          })
        } else {
          this.setData({
            skill_textarea: null,
          })
        }
        this.setData({
          modalName: null,
        })
        //console.log("显示提示", this.data.tishi_1)
        //console.log("显示提示", this.data.tishi_2)
      },
      // 控制显示和隐藏
      onChangeShowState: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        //console.log("当前点击的是：", index)
        //console.log("当前点击的类型是：", type)
        // 根据类型判断是哪个列表
        if (type === 'konwledges') {
          // 隐藏和显示内容
          that.data.konwledges[index].checked = !that.data.konwledges[index].checked;
          that.setData({
            konwledges: that.data.konwledges
          })
          // 每次改变都进行数据更新
          // this.dataChange()

        } else {
          // 隐藏和显示内容
          that.data.skill[index].checked = !that.data.skill[index].checked;
          that.setData({
            skill: that.data.skill
          })
          // this.dataChange()
        }
          that.data_change()
      },
      // 多选框 改变事件
      // checkboxChange: function(e) {
      //   // obj 是一个数组
      //   //console.log("====================================")
      //   var obj_list = e.detail.value
      //   //console.log(obj_list)
      //   var show_radio = this.data.show_radio
      //   //console.log("初始值为：", show_radio)
      //   var empty = []
      //   show_radio = empty
      //   //console.log("清空数组后的结果：", show_radio)
      //   var len = obj_list.length
      //   if (len > 0) {
      //     //console.log("已选项存在：", obj_list)
      //     for (var i = 0; i < len; i++) {

      //       var name = obj_list[i]
      //       show_radio.push(name)
      //       this.data.show_radio = show_radio
      //       // //console.log('checkbox发生change事件，携带value值为：', value)
      //       //console.log('show_radio值为：', show_radio)
      //       //console.log('checkbox发生change事件，携带name值为：', name)
      //       // update.push(value)
      //     }
      //   } else {
      //     show_radio.push('')
      //     this.data.show_radio = show_radio

      //   }
      //   //console.log("最后的选中的结果：", this.data.show_radio)

      // },
      // 单选框改变事件
      radioChange(e) {
        const checkid = e.currentTarget.dataset.checkid;
        const type = e.currentTarget.dataset.type;
        // 对传入的类型进行判断
        if (type === "konwledge") {
          var new_konwledges = this.data.konwledges;
          //console.log('radio发生change事件，携带value值为：', e.detail.value)
          //console.log("当前复选框的id是", checkid)
          // 新添加字段level 对应单选框的等级
          new_konwledges[checkid].radio_value = e.detail.value
          this.setData({
            konwledges: new_konwledges
          })
          //console.log("改变的知识类型是，",new_konwledges)
          // this.dataChange()
        } else {
          var new_skill = this.data.skill;

          //console.log('radio发生change事件，携带value值为：', e.detail.value)
          //console.log("当前复选框的id是", checkid)
          // 新添加字段level 对应单选框的等级
          new_skill[checkid].radio_value = e.detail.value
          this.setData({
            skill: new_skill
          })
          //console.log("改变的技能类型是，", new_skill)
        }
        this.data_change()
      },
      // 下拉框事件
      bindPickerChange(e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index: e.detail.value
        })
      },
      // 多行文本框事件处理
      textareaAInput: function(e) {
        var value = e.detail.value
        var data = this.data.net_upload_data
        const type = e.currentTarget.dataset.type;
        if (type == 'konwledge') {

          data["knowOthers"]=value
          this.setData({
            knowledge_textarea:value,
            net_upload_data: data
          })
          //console.log("konwledges", data)

        } else {
          // //console.log("skill_Others", value)
          data["skillOthers"] = value
          this.setData({
            skill_textarea:value,
            net_upload_data: data
          })
          //console.log("skill_Others", data)

        }
      },
      // 关闭定时器开关
      switch_false:function(){
        this.setData({
          timer_switch:false
        })
      },

      // 轮询要上传的数据 ，和传来的参数做对比，
      // 如果一样，保持不变，如果不一样，删除要上传数据中的这一项 不能删除，只能变空
      compare: function(index) {
        // 目的就是删除 post_data中的 index数据
        var new_post_data = this.data.post_data
        var result = new_post_data.hasOwnProperty(index)
        if (result) {
          //console.log("删除待提交数据中的", index)
          delete new_post_data.index
          new_post_data[index] = ''
          //console.log("删除后的结果：", new_post_data)
        }
        this.setData({
          post_data: new_post_data
        })

      },
      // 数据整理
      uploadData: function(data) {
        //console.log("上传的数据", data)
        var updata = data
        // 真正包裹数据的
        var real_data = this.data.net_upload_data
        //console.log("real_data=",real_data)

        // var knowledge_str = ""
        // var skill_str = ""

        // var that = this
        // // 遍历 两个题目的值判断 选中的键属于哪个类型
        // var konwledges = that.data.konwledges
        // var konwledges_list = []
        // konwledges.forEach(function(val, index) {
        //   // //console.log(val)
        //   konwledges_list.push(val.name)
        // })
        // var skill = that.data.skill
        // var skill_list = []
        // skill.forEach(function(val, index) {
        //   // //console.log(val)
        //   skill_list.push(val.name)
        // })
        // if (JSON.stringify(data) != "{}") {
        //   Object.keys(updata).forEach(function(key) {
        //     // 键为key
        //     // //console.log(key)
        //     // //console.log(updata[key])
        //     var update_value = updata[key]
        //     if (updata[key]) {
        //       real_data[key] = update_value
        //       if (konwledges_list.indexOf(key) > -1) {
        //         key = key + "|"
        //         knowledge_str += key
        //       } else {
        //         key = key + "|"
        //         skill_str += key
        //       }

        //       // //console.log(update_value)

        //     }
        //     real_data['knowledge'] = knowledge_str
        //     real_data['skill'] = skill_str
        //   })
        // }
        // 最后执行数据上传 真正的数据为real_data
        // that.net_upload(real_data)
        // 数据整理完毕
        // that.setData({
        //   net_upload_data:real_data
        // })
        // //console.log("最后上传的数据为：",that.data.net_upload_data)
      },

      // 定时器 根据定时器 开关判断定时器是否应该清除
      timer_sender: function(value,stop) {
        var that = this;
        var times = 0
        var i = setInterval(function() {
            times++
            // 如果定时器的状态开启 ，每隔30秒执行一次上传
          if (times >= 30 && that.data.timer_switch) {
              //console.log("定时器上传数据")
              // 将上传分离出来 。
              // that.net_upload("time")
              // clearInterval(i)
              that.time_upload()
              times = 0
          } 
          // 如果定时器的状态关闭：清除定时器
          else if (that.data.timer_switch == false){
              clearInterval(i)
          }
            else {
              //console.log("定时器休眠")
            }
        },      
      1000)
        
  },
  // 传入baseId 来 查询 id
  // 如果 id存在，说明用户以前填写过此部分表格，使用更新字段
  // 如果返回为空，说明用户以前没填写过此部分表格，
  // 第一次提交使用 post ，在第一次结束以后还要立刻获取一次id,
  // 然后post以后的提交使用更新字段 。
  // 记录的数据不通过return 格式返回 。直接setData
  get_id: function (baseId){
    // var baseID = 123
    var that = this
    let url = "/skills/baseId/"+baseId
    api.get(url).then((res) => {
      // //console.log("数据库数据为为", res.data != null)
      if(res.data != null){
        //console.log("用户已填写过，使用更新接口")
        let user_id = res.data.id
        var base_data = {}
        base_data['baseId'] = baseId
        base_data['id'] = user_id
        that.setData({
          // user_id: user_id,
          base_data: base_data
        })
        //console.log("用户的基础数据为", that.data.base_data)

      }else{
        //console.log("用户没有填写过")
      }

    })
  },

  shangchuan_data:function(data,type){
    var that = this;
    let url = "/skills"
    //console.log("要传输的数据是",data)
    if(type == "put"){
      api.put(url, data).then((res) => {
        //console.log("请求的返回数据：", res)
        // put方式请求成功
        //console.log("then的请求", res)

        // 异步执行顺序有问题
        if (res.data == true) {
          //console.log("put 传送成功")
          upload.success()
          return "true";
        } else {
          //put方式 网络请求失败
          return "false";
        }
        
      }).catch((res) => {})
    }else{
      api.post(url, data).then((res) => {
        //console.log("请求的返回数据：", res)
        //post 请求成功
        if (res.data == true) {
          // post 成功
          upload.success()
          return "true";
        } else {
          //post 网络请求失败
          return "false";
        }
      })
    }

  },
  // 时间自动上传的 没有页面跳转ddd
  // time_upload:function(){
  //   var that = this
  //   var value = that.data.net_upload_data
  //   if (JSON.stringify(value) == "{}"){
  //     //console.log("要传的数据为空")
  //     return 
  //   }
  //   var baseId = that.data.base_data.baseId
  //   // value['baseId'] = baseId
  //   var id = that.data.base_data.id
  //   value['id'] = id

  //   that.上传数据(value, "put")
  //   // //console.log("时间自动传输的结果",result)
  //   // if (result == "true") {
  //   //   //console.log("定时上传的传输成功了")
  //   //   //console.log(that.data.timer_switch)
  //   // } else {
  //   //   //console.log("定时上传的传输失败了，请检查接口")
  //   // }
  // },
  show_error: function (msg) {
    wx.showModal({
      title: '温馨提示',
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 表单验证
  form_verify:function(){
    var that = this
    var net_upload_data = that.data.net_upload_data
    let knowledge = net_upload_data.knowledge
    let knowOthers = net_upload_data.knowOthers
    let skill = net_upload_data.skill
    let skillOthers = net_upload_data.skillOthers
    //console.log("knowledge", knowledge)
    //console.log("knowOthers", knowOthers)
    //console.log("skill", skill)
    //console.log("skillOthers", skillOthers)
    if((knowledge != "" && knowledge != null) || (knowOthers != "" && knowOthers != null)){
      //console.log("知识类型验证通过")
    }else{
      that.show_error("请检查知识类型")
      that.setData({
        redname:'knowledge'
      })
      that.scroll('#knowledge')
      return false
    }
    if((skill != "" && skill != null) || (skillOthers != "" && skillOthers != null)){
      //console.log("专业技能验证通过")
    }else{
      that.show_error("请检查专业技能")
      that.setData({
        redname: 'skill'
      })
      that.scroll('#skill')
      return false
    }
    return true

  },
  // 查询元素位置
  find_position: function (e) {
    const query = wx.createSelectorQuery()
    query.select(e).boundingClientRect()
    query.selectViewport().scrollOffset()
    let pos = null
    query.exec(function (res) {
      //console.log("元素位置", res)
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      wx.pageScrollTo({
        // selector:'#expectPost',
        scrollTop: res[0].top,
        duration: 300
      })
    })

  },
  // 滚动到必选项
  scroll: function (name) {
    //console.log("滚动到", name)
    this.find_position(name)
  },
  panduan_cunzai: function () {

    // 取 status 缓存，判断本页面是否填写 已填写，则查询填写数据并显示
    let status = wx.getStorageSync('status')
    //console.log("当前页面填写的状态", status.professionalSkills)
    if (status.professionalSkills) {
      // this.get_user_data();
      this.get_old_data();
      // this.searchContent(userIdEnc)
    }
    this.setData(({
      status
    }))
  },
  // 数据上传
  // 数据上传 要分为第一次上传post 更新put
  net_upload: function(time) {
    var that = this
    var net_upload_data = that.data.net_upload_data
    net_upload_data.baseId = that.data.baseId
    let result = that.form_verify()
    //console.log("验证结果",result)
    if(result){
      // 数据整理在这 
      let status = wx.getStorageSync('status')
      if (status.professionalSkills) {
        //console.log("用户put上传的数据", net_upload_data)

        that.shangchuan_data(net_upload_data, "put")
        // //console.log("用户点击的传输结果",result)
        // if(result  == "true"){
        //console.log("用户手动点击的传输成功了")
        //console.log(that.data.timer_switch)
        that.switch_false()
        upload.load()
        that.setData({
          status: "ok"
        })
        wx.navigateTo({
          url: '../fourthPart/fourthPart',
        })
      }else{
        //console.log("用户post上传的数据", net_upload_data)

        that.shangchuan_data(net_upload_data, "post")
        // //console.log("用户点击的传输结果",result)
        // if(result  == "true"){
        //console.log("用户手动点击的传输成功了")
        //console.log(that.data.timer_switch)
        that.switch_false()
        upload.load()
        that.setData({
          status: "ok"
        })
        wx.navigateTo({
          url: '../fourthPart/fourthPart',
        })
      }
    }
  },
  // 最后点击提交按钮的时候触发
  // 检测数据变化 。将数据放入待提交的对象中
  dataChange: function(e) {
    var that = this
    var new_post = this.data.post_data
    //console.log("已经存储的数据",new_post)
    // 遍历 知识类型
    var konwledges = this.data.konwledges
    var knowledge_textarea = this.data.knowledge_textarea
    konwledges.forEach(function(val, index) {
      // //console.log("索引",index)
      // 判断是否被选中 另外还要判断 是否是含有文本框的那个
      if (val.checked === true && val.level) {
        new_post[val.name] = val.level
      }
      // } else if(val.hidden === false ){
      //   //console.log("选中状态，但是未选等级")
      //   that.showModal(e)
      // }
      else if (index === 7 && val.checked == true) {
        //console.log("第一个文本框选中", knowledge_textarea)
        new_post[val.name] = knowledge_textarea
      } else {
        // //console.log("不做处理")
        that.compare(val.name)

      }
    })

    // 遍历技能类型
    var skills = this.data.skill;
    var skill_textarea = this.data.skill_textarea
    // //console.log("====================")
    // //console.log(skills)
    // //console.log("====================")

    skills.forEach(function(val, index) {
      // 判断选中状态，而且单选框有值
      if (val.checked === true && val.level) {
        //console.log("添加字段", val.value)
        new_post[val.name] = val.level
      } else if (index === 18 && val.checked === true) {
        // 判断是不是多行文本框的
        //console.log("第二个文本框选中", skill_textarea)
        new_post[val.name] = skill_textarea
      } else {
        // //console.log("删除已存在带提交数据中的值",val.value)
        that.compare(val.name)
      }
    })
    //console.log("提交的数据", new_post)
    // that.uploadData(new_post)
  },

  // 新的数据改变 遍历
  data_change: function () {
    let that = this
    let net_upload_data = that.data.net_upload_data
    that.knowledge_each()
    that.skill_each()
  },
  // 遍历知识
  knowledge_each:function(){
    let that = this    
    let konwledges = this.data.konwledges
    let knowledge_textarea = this.data.knowledge_textarea
    let net_upload_data = that.data.net_upload_data
    let know_str = ""
    konwledges.forEach(function (val, index) {
      // //console.log("索引",index)
      // 判断是否被选中 另外还要判断 是否是含有文本框的那个
      if (val.checked === true && val.radio_value) {
        net_upload_data[val.name] = val.radio_value
        let text = val.name +"|"
        know_str += text
      }
      else if (index === 7 && val.checked == true) {
        //console.log("第一个文本框选中", knowledge_textarea)
        net_upload_data['knowOthers'] = knowledge_textarea
      } else if (index === 7 && val.checked == false) {
        //console.log("删除其他知识类型")
        net_upload_data['knowOthers'] = ""
        // that.compare(val.name)
      } else if (val.checked == false){
        net_upload_data[val.name] = ""
      }
    })
    net_upload_data["knowledge"] = know_str
    that.setData({
      net_upload_data: net_upload_data,
      know_str:know_str
    })
    //console.log("知识技能遍历后的结果", net_upload_data)
    // //console.log("知识技能遍历后的组合文本", know_str)
  },
  // 遍历技能
  skill_each:function(){
    let that = this    
    let skill = this.data.skill;
    let skill_textarea = this.data.skill_textarea
    let net_upload_data = that.data.net_upload_data
    let know_str = ""

    skill.forEach(function (val, index) {
      // 判断选中状态，而且单选框有值
      if (val.checked === true && val.radio_value) {
        //console.log("添加字段", val.value)
        net_upload_data[val.name] = val.radio_value
        let text = val.name +"|"
        know_str+=text
      } else if (index === 18 && val.checked === true) {
        // 判断是不是多行文本框的
        //console.log("第二个文本框选中", skill_textarea)
        net_upload_data["skillOthers"] = skill_textarea
      } else if (index === 18 && val.checked === false) {
        //console.log("删除第二个文本框", skill_textarea)
        net_upload_data["skillOthers"] = ""
        // //console.log("删除已存在带提交数据中的值",val.value)
        // that.compare(val.name)
      } else if (val.checked == false){
        net_upload_data[val.name] = ""
      }
    })
    net_upload_data["skill"] = know_str
    that.setData({
      net_upload_data: net_upload_data,
      skill_str: know_str
    })
    //console.log("知识类型遍历后的结果", net_upload_data)
  },
  formSubmit: function(e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    // 不能动态改变
    //console.log('form发生了reset事件')
    var skills = this.data.skill;
    var konwledges = this.data.konwledges
    // var new_post = this.data.post_data
    skills.forEach(function(val, index) {
      val.hidden = true;
    })
    konwledges.forEach(function(val, index) {
      val.hidden = true;
      //console.log(val)
    })
    this.setData({
      skills: skills,
      konwledges: konwledges,
      post_data: []
    })
  },
  get_baseId: function () {
    let baseId = wx.getStorageSync('userIdEnc')
    console.log("缓存中的baseID", baseId)
    this.setData({
      baseId: baseId
    })
    // this.get_id(baseId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate();
    this.get_baseId();
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {
    this.panduan_cunzai()
    // var timer_switch=this.data.timer_switch
    // //console.log(timer_switch)
    // if(timer_switch){
    // this.timer_sender();
    // }
    // // 数据渲染完成后，先获取本地baseid ，然后请求网络，获取 userid
    // var baseId = this.data.baseId
    // this.get_id(baseId)
    // // //console.log("用户id为",user_id)
  },
  initValidate() {
    let rules = {
      name: {
        required: true,
        maxlength: 10
      },
      gender: {
        required: true,
        number: true
      },
      birth: {
        required: true
      },
      marry_status: {
        required: true,
        number: true
      },
      habitation: {
        required: true
      },
      work_place: {
        required: true
      },
      education: {
        required: true,
        number: true
      },
      subject: {
        required: true
      },
      professional_name: {
        required: true
      },
      academy: {
        required: true
      }

    }

    let message = {
      name: {
        required: '请输入姓名',
        maxlength: '名字不能超过10个字'
      },
      gender: {
        required: "请选择您的性别",
        number: '请您选择您的性别'
      },
      birth: {
        required: '请选择出生年月',
      },
      marry_status: {
        required: "请选择您的婚姻状况",
        number: '请选择您的婚姻状况'
      },
      habitation: {
        required: "请选择您的居住城市"
      },
      work_place: {
        required: "请选择您的工做地点"
      },
      education: {
        required: "请选择您的学历",
        number: '请选择您的学历'
      },
      subject: {
        required: "请输入您的学科"
      },
      professional_name: {
        required: "请输入您的专业名称"
      },
      academy: {
        required: "请选择您的毕业学校"
      }
    }
    //实例化当前的验证规则和提示消息
    this.wxValidate = new wxValidate(rules, message);
  },
  handclick: function() {
    let url = '/v1/message/1'
    api.get(url).then((res) => {
      //console.log('222', res.data)
    })
  },
  /**
   * 表单确认按钮
   */
  formSubmit: function(e) {
    let params = e.detail.value;
    //console.log('111', e.detail.value)
    if (!this.wxValidate.checkForm(params)) {
      //表单元素验证不通过，此处给出相应提示
      let error = this.wxValidate.errorList[0];
      switch (error.param) {
        case "name":
          //console.log('name为空', error)
          //TODO
          break;
        case "gender":
          //console.log('sex为空', error.param)
          //TODO
          break;
      }
      this.setData({
        errorMessage: error.msg,
        showErroe: error.param,
      })
      return false;
    } else {
      wx.navigateTo({
        url: '../secondPart/secondPart',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: params
          })
        }
      })
    }
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  get_old_data:function(){
    var baseId = this.data.baseId
    let that = this
    let url = "/skills/baseId/" + baseId
    api.get(url).then(function(res){
      //console.log("数据库保存的数据",res.data)
      that.setData({ net_upload_data:res.data})
      Object.keys(res.data).forEach(function(key){
        // //console.log("储存的键为",key)
        if(res.data[key]){
          // //console.log("储存的值为",key, res.data[key])
          that.split(key, res.data[key],res.data)
        }
        // {
        //   'id': 1,
        //     name: 'profession',
        //       checked: false,
        //         radio_value: null,
        //           value: '行业知识',
        //             "hidden": true
        // },
      })
    })
  },
  // 复原 知识类型的勾选
  knowledge_checked:function(key,my_value){
    let konwledges = this.data.konwledges
    let that = this
    // //console.log("value", key)
    // //console.log("value对应的值", my_value)
    konwledges.forEach(function(value,index){
      // //console.log("知识类型的复原",value.name)
      if (value.name == key){
        value.radio_value = my_value
        value.checked = true
      }
    })
    that.setData({
      konwledges: konwledges
    })
    //console.log("复原后的konwledges", konwledges)
  },
  skill_checked: function (key, my_value) {
    let konwledges = this.data.skill
    let that = this
    // //console.log("value", key)
    konwledges.forEach(function (value, index) {

      if (value.name == key) {
        // //console.log("技能类型的复原", value.name)
        // //console.log("value对应的值", my_value)
        value.radio_value = my_value
        value.checked = true
      }
    })
    that.setData({
      skill: konwledges
    })
    //console.log("复原后的skill", konwledges)

  },
  split:function(key,myvalue,dict){
    let that = this
    if (key == "knowledge"){
      // 知识类型中的
      let values_list = myvalue.split("|")
      values_list.forEach(function(value,index){
        if(value){
          // //console.log("分割后的/value",value,dict[value])
          that.knowledge_checked(value, dict[value])
        }
      })
    }
    else if(key == "skill"){
      // 技能
      let values_list = myvalue.split("|")
      values_list.forEach(function (value, index) {
        if (value) {
          // //console.log("分割后的value", value, dict[value])
          that.skill_checked(value, dict[value])
        }
      })
    }
    else if (key == "knowOthers"){
      let text = dict[key]
      // //console.log("++++++++++++++",text)
      let konwledges = that.data.konwledges
      konwledges[7].checked = true
      // knowledge_textarea = text
      that.setData({
        konwledges: konwledges,
        knowledge_textarea: text
      })
    }else if (key == "skillOthers"){
      let text = dict[key]
      // skill_textarea
      let skill = that.data.skill
      skill[18].checked = true
      that.setData({
        skill_textarea: text,
        skill: skill
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //console.log("页面显示")

    // this.setData({
    //   timer_switch:false
    // })
    // var timer_switch = this.data.timer_switch
    // //console.log(timer_switch)
    // if (timer_switch) {
    //   this.timer_sender();
    // }
    // 数据渲染完成后，先获取本地baseid ，然后请求网络，获取 userid
    // var baseId = this.data.baseId
    // if (baseId) {
    //   //console.log("baseId存在，页面显示不需要重新获取")
    // } else {

    // }
    // var baseId = this.data.baseId
    // this.get_id(baseId)
    // //console.log("用户id为",user_id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //console.log("页面隐藏")
    this.switch_false()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var timer_switch = this.data.timer_switch
    timer_switch = false
    this.setData({
      timer_switch: timer_switch
    })
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