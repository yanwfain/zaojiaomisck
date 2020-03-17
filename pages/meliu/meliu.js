// pages/meliu/meliu.js
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
  
  },
  bindinput: function (e) {
    this.setData({
      inp_val: e.detail.value
    });
    console.log(this.data.inp_val)
  },
  inpFn: function (e) {
    this.setData({
      inp_val2: e.detail.value
    });
    console.log(this.data.inp_val2)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit:function(e){
    var that = this
    var url1 = app.globalData.url + '/api/index/message';
    var params = {
      message: this.data.inp_val,
      user_id: app.globalData.user_id,
      mobile: this.data.inp_val2
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: res.msg,
          // icon: 'none'
        })
        // console.log(that.data.riderCommentList)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
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