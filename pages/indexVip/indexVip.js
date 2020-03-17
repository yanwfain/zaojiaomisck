// pages/indexVip/indexVip.jsv
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProData: {
      index: 0,
      items: ['请选择性别', '   男   ', '   女   ']
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.today){
    //   this.setData({
    //     today: options.today
    //   })
    // }else{
    //   wx.showToast({
    //     title: '请授权并完善信息后查看',
    //   })
    // }
  },
  pickerProChange: function (e) {
    this.setData({
      'pickerProData.index': e.detail.value
    })
    var that = this;
    console.log(that.data.pickerProData.index)
    console.log(that.data.pickerProData.items[that.data.pickerProData.index])

  },
  pickerProChanges: function (e) {
    console.log(e)
    this.setData({
      mony: e.detail.value
    })
    var that = this;
    console.log(that.data.mony)
  },
  sunbit: function (e) {
    if (!this.data.mony) {
      wx.showToast({
        title: '生日为必填',
        icon: 'none'
      })
      return
    }
    if (this.data.pickerProData.index == 0) {
      wx.showToast({
        title: '性别为必填',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url1 = app.globalData.url + '/api/user/openCard';
    var params = {
      user_id: app.globalData.user_id,

    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: res.msg,
        })
        var url = app.globalData.url + '/api/user/editUser';
        var params = {
          user_id: app.globalData.user_id,
          year: this.data.mony,
          sex: this.data.pickerProData.index
        }
        app.wxRequest('POST', url, params, (res) => {
          console.log(res)

        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
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