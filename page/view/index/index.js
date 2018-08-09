// page/view/index/index.js
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
    openid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    // app.getUserInfo(function (e) {
      
    // });
    var host = config.host;
    
    req.getRequest(host + "/api/getIndexInformation", {}, "POST", function(res) {
      var data = res.data;
      console.log(res.data);
      var code = data.code;
      if(code == '999') {
        console.log("今天没有活动");
      } else {
        var bookInfo = data.bookInfo;
        for (var i in bookInfo) {
          console.log(bookInfo[i][0].participates);
          console.log(bookInfo[i][0].participates.length);  
          if (bookInfo[i][0].participates.length > 0) {
            var userInfos = bookInfo[i][0].participates;
            console.log(userInfos);
            for (var j in userInfos) {
              if (userInfos[j].openid == self.openid) {
                // 本人已参加了
                userInfos[j].isJoin = 'true';
              } else {
                userInfos[j].isJoin = 'false';
              }
            }
            bookInfo[i].participates = userInfos;
          }

        }

        var json = {
          id: data.id,
          period: data.period,
          activityDate: data.activity_date
        };
        console.log(111);
        console.log(json);
        self.setData({
          activityInfo: json,
          bookInfo: bookInfo
        });
      }
      
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
  
  },
  join: function(e) {
    var self = this;
    var userInfo = this.userInfo;
    var bookId = e.currentTarget.dataset.id;
    var activityId = this.data.activityInfo.id;
    var openid = app.globalData.openid;
    var data = {};
    data.bookId = bookId;
    data.activityId = activityId;
    data.openId = openid;
    var host = config.host;
    req.getRequest(host + "/participation/join", data, "GET", function (res) {
        console.log(res);
        var result = res.data;
        if(result.code == '200') {
          // 成功了
        }
    })
  }
})