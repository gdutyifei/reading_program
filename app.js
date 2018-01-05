const openIdUrl = require('./config').openIdUrl

App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  // 全局变量
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: {}
  },
  // 获取用户位置
  getLocationInfo: function() {
    var self = this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
      },
      fail: function(e) {
        console.log(e);
      }
    })
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          console.log(data);
          var code = data.code;
          console.log(code);
          wx.getUserInfo({
            success: function(res) {
              console.log(res);
              var userInfo = res.rawData;
              console.log(userInfo);
              self.globalData.userInfo = userInfo;
            },
            fail: function(err) {
              console.log('wx.getUserInfo 接口调用失败');
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
