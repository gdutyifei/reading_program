var req = require('../../../util/request.js');
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo: "",
    bookInfo: [],
    openid: "",
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.showLoading({
      title: '加载中，请稍等...',
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (data) {
              var code = data.code;
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  console.log(res);
                  var userInfo = res.userInfo;
                  userInfo.code = code
                  self.getCodeByUserInfo(userInfo);
                }
              })
            }
          })
        } else {
          wx.hideLoading();
          self.setData({
            loading: true
          })
        }
      }
    })
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

  },
  getCodeByUserInfo(userInfo) {
    // 插入用户数据
    var host = config.host;
    console.log("插入用户数据");
    req.getRequest(host + "/weixinApi/getOpenidByCode", userInfo, "GET", function (res) {
      var data = res.data;
      var openid = data.data;
      // console.log(openid);
      app.globalData.openid = openid;
      // 自己的坑自己填
      var newUserInfo = {};
      newUserInfo.avatar_url = userInfo.avatarUrl;
      newUserInfo.nick_name = userInfo.nickName;
      newUserInfo.openid = openid;

      app.globalData.userInfo = newUserInfo;
      wx.hideLoading();
      wx.switchTab({
        url: '/page/view/index/index'
      })
    });
  },
  getTheUserInfo(e) {
    console.log(e)
    var self = this;
    wx.showLoading({
      title: '加载中，请稍等...',
    })
    wx.login({
      success: function (data) {
        var code = data.code;
        var userInfo = e.detail.userInfo;
        userInfo.code = code;
        self.getCodeByUserInfo(userInfo);
      },
      fail: function (err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }
    })
  }
})