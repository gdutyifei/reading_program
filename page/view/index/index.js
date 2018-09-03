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
      var bookInfo = data.data;
      if(code == '999' || ! bookInfo) {
        console.log("今天没有活动");
      } else {
        for (var i in bookInfo) {
          bookInfo[i].book_infos = JSON.parse(bookInfo[i].book_infos)[0];
          if (bookInfo[i].participates.length > 0) {
            var userInfos = bookInfo[i].participates;
            console.log(userInfos);
            let newUserInfos = []
            for (var j in userInfos) {
              let userInfo = JSON.parse(userInfos[j].user_info);
              console.log(userInfo);
              if (userInfo.openid == self.openid) {
                // 本人已参加了
                userInfo.isJoin = 'true';
              } else {
                userInfo.isJoin = 'false';
              }
              newUserInfos.push(userInfo);
            }
            bookInfo[i].participates = newUserInfos;
          }

        }

        var json = {
          // id: data.id,
          period: bookInfo[0].period,
          activityDate: bookInfo[0].activity_date
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
    console.log(e);
    var self = this;
    var userInfo = app.globalData.userInfo;
    var index = e.currentTarget.dataset.index;
    var activityId = e.currentTarget.dataset.id;
    var bookId = e.currentTarget.dataset.bookid;
    var bookInfo = this.data.bookInfo;
    // var activityId = this.data.activityInfo.id;
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
          console.log(userInfo);
          userInfo.isJoin = 'true';
          bookInfo[index].participates.push(userInfo);
          self.setData({
            bookInfo: bookInfo
          })
          console.log(bookInfo);
          wx.showToast({
            title: '签到成功！',
            icon: 'none'
          })
        } else if(result.code == '999') {
          wx.showToast({
            title: '您已经签到过了哦',
            icon: 'none'
          })
        }
    })
  }
})