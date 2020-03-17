// pages/indexviode/indexviode.js
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
    console.log(options)
    this.setData({
      id:options.id,
      url:options.url,
      resource_id: options.resource_id
    })
    var that = this
    var url = app.globalData.url + '/api/index/getVideoById';
    var params = {
      // user_id: app.globalData.user_id,
      id: that.data.resource_id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          listAarry:res.data
        })
        // wx.switchTab({
        //   url: '../index/index',
        // })
      } else {


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
  subsit:function(e){
    var that = this
    var url = app.globalData.url + '/api/index/successRecommend';
    var params = {
      user_id: app.globalData.user_id,
      id:that.data.id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.switchTab({
          url: '../index/index',
        })
      } else {
        

      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
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