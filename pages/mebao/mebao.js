// pages/mebao/mebao.js
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
    upload_picture_list: '',
    img_list: '',
    img_num: '0',//默认9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

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
       
        year: res.data.year,
        shnnum: res.data.height,
        tinum: res.data.weight
      })
      if (res.data.sex){
        that.setData({
          'pickerProData.index': res.data.sex,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    // if()
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
  inpname:function(e){
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  shnnumFn:function(e){
    this.setData({
      shnnum: e.detail.value
    })
  },
  tinumFn:function(e){
    this.setData({
      tinum: e.detail.value
    })
  },
  submit:function(e){
    var that = this
    if (!this.data.mony){
      wx.showToast({
        title: '生日为必填',
        icon:'none'
      })
      return
    }
    if (!this.data.shnnum) {
      wx.showToast({
        title: '请完善身高信息',
        icon: 'none'
      })
      return
    }
    if (!this.data.tinum) {
      wx.showToast({
        title: '请完善体重信息',
        icon: 'none'
      })
      return
    }
    if (this.data.pickerProData.index==0) {
      wx.showToast({
        title: '性别为必填',
        icon: 'none'
      })
      return
    }
    var url1 = app.globalData.url + '/api/user/editUser';
    var params = {
      user_id: app.globalData.user_id,
      name: this.data.name,
      sex: this.data.pickerProData.index,
      year: this.data.mony,
      height: this.data.shnnum,
      weight: this.data.tinum
    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if(res.code==1){
        wx.showToast({
          title: '编辑成功',
        })
        wx.navigateBack({//返回
          delta: 1
        })
      }else{
        wx.showToast({
          title: '编辑失败',
          icon:'none'
        })
      }
      // that.setData({
      //   head_img: res.data.head_img,
      //   name: res.data.name,
      //   mobile: res.data.mobile,
      // })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  uploadimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var tempFiles = res.tempFiles

        that.setData({
          upload_picture_list: tempFilePaths,
        });
        wx.uploadFile({
          url: app.globalData.url + '/api/common/upload',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          // data: tempFilePaths[0],
          // file: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            'user': 'test'  //其他额外的formdata，可不写
          },
          success: function (res) {

            console.log(res)
            var datas = JSON.parse(res.data);
            // img_list.push(data.msg);
            that.setData({
              img_list: datas.data.url,
            });
            console.log(that.data.img_list)
          },

          fail: function (res) {
            console.log('fail');

          },
        })


      }
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