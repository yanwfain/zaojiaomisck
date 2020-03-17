// pages/indexvideoall/indexvideoall.js
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
    that.setData({
      today: options.today
    })
    var url1 = app.globalData.url + '/api/user/getUserInfo';
    var params = {
      openid: app.globalData.openId
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      that.setData({
     
        vipover: res.data.vip_over_timee,
     
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    var url = app.globalData.url + '/api/index/overRecommend';
    var params = {
      user_id: app.globalData.user_id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list:res.data
        })
        if (that.data.list == false) {
          wx.showToast({
            title: '暂无数据',
          })
        }
      } 
    
       else {
       wx.showToast({
         title: res.msg,
       })
      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  bindtab_show:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      index_list: e.currentTarget.dataset.index
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