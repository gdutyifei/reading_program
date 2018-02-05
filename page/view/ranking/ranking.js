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
    rangeList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var host = config.host;
    self.setData({
      userInfo: JSON.parse(app.globalData.userInfo)
    })
    req.getRequest(host + "/participation/getRangeList", {}, "GET", function (res) {
      console.log(res);
      var data = res.data;
      if(data != null && data != null) {
        console.log(data.rangeList);
        
        self.setData({
          personalRangeInfo: data.personalRangeInfo,
          rangeList: data.rangeList
        });
      }
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