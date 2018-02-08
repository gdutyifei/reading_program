var req = require('../../../util/request.js');
var config = require('../../../config.js');
var app = getApp();
// page/view/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isManager: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var host = config.host;
    var openid = app.globalData.openid;
    self.setData({
      userInfo: JSON.parse(app.globalData.userInfo)
    });
    
    req.getRequest(host + "/user/getUserByOpenid", { openid }, "POST", function (res) {
      if (res) {
        var data = res.data.data[0];
        console.log(data);
        if (data.role != null) {
          self.setData({
            isManager: "Y"
          });
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
  
  }
})