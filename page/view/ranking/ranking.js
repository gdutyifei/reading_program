// page/view/ranking/ranking.js
var app = getApp();
var req = require('../../../util/request.js');
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    personalRangeInfo: {},
    rangeList: {},
    none: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var host = config.host;
    wx.showLoading({
      title: '加载中，请稍等',
    })
    self.setData({
      userInfo: app.globalData.userInfo
    })
    let openid = app.globalData.openid;
    console.log(openid);
    req.getRequest(host + "/participation/getRangeList", { openid: openid}, "GET", function (res) {
      console.log(res);
      var data = res.data;
      if(data) {
        console.log(data.rangeList);
        self.setData({
          personalRangeInfo: data.personalRangeInfo,
          rangeList: data.rangeList
        });
      } else {
        self.setData({
          none: true
        });
      }
      wx.hideLoading();
    });
    // app.getUserInfo(function (e) {
    //   // console.log(e);
    //   self.setData({
    //     userInfo: JSON.parse(e)
    //   })
    // });
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