const baseUrl ='https://topsales.top'
// const baseUrl ='https://api.qa.console.retailsolution.cn'
const request = (apiurl, options) => {
  let url = baseUrl + apiurl;
  return new Promise((resolve, reject) => {
    wx.request({
      url:url,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      success(request) {
        if (request.statusCode  === 200) {
          resolve(request.data)
        } else {
          console.log('request', request)
          reject(request.data)
        }
      },
      fail(error) {
        console.log('fail', error)
        reject(error.data)
      }
    })
  })
  .catch((e) => {
    wx.showToast({
      title: e.message,
      icon: 'none',
      duration: 3000
    })
    console.log('catch', e)
    });
}

const get = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
  return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
  return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, { method: 'DELETE', data: options })
}

module.exports = {
  get,
  post,
  put,
  remove
}
