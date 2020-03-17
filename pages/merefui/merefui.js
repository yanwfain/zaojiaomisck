// pages/merefui/merefui.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    riderCommentList: [
      {
        value: 1,
        title: '课程相关'
      },
      {
        value: 2,

        title: '测评相关'
      },
      {
        value: 3,
        title: '会员相关'
      },
      {
        value: 4,
        title: '教具相关'
      },
      {
        value: 5,
        title: '大课堂相关'
      },
    ],
    feedback_type: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url1 = app.globalData.url + '/api/index/question';
    var params = {
      // user_id: app.globalData.user_id,
      // feedback: this.data.inp_val
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if (res.code == 1) {
      //  that.setData({
      //    riderCommentList:res.data
      //  })
        console.log(that.data.riderCommentList)
      } else {
        // wx.showToast({
        //   title: res.msg,
        //   icon: 'none'
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  checkboxChangeFn:function(e){
    wx.navigateTo({
      url: '../mechangjian/mechangjian?type=' + e.currentTarget.dataset.title
    })
  },
  //按钮问题点击多选
  checkboxChange(e) {
    var that = this;
    console.log('checkboxChange e:', e);
    console.log(e.currentTarget.dataset.index)
    let string = "riderCommentList[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)

    that.setData({
      feedback_type: detailValue
    })
    console.log(that.data.feedback_type)
    // if (e.currentTarget.dataset.index == "0") {
    //   console.log(e.currentTarget.dataset.index)
    //   this.setData({
    //     // floNe: true =!floNe: false
    //     floNe: !this.data.floNe
    //   })
    // }
  },
  bindinput:function(e){
    this.setData({
      inp_val: e.detail.value
    });
    console.log(this.data.inp_val)
  },
  submit:function(e){
    var url1 = app.globalData.url + '/api/index/feedback';
    var params = {
      user_id: app.globalData.user_id,
      feedback: this.data.inp_val
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if(res.data==1){
        wx.showToast({
          title: res.msg,
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
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