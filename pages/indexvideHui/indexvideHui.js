// pages/audioall/audioall.js
var app = getApp()
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
    var url1 = app.globalData.url + '/api/index/getAllMusic';
    var params = {
      type: 2,
      user_id: app.globalData.user_id

    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      that.setData({
        list: res.data
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })

  },
  bindautioFn: function (e) {
    wx.navigateTo({
      url: '../audiodelith/audiodelith?url_id=' + 2 + '&url=' + e.currentTarget.dataset.url + '&image=' + e.currentTarget.dataset.image + '&name=' + e.currentTarget.dataset.name

    })
  },
  bin_wei: function (e) {
    wx.showToast({
      title: '小贝学堂绘本音乐为会员专属',
      icon: 'none'
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