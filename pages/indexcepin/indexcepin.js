// pages/indexcepin/indexcepin.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    isopctshow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url1 = app.globalData.url + '/api/index/questionBank';
    var params = {
      user_id: app.globalData.user_id
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if(res.code==1){
        that.setData({
          list: res.data.list,
          result_id: res.data.result_id
        })
        that.setData({
          isopctshow: false
        })
      }else{
        that.setData({
          isopctshow: true
        })
        wx.showModal({
          title: '提示',
          content: res.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
             wx.switchTab({
               url: '../index/index',
             })
            }
          }
        })
      }
      
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    console.log(this.data.list)
  },
  submit: function (e) {
    var that = this;
    var url1 = app.globalData.url + '/api/index/overResult';
    var params = {
      user_id: app.globalData.user_id,
      member_result_id: that.data.result_id,
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      // if (res.code == 1) {
        // that.setData({
        //   list: res.data.list
        // })
        wx.navigateTo({
          url: '../indexresults/indexresults?all_score=' + res.data.all_score + '&baby_year=' + res.data.baby_year + '&listdata=' + JSON.stringify(res.data.data) + '&day=' + res.data.day + '&success=' + res.data.success ,
        })
      // } else {
        
      //   wx.showToast({
      //     title: res.msg,
      //   })
      // }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
   
  },
  topFn:function(e){
    console.log(this.data.list.length)
    var toalnum = this.data.num
    toalnum ++ 
    
    if (toalnum >= this.data.list.length-1){
      wx.showToast({
        title: '已经是最后一题',
      })
      
      this.setData({
        num: this.data.list.length-1,
        isShowhide:true,

      })
    } 
    else{
      this.setData({
        num: toalnum
      })
    }
  },
  botFn:function(e){
    var toalnum = this.data.num
    toalnum--
   
    if (toalnum <= 0) {
      wx.showToast({
        title: '已经是第一道题',
      })

      this.setData({
        num: 0,
        // isShowhide: true
      })
    }else{
      this.setData({
        num: toalnum
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  seleFn: function (e) {
    console.log(e.currentTarget.dataset.nums)
    this.setData({
      tid: e.currentTarget.dataset.tid,
    })
    console.log(this.data.list[this.data.num])
    var that = this;
    var url1 = app.globalData.url + '/api/index/memberResultSubject';
    var params = {
      user_id: app.globalData.user_id,
      member_result_id: that.data.result_id,
      subject_id: that.data.list[that.data.num].id,
      subject: that.data.list[that.data.num].subject,
      result_id: e.currentTarget.dataset.abc,
      result: e.currentTarget.dataset.result,
      subject_category_id: that.data.list[that.data.num].subject_category_id,
      subject_category_name: that.data.list[that.data.num].subject_category_name,
      score: e.currentTarget.dataset.nums
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if (res.code == 1) {
       

      } else {
        wx.showModal({
          title: '提示',
          content: res.msg + '您已经答过该题',
          showCancel: false,
          success(res) {
            if (res.confirm) {
            
            }
          }
        })
      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    setTimeout(function(){
      var toalnum = that.data.num
      toalnum++

      if (toalnum >= that.data.list.length - 1) {

        
        that.setData({
          num: that.data.list.length - 1,
          // isShowhide: true,

        })
      }
      else {
        that.setData({
          num: toalnum
        })
       
      }
      console.log(that.data.num)
      console.log(e.currentTarget.dataset.tatalnum)
      if (that.data.num == e.currentTarget.dataset.tatalnum){
        that.setData({
          isShowhide: true,
        })
        wx.showToast({
          title: '您已完成测试请点击提交生成测评结果',
          icon:'none'
        })
        return 
      }
      that.setData({
        tid: '',
      })
     
    },500)
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.list)
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