// pages/indexresults/indexresults.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow1:true,
    isshow2:false,
    listarry:[],
    num_is:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = wx.createSelectorQuery();
    console.log(options)
    this.setData({
      all_score: options.all_score,
      baby_year: options.baby_year,
      day: options.day,
      listdata: JSON.parse(options.listdata),
      list_nave: options.listdata,
      success: options.success
    })
    console.log(this.data.listdata)
    if (this.data.listdata[0]){
      this.setData({
        listdata1: this.data.listdata[0].all_score / 30 * 100,
      })
     
    }
    if (this.data.listdata[1]) {
      this.setData({
        listdata2: this.data.listdata[1].all_score / 30 * 100,
      })
  
    }
    if (this.data.listdata[2]) {
      this.setData({
        listdata3: this.data.listdata[2].all_score / 30 * 100,
      })
    
    }
    if (this.data.listdata[3]) {
      this.setData({
        listdata4: this.data.listdata[3].all_score / 30 * 100,
      })
     
    }
    if (this.data.listdata[4]) {
      this.setData({
        listdata5: this.data.listdata[4].all_score / 30 * 100,
      })
    
    }

    console.log(this.data.listdata1)
    console.log(this.data.listarry)
  },
  ooscep:function(e){
    this.setData({
      // isshow1: true,
      // isshow2: false,
      num_is: e.currentTarget.dataset.num

    })
    wx.createSelectorQuery().select('#ops1').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop:1
      })
    }).exec()
    console.log(this.data.num_is)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  cepshuomFn:function(e){
    // wx.redirectTo({
    //   url: '../indexcpdedlit/indexcpdedlit?list_nave=' + this.data.list_nave,
    // })
    wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop: 597
      })
    }).exec()
    this.setData({
      // isshow1: false,
      // isshow2: true,
      num_is: e.currentTarget.dataset.num

    })
    console.log(this.data.num_is)
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