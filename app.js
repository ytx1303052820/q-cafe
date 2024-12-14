// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.cloud.init({
      env: 'wx3ccc6c17a8b39795', // 替换成你的云开发环境ID
      traceUser: true,
    });
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },
  async checkAndFetchEventData() {

      return await this.getEventData().then(data => {
        console.log(data); // 输出获取的数据

return data 
      }).catch(err => {
        console.error('Failed to get originalData:', err);
      });
  },
// 使用封装的函数发起请求
async getEventData() {
  try {
    console.log("call data ")
    const data = await this.request('https://www.socialgravity.cn/menu-item-list');
    return data
  } catch (error) {
    console.log('got error')  }
},
  // 封装一个函数，返回一个 Promise 对象
  request(url, method = 'GET', data = {}, header = {'content-type': 'application/json'}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: header,
        success: (res) => {
          resolve(res.data); // 请求成功，调用 resolve 并返回 res.data
        },
        fail: (err) => {
          reject(err); // 请求失败，调用 reject 并返回 err
        }
      });
    });
  }
})
