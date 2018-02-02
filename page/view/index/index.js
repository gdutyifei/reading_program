// page/view/index/index.js
var req = require('../../../util/request.js');
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo: {},
    bookInfo: [],
    openid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    app.getUserInfo(function (e) {
      console.log(e);
      self.setData({
        openid: JSON.parse(e).openid
      })
    });
    var host = config.host;
    console.log(config.host);
    req.getRequest(host + "/api/getIndexInformation", {}, "POST", function(res) {
      var data = res.data;
      console.log(res.data);
      var bookInfo = data.bookInfo;
      for(var i in bookInfo) {
        console.log(bookInfo[i][0]);
        if (bookInfo[i][0].participates.length > 0) {
          var userInfos = bookInfo[i][0].participates[0].user_info;
          bookInfo[i].participates = userInfos;
          for (var j in userInfos) {
            if(userInfos[j].openid == self.openid) {
            
            }
          }
        }
        
      }
      
      var json = {
        id: data.id,
        period: data.period,
        activityDate: data.activity_date
      };
      self.setData({
        activityInfo: json,
        bookInfo: bookInfo
      });
    }, function(err) {

    });
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