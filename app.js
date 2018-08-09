const openIdUrl = require('./config').openIdUrl;
const req = require('./util/request.js');
const config = require('./config.js');

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
  }
})
