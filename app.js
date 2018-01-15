//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('https://api.weixin.qq.com/sns/jscode2session?secret=61d4563ba6f9ad0ff925d6917aa33374&grant_type=authorization_code&appId=wxe9f116fe07fdfa7e&js_code='+res.code);
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?secret=61d4563ba6f9ad0ff925d6917aa33374&grant_type=authorization_code',
        //   data: {
        //     appid: 'wxe9f116fe07fdfa7e',
        //     js_code:res.code
        //   },
        //   success:function(data){
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})