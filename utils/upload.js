const load = function(){
  wx.showLoading({
    title: '数据上传中',
  })

}
const success = function(){
  wx.hideLoading()
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
  })
}

// demo
// 按钮点击以后 是 load
// 返回数据以后，用success


module.exports ={
  load,
  success
}