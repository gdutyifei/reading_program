function getRequest(URL, DATA, METHOD, FUC, ERR) {
  var that = this;
  if (DATA != null) {
    wx.request({
      url: URL,
      method: METHOD,
      header: {
        'content-type': 'application/json'
      },
      data: DATA,
      success: function (resp) {
        console.log(resp);
        FUC(resp);
        return;
      },
      fail: function (resp) {
        ERR(resp);
      }
    })
  }
}

module.exports = {
  getRequest: getRequest
}
