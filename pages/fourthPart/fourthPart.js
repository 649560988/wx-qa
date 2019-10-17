// pages/forthPart/forthPath.js
import api from '../../utils/http.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    drivingFactors:[],
    score: ['1', '2', '3', '4','5'],
    selected: [],
    checked: [false, false, false, false, false, false, false, false,false],
    showError:'',
    question:[
      { name: 'character1', leftQuestion: '在工作中，倾向于独立于他人思考及行动 ', rightQuestion: '在工作中，倾向于建立广泛的社交圈，并开展互动' },
      { name: 'character2', leftQuestion: '在工作中，倾向独立于团队或他人，单独完成任务', rightQuestion: '在工作中，偏好与人合作，借助他人力量共同完成任务' },
      { name: 'character3', leftQuestion: '在工作中，愿意接受他人的命令和指示', rightQuestion: '在工作中，更享受支配和强有力的局面，希望在争论中占有强势地位' },
      { name: 'character4', leftQuestion: '在谈判中倾向同理他人，通情达理，态度温和', rightQuestion: '在谈判中倾向强势说服他人接受自己的想法和观点' },
      { name: 'character5', leftQuestion: '在工作中，倾向谨慎对待新结识的人，避免一开始与他们交往过密', rightQuestion: '在工作中，倾向从善如流，愿意适应不同风格的人，与他们建立联系' },
      { name: 'character6', leftQuestion: '在工作中，不倾向在公共场合直接暴露自己的想法，避免健谈或外露', rightQuestion: '在工作中，喜欢正式和公开的场合，享受公开讲话或发表自己的观点' },
      { name: 'character7', leftQuestion: '在工作中，不倾向过分暴露自己的情感或感知他人的顾虑，避免多愁善感', rightQuestion: '在工作中，乐于体恤他人情绪，愿意帮助和满足他人的诉求' },
      { name: 'character8', leftQuestion: '在工作中，避免过度参与或干涉他人的问题，倾向于让他人自己做决定', rightQuestion: '在工作中，乐于体恤他人情绪，愿意帮助和满足他人的诉求' },
      { name: 'character9', leftQuestion: '在工作中，倾向以直觉主导思维方式，而非理性分析与决策', rightQuestion: '在工作中，倾向以逻辑推导和分析推理进行问题解决和决策' },
      { name: 'character10', leftQuestion: '在工作中，避免过度依赖数据或分析', rightQuestion: '在工作中，希望问题相关的信息都在掌握之中，倾向从正反两面，对问题进行推演' },
      { name: 'character11', leftQuestion: '在工作中，注重战术的落地和实用性，避免依赖或强调理论或模型', rightQuestion: '在工作中，致力于战略层面的推演，倾向运用模型或相关理论来理解复杂问题' },
      { name: 'character12', leftQuestion: '在工作中，注重找到高效简单的解决方案，而不是建立一系列假设或从多个角度看待问题', rightQuestion: '在工作中，习惯从多个角度解释同一个复杂问题 ' },
      { name: 'character13', leftQuestion: '在工作中，关注事物的全貌，而非沉溺于细节', rightQuestion: '在工作中，关注各个层面的精准性' },
      { name: 'character14', leftQuestion: '在工作中，倾向随情况而定，避免过度筹划', rightQuestion: '在工作中，倾向在事前制定紧密的计划和安排' },
      { name: 'character15', leftQuestion: '在工作中，尽可能规避风险，尤其避免不必要的风险', rightQuestion: '在工作中，喜欢冒险、快速、激进的工作节奏' },
      { name: 'character16', leftQuestion: '在工作中，随具体情况变化，而不会刻板地遵守时间期限', rightQuestion: '在工作中，遵守许下的所有诺言，保证满足所有的承诺' },
      { name: 'character17', leftQuestion: '在工作中，对局限自己施展拳脚的规章制度能够做出变通', rightQuestion: '在工作中，认真执行所有的规章制度' },
      { name: 'character18', leftQuestion: '在工作中，理解压力对自己的意义，认为恐惧和焦虑在何时是适当的，会受他人观点的影响', rightQuestion: '在工作中，总能看到问题的积极面，避免过度责备和批评自己，对于失败的结果和挫折有很强的复原力' },
      { name: 'character19', leftQuestion: '在工作中，避免对未来抱有过于乐观的看法，接受合理批评，会花时间来接受失败的后果', rightQuestion: '在工作中，面对高度的压力，表现的相当冷静和放松，在引发强烈情绪的情景中依然保持镇定' },
      { name: 'character20', leftQuestion: '更喜欢在轻松的节奏下工作，避免忙碌和狂乱的工作方式', rightQuestion: '具备高度的能量和活力，关注任务的高效完成' },
      { name: 'character21', leftQuestion: '做决策之前，倾向于预演并考量所有可能的后果', rightQuestion: '即使信息不足，也能快速做出决策' },
      { name: 'character22', leftQuestion: '更加关注质量而非结果、数量或目标', rightQuestion: '在面对挑战较大的目标时，也有达成结果的雄心壮志' },
      { name: 'character23', leftQuestion: '避免表现出过于争强好胜', rightQuestion: '在竞争的环境中会激发斗志，渴望在竞争的环境中获胜' }
    ],
    options:[
      { name: 1, value: '取得卓越成就' },
      { name: 2, value: '个人成长' },
      { name: 3, value: '实现自我价值' },
      { name: 4, value: '在竞争取胜' },
      { name: 5, value: '与他人建立良好关系' },
      { name: 6, value: '为他人所需要' },
      { name: 7, value: '权利与地位' },
      { name: 8, value: '对他人产生积极影响' },
      { name: 9, value: '获得认可' },
    ],
  },
  handBindchange(e){
    let selected = this.data.selected
    selected[e.currentTarget.dataset.mindex] = e.currentTarget.dataset.buttom
    console.log('selected', selected)
    this.setData({
      selected
    })
    },
  formSubmit: function (e) {
    let status = this.data.status
    for(let i=0;i<23;i++){
      if (this.data.selected[i] == '' || this.data.selected[i] == null){
        let index=i+1
        let name ='#character'+index
        this.setData({
          showError: 'character' + index
        })
        console.log('name')
        this.scroll(name)
        wx.showToast({
          title: '请填写完整',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    if (this.data.drivingFactors.length==0){
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let value={}
    value.character1 = this.data.selected[0]
    value.character2 = this.data.selected[1]
    value.character3 = this.data.selected[2]
    value.character4 = this.data.selected[3]
    value.character5 = this.data.selected[4]
    value.character6 = this.data.selected[5]
    value.character7 = this.data.selected[6]
    value.character8 = this.data.selected[7]
    value.character9 = this.data.selected[8]
    value.character10 = this.data.selected[9]
    value.character11= this.data.selected[10]
    value.character12 = this.data.selected[11]
    value.character13 = this.data.selected[12]
    value.character14 = this.data.selected[13]
    value.character15 = this.data.selected[14]
    value.character16 = this.data.selected[15]
    value.character17 = this.data.selected[16]
    value.character18 = this.data.selected[17]
    value.character19 = this.data.selected[18]
    value.character20 = this.data.selected[19]
    value.character21= this.data.selected[20]
    value.character22= this.data.selected[21]
    value.character23= this.data.selected[22]
    value.drivingFactors = this.data.drivingFactors.join('|')
    value.baseId=this.data.userIdEnc
    if (status.characterPower){
      value.id=this.data.id
      let url = '/character'
      api.put(url, value).then((res) => {
        wx.showToast({
          title: '更新成功',
          icon: 'sucess',
          duration: 2000
        })
      })
    }else{
      let url = '/character'
      let _this=this
      api.post(url, value).then((res) => {
        status.characterPower=true
        wx.setStorage({
          key: "status",
          data: status
        })
        _this.setData({
          status
        })
        wx.showToast({
          title: '增加成功',
          icon: 'sucess',
          duration: 2000
        })
      })
    }
    wx.navigateTo({
      url: '../sixthPart/sixthPart',
    })
  },
  selectedChange(e){
    this.setData({
      drivingFactors: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userIdEnc = wx.getStorageSync('userIdEnc')
    if (userIdEnc) {
      console.log('userIdEnc', userIdEnc)
      let status = wx.getStorageSync('status')
      if (status.characterPower) {
        this.searchContent(userIdEnc)
      }
      this.setData(({
        userIdEnc,
        status
      }))
    }
  },
  searchContent(userIdEnc){
    let url ='/character/'+userIdEnc
    let _this=this
    api.get(url).then((res)=>{
       _this.data.selected[0]= res.data.character1
       _this.data.selected[1]  =res.data.character2 
       _this.data.selected[2]  =res.data.character3 
       _this.data.selected[3]  =res.data.character4 
       _this.data.selected[4]  =res.data.character5 
       _this.data.selected[5]  =res.data.character6 
       _this.data.selected[6]  =res.data.character7 
       _this.data.selected[7]  =res.data.character8 
       _this.data.selected[8]  =res.data.character9 
       _this.data.selected[9]  =res.data.character10
       _this.data.selected[10] =res.data.character11 
       _this.data.selected[11] =res.data.character12 
       _this.data.selected[12] =res.data.character13 
       _this.data.selected[13] =res.data.character14 
       _this.data.selected[14] =res.data.character15 
       _this.data.selected[15] =res.data.character16 
       _this.data.selected[16] =res.data.character17 
       _this.data.selected[17] =res.data.character18 
       _this.data.selected[18] =res.data.character19 
       _this.data.selected[19] =res.data.character20 
       _this.data.selected[20] =res.data.character21 
       _this.data.selected[21] =res.data.character22 
      _this.data.selected[22] = res.data.character23
      _this.data.drivingFactors = res.data.drivingFactors.split('|')
      console.log('_this.data.drivingFactors', _this.data.drivingFactors)
      _this.data.drivingFactors.forEach(function(item){
        let index=parseInt(item)-1
        console.log('index', index)
        _this.data.checked[index]=true
      })
      _this.setData({
        selected: _this.data.selected,
        drivingFactors: _this.data.drivingFactors,
        checked: _this.data.checked,
        id:res.data.id
      })
      
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
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      let miss = res[1].scrollTop + res[0].top - 220;
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

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})