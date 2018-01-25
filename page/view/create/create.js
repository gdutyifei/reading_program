// page/view/create/create.js
var req = require('../../../util/request.js');
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var host = config.host;
    console.log(config.host);
    req.getRequest(host + "/book/getBookList", {}, "POST", function (res) {
      var data = res.data;
      if(data.code == 200) {
        var bookList = data.data;
        console.log(bookList);
        self.setData({
          books: bookList
        })
      }
    }, function (err) {

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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value;
    var host = config.host;
    console.log(config.host);
    req.getRequest(host + "/activity/insertActivities", data, "GET", function (res) {
      console.log(res);
    }, function (err) {

    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})