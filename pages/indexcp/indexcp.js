// pages/indexcp/indexcp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url_1 = app.globalData.url + '/api/index/getNote';
    var params_1 = {

    }
    app.wxRequest('POST', url_1, params_1, (res) => {
      console.log(res)
      if (res.code == 1) {
        // wx.showToast({
        //   title: res.msg,
        // })
        that.setData({
          list_img: res.data
        })
      } else {
        // wx.showToast({
        //   title: res.msg,
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
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
  cpstartFn:function(e){
    wx.navigateTo({
      url: '../indexcepin/indexcepin',
    })
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