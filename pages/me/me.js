// pages/me/me.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSiuser:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      session_key: app.globalData.session_key 
    })
    console.log(this.data.session_key)
    var url1 = app.globalData.url + '/api/user/getUserInfo';
    var params = {
      openid: app.globalData.openId
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      that.setData({
        head_img: res.data.head_img,
        name: res.data.name,
        mobile: res.data.mobile,
        vipover: res.data.vip_over_timee,
        today2: res.data.today2,
        num: res.data.num
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  vipFn_time_btn:function(e){
    wx.navigateTo({
      url: '../indexVip/indexVip',
    })
  },
  vipFn_time:function(e){
    var that = this;
    if (this.data.vipover){
      wx.showToast({
        title: that.data.vipover,
        icon:'none'
      })
    }else{
      wx.showToast({
        title:'暂无会员信息',
        icon: 'none'
      })
    }
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({

      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)

        console.log(e.detail.iv)

        console.log(e.detail.encryptedData)



        var ency = e.detail.encryptedData;

        var iv = e.detail.iv;

        var sessionk = that.data.sessionKey;
        // console


        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

          that.setData({

            modalstatus: true

          });

        } else { //同意授权
          let url = app.globalData.url + '/api/User/getphone';
          console.log(url)
          let data = {
            encry: ency,

            iv: iv,

            sessionKey: that.data.session_key
          };
          console.log(data)

          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if(res.code==1){
              wx.showToast({
                title: '获取成功',
                // icon: 'none'
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              that.setData({
                isSiuser: false,
                // isadd:true
              })
              wx.hideLoading()
              let url = app.globalData.url + '/api/User/editUser';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                mobile: res.data.phone.phoneNumber,
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                if (res.code == 1) {
                  // getOpenid(that)

                }

              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            }else{
              that.setData({
                isSiuser: true,
                // isadd:false
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })
      
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })

        }

      },

      fail: function () {

        console.log("session_key 已经失效，需要重新执行登录流程");

        that.wxlogin(); //重新登录

      }

    });



  },
  
  ggopfn:function(e){
    this.setData({
      isSiuser:false
    })
  },
  baobaoFn: function (e) {
    wx.navigateTo({
      url: '../mebao/mebao',
    })
  },
  resfuiFn: function (e) {
    wx.navigateTo({
      url: '../merefui/merefui',
    })
  },
  liuyanFn:function(e){
    wx.navigateTo({
      url: '../meliu/meliu',
    })
  },
  phonetelFn:function(e){
    if (!this.data.mobile){
      this.setData({
        isSiuser: true
      })
    }else{
      wx.showToast({
        title: '您已经绑定过手机号',
        icon:'none'
      })
    }
    
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

    this.onLoad()
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