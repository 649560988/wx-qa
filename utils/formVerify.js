const form_verify=function(form_data){
  let base_str=""
  Object.keys(form_data).forEach(function(key){
    // 不是必填数据
    let a_list = ['sort','baseId','id']
    let index = a_list.indexOf(key)
    // console.log("索引",index)
    // console.log("key=========>",key)
    if (form_data[key] == null || form_data[key] == ""){
      if (index > -1){

      }else{
        key = key + "|"
        base_str += key
      }
    }
  })
  console.log("值为空的",base_str)
  return base_str
}
module.exports = {
  form_verify
}