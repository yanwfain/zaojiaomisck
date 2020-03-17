var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
var timeHover = require('../../js/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowxinxi: false,
    vipvideoIs: false,
    isxinxi: false,
    is_showhide: true,
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    showinnert:true,
    // is_timestatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    this.setData({
      time_inertvl: timestamp
    })
    var that = this;

    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.MyUserInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
    // var that = this;

  },
  img_showfn:function(e){
    wx.navigateTo({
      url: '../indeximg/indeximg',
    })
  },
  vipFn_vip: function () {
    wx.navigateTo({
      url: '../indexVip/indexVip',
    })
  },
  kaivipFn: function (e) {
    wx.navigateTo({
      url: '../indexVip/indexVip?today=' + this.data.today,
    })
  },
  showFn:function(e){
    wx.showModal({
      title: '说明',
      content: '条形图代表根据宝宝测评结果得出的宝宝在五大领域的发育水平，以及距离完成本月的大目标所需练习对应类别课程的次数',
      showCancel: false,
      success(res) {
        if (res.confirm) {

        }
      }
    })
  },
  delitFn: function (e) {
    // pages/shcooldeilt/shcooldeilt
    wx.navigateTo({
      url: '../shcooldeilt/shcooldeilt',
    })
  },
  videFn: function (e) {
    wx.navigateTo({
      url: '../indexvideHui/indexvideHui',
    })
  },
  videoFn: function (e) {
    wx.navigateTo({
      url: '../indexviode/indexviode?id=' + e.currentTarget.dataset.id + '&url=' + e.currentTarget.dataset.url + '&resource_id=' + e.currentTarget.dataset.resource_id

      ,
    })
  },
  xueshopFn: function (e) {
    wx.navigateTo({
      url: '../indexxueshop/indexxueshop',
    })
  },
  audiosFn: function (e) {
    wx.navigateTo({
      url: '../audiodelit/audiodelit?id=' + e.currentTarget.dataset.id + '&url=' + e.currentTarget.dataset.url + '&resource_id=' + e.currentTarget.dataset.resource_id,
    })
  },
  tibtnFn: function (e) {
    wx.navigateTo({
      url: '../mebao/mebao',
    })
  },
  cepinFn: function (e) {
    //是否完善信息
    // if (this.data.isxinxi) {
    var url1 = app.globalData.url + '/api/user/getUserInfo';
    var params = {
      user_id: app.globalData.user_id,
      // id: e.currentTarget.dataset.id,

    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      if (res.data.year) {
        wx.navigateTo({
          url: '../indexcp/indexcp',
        })
      } else {
        this.setData({
          isShowxinxi: true
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })

    // } else {
    // wx.navigateTo({
    //   url: '../indexcp/indexcp',
    // })
    // }

  },
  lookallFn: function (e) {
    wx.navigateTo({
      url: '../indexvideoall/indexvideoall?today=' + this.data.today,
    })
  },
  optiFn: function (e) {
    this.setData({
      isShowxinxi: false
    })
  },
  
  bindwanFn: function (e) {
  
    var that = this
  
    var url = app.globalData.url + '/api/index/successRecommend';
    var params = {
      user_id: app.globalData.user_id,
      id: e.currentTarget.dataset.id,

    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        console.log(e.currentTarget.dataset.id)

        this.setData({
          id_id: e.currentTarget.dataset.id
        })
        var url5 = app.globalData.url + '/api/index/getRecommend';
        var params = {
          user_id: app.globalData.user_id
        }
        app.wxRequest('POST', url5, params, (res) => {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              is_showhide: false,
              is_txt: res.msg,
              vipvideoIs: true,
              vipkaitong: true,
            })
   
          } else {
            that.setData({
              active_show: true,
            })
            if (!res.data.resource) {
              that.setData({
                is_data: true,
                is_showhide:false
              })
            } else {
              that.setData({
                is_data:false,
                is_showhide: true,
              
                list_showhide: res.data.resource,
              
              })
              console.log(that.data.active_show)
              var time_inertvl = that.data.time_inertvl;
              var time_overtime = res.data.over_timee;
              that.setData({
                time_overtime: res.data.over_timee
              })
              if (time_inertvl > time_overtime) {
                console.log(111111)
                that.setData({
                  showinnert: true
                })
              } else {
                that.setData({
                  showinnert: false
                })
                clearInterval(that.data.interval);
                that.startCountdown()

              }
              var list_member_result_id = [];
              var list_group_id = [];
              if (res.data.resource[0])
                list_member_result_id.push(res.data.resource[0].member_result_id)
              if (res.data.resource[1])
                list_member_result_id.push(res.data.resource[1].member_result_id)
              if (res.data.resource[2])
                list_member_result_id.push(res.data.resource[2].member_result_id)
              if (res.data.resource[0])
                list_group_id.push(res.data.resource[0].group_id)
              if (res.data.resource[1])

                list_group_id.push(res.data.resource[1].group_id)
              if (res.data.resource[2])

                list_group_id.push(res.data.resource[2].group_id)
              that.setData({
                list_member_result_id: list_member_result_id,
                list_group_id: list_group_id
              })
              console.log(that.data.list_member_result_id)
              console.log(that.data.list_group_id)
            }

          }

        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
        wx.showToast({
          title: res.msg,
        })

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
    var url11 = app.globalData.url + '/api/user/getUserInfo';
    var params11 = {
      user_id: app.globalData.user_id
    }
    app.wxRequest('POST', url11, params11, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list_data1: res.data.score[0].score / 300 * 100,
          list_data1_num: res.data.score[0].score,

        })


        that.setData({

          list_data2: res.data.score[1].score / 300 * 100,
          list_data2_num: res.data.score[1].score,

        })


        that.setData({

          list_data3: res.data.score[2].score / 300 * 100,
          list_data3_num: res.data.score[2].score,

        })


        that.setData({

          list_data4: res.data.score[3].score / 300 * 100,
          list_data4_num: res.data.score[3].score,
        })


        that.setData({

          list_data5: res.data.score[4].score / 300 * 100,
          list_data5_num: res.data.score[4].score,
        })

        if (res.data.vip_over_timee) {
          that.setData({
            vip_overshow: false
          })
        } else {
          that.setData({
            vip_overshow: true
          })
        }

      } else {


      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  startCountdown: function (endTime) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var serverTime = timestamp / 1000;
    console.log(serverTime)
    var endTime = that.data.time_overtime
    console.log(timestamp)
    console.log(endTime)
    var millisecond = (endTime - serverTime) * 1000;
    // var millisecond = 10000;
    console.log(millisecond)
    that.setData({
       interval : setInterval(function () {
        // console.log('循环中');
        millisecond -= 1000;
        if (millisecond <= 0) {
          clearInterval(that.data.interval);
          that.setData({
            countdown: {
              day: '00',
              hour: '00',
              minute: '00',
              second: '00'
            },
            showinnert: true
          });

          return;
        }
        that.transformRemainTime(millisecond);
      }, 1000)
    })

    // that.setData({
    //   invert: interval
    // })
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function (millisecond) {
    var that = this;

    var countdownObj = that.data.countdown;
    // console.log(countdownObj)
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function (time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  ressertFn: function (e) {
    this.setData({

    })
    var that = this
   
   
    var url = app.globalData.url + '/api/index/successAllRecommend';
    var params = {
      user_id: app.globalData.user_id,
      member_result_id: that.data.list_member_result_id,
      group_id: that.data.list_group_id,

    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: res.msg,
        })
        var url5 = app.globalData.url + '/api/index/getRecommend';
        var params = {
          user_id: app.globalData.user_id
        }
        app.wxRequest('POST', url5, params, (res) => {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              is_showhide: false,
              is_txt: res.msg,
              vipvideoIs: true
            })
            // if (!that.data.vip_overshow) {
            //   that.setData({
            //     vipvideoIs: true,
            //   })
              
            // }
          } else {
            if (!res.data.resource){
              that.setData({
                is_data:true,
                is_showhide: false
              })
            }else{
              that.setData({
                is_data: false,
                is_showhide: true,
                list_showhide: res.data.resource,
                // list_member_result_id: res.data[0].member_result_id
              })
              var time_inertvl = that.data.time_inertvl;
              var time_overtime = res.data.over_timee;
              that.setData({
                time_overtime: res.data.over_timee
              })
              if (time_inertvl > time_overtime) {
                console.log(111111)
                that.setData({
                  showinnert: true
                })
              } else {
                that.setData({
                  showinnert: false
                })
                clearInterval(that.data.interval);
                that.startCountdown()
               
              }
              var list_member_result_id = [];
              var list_group_id = [];
              if (res.data[0])
                list_member_result_id.push(res.data.resource[0].member_result_id)
              if (res.data[1])
                list_member_result_id.push(res.data.resource[1].member_result_id)
              if (res.data[2])
                list_member_result_id.push(res.data.resource[2].member_result_id)
              if (res.data[0])
                list_group_id.push(res.data.resource[0].group_id)
              if (res.data[1])

                list_group_id.push(res.data.resource[1].group_id)
              if (res.data[2])

                list_group_id.push(res.data.resource[2].group_id)
              that.setData({
                list_member_result_id: list_member_result_id,
                list_group_id: list_group_id
              })
              console.log(that.data.list_member_result_id)
              console.log(that.data.list_group_id)
            }
           
          }

        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
        console.log(that.data.list_member_result_id)
        console.log(that.data.list_group_id)
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })

    var url11 = app.globalData.url + '/api/user/getUserInfo';
    var params11 = {
      user_id: app.globalData.user_id
    }
    app.wxRequest('POST', url11, params11, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list_data1: res.data.score[0].score / 300 * 100,
          list_data1_num: res.data.score[0].score,

        })


        that.setData({

          list_data2: res.data.score[1].score / 300 * 100,
          list_data2_num: res.data.score[1].score,

        })


        that.setData({

          list_data3: res.data.score[2].score / 300 * 100,
          list_data3_num: res.data.score[2].score,

        })


        that.setData({

          list_data4: res.data.score[3].score / 300 * 100,
          list_data4_num: res.data.score[3].score,
        })


        that.setData({

          list_data5: res.data.score[4].score / 300 * 100,
          list_data5_num: res.data.score[4].score,
        })

        if (res.data.vip_over_timee) {
          that.setData({
            vip_overshow: false
          })
        } else {
          that.setData({
            vip_overshow: true
          })
        }

      } else {


      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  vipvideoFn: function (e) {
    this.setData({
      vipvideoIs: false
    })
  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          wxuser: res.userInfo,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function () { }
    })

    getOpenid(that)
    console.log(this)
  },
  audioFn: function (e) {
    wx.navigateTo({
      url: '../audioall/audioall',
    })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  binaudeFn: function (e) {
    if (this.data.data_lsit_au){
      wx.navigateTo({
        url: '../audiodelit/audiodelit?url=' + this.data.data_lsit_au.music_url + '&image=' + this.data.data_lsit_au.music_image + '&name=' + this.data.data_lsit_au.name + '&url_id=' + 2,
      })
    }else{
      wx.showToast({
        title: '暂无音乐信息',
        icon:'none'
      })
    }
   
  },
  huibenFn: function (e) {
    if (this.data.data_lsit_hui){
      wx.navigateTo({
        url: '../audiodelith/audiodelith?url=' + this.data.data_lsit_hui.music_url + '&image=' + this.data.data_lsit_hui.music_image + '&name=' + this.data.data_lsit_hui.name + '&url_id=' + 2,
      })
    }else{
      wx.showToast({
        title: '暂无绘本信息',
        icon: 'none'
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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    this.setData({
      isShowxinxi: false
    })
    var that = this
    var url = app.globalData.url + '/api/index/getOneMusic';
    var params = {
      type: 1

    }
    var params1 = {
      type: 2

    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        // wx.showToast({
        //   title: res.msg,
        // })
        that.setData({
          data_lsit_au: res.data
        })
      } else {
        // wx.showToast({
        //   title: res.msg,
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    app.wxRequest('POST', url, params1, (res) => {
      console.log(res)
      if (res.code == 1) {
        // wx.showToast({
        //   title: res.msg,
        // })
        that.setData({
          data_lsit_hui: res.data
        })
      } else {
        // wx.showToast({
        //   title: res.msg,
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    var url_1 = app.globalData.url + '/api/index/getBanner';
    var params_1={

    }
    app.wxRequest('POST', url_1, params_1, (res) => {
      console.log(res)
      if (res.code == 1) {
        // wx.showToast({
        //   title: res.msg,
        // })
        that.setData({
          list_img: res.data
        })
      } else {
        // wx.showToast({
        //   title: res.msg,
        // })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  
    this.onLoad()
    getOpenid(that)


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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onLoad()
    this.onShow()
    wx.stopPullDownRefresh();
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
function getOpenid(that) {
  var url = app.globalData.url + '/api/index/getOpenid';
  var url1 = app.globalData.url + '/api/user/getUserInfo';
  var url2 = app.globalData.url + '/api/user/addUser';
  // var url = 
  console.log(that)
  var params = {};
  params.appId = 'wx78e9a767510ed868';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      app.globalData.session_key = res.data.session_key
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)

        if (res.code == '1') {


          if (res.data.vip_over_timee) {
            that.setData({
              vip_overshow: false
            })
          } else {
            that.setData({
              vip_overshow: true
            })
          }
          that.setData({
            list_data1: res.data.score[0].score / 300 * 100,
            list_data1_num: res.data.score[0].score,

          })


          that.setData({

            list_data2: res.data.score[1].score / 300 * 100,
            list_data2_num: res.data.score[1].score,

          })


          that.setData({

            list_data3: res.data.score[2].score / 300 * 100,
            list_data3_num: res.data.score[2].score,

          })


          that.setData({

            list_data4: res.data.score[3].score / 300 * 100,
            list_data4_num: res.data.score[3].score,
          })


          that.setData({

            list_data5: res.data.score[4].score / 300 * 100,
            list_data5_num: res.data.score[4].score,
          })

          that.setData({
            name: res.data.name,
            head_img: res.data.head_img,
            year: res.data.year,
            weight_name: res.data.weight_name,
            height_name: res.data.height_name,
            weight: res.data.weight,
            today: res.data.today,
            height: res.data.height,
            list_1: res.data.score[0].name,
            list_2: res.data.score[1].name,
            list_3: res.data.score[2].name,
            list_4: res.data.score[3].name,
            list_5: res.data.score[4].name,

          })
          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name
          })
          var url4 = app.globalData.url + '/api/index/getResult';
          var params = {
            user_id: app.globalData.user_id
          }
          app.wxRequest('POST', url4, params, (res) => {
            console.log(res)

            // that.setData({
            //   list_data1: res.data.score[0].score / 30 * 100,
            //   list_data1_num: res.data.score[0].score,
            //   list_data2: res.data.score[1].score / 30 * 100,
            //   list_data2_num: res.data.score[1].score,
            //   list_data3: res.data.score[2].score / 30 * 100,
            //   list_data3_num: res.data.score[2].score,
            //   list_data4: res.data.score[3].score / 30 * 100,
            //   list_data4_num: res.data.score[3].score,
            // })

            // if (res.data.score[0].score>0){
            //   that.setData({
            //     list_data1: res.data.score[0].score / 30 * 100,
            //     list_data1_num: res.data.score[0].score,

            //   })
            // }
            // if (res.data.score[1].score > 0) {
            //   that.setData({

            //     list_data2: res.data.score[1].score / 30 * 100,
            //     list_data2_num: res.data.score[1].score,

            //   })
            // }
            // if (res.data.score[2].score > 0) {
            //   that.setData({

            //     list_data3: res.data.score[2].score / 30 * 100,
            //     list_data3_num: res.data.score[2].score,

            //   })
            // }
            // if (res.data.score[3].score > 0) {
            //   that.setData({

            //     list_data4: res.data.score[3].score / 30 * 100,
            //     list_data4_num: res.data.score[3].score,
            //   })
            // }
            console.log(that.data.list_data1)

          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
          })
          var url5 = app.globalData.url + '/api/index/getRecommend';
          var params = {
            user_id: app.globalData.user_id
          }
          app.wxRequest('POST', url5, params, (res) => {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                is_showhide: false,
                is_txt: res.msg
              })
              
            } else {
              that.setData({
                is_showhide: true,
                list_showhide: res.data.resource,
                // list_member_result_id: res.data[0].member_result_id
              })
              var time_inertvl = that.data.time_inertvl;
              var time_overtime = res.data.over_timee;
              that.setData({
                time_overtime: res.data.over_timee
              })
              if (time_inertvl > time_overtime) {
                console.log(111111)
                that.setData({
                  showinnert: true
                })
              } else {
                // console.log('22222')
                that.setData({
                  showinnert: false
                })
                clearInterval(that.data.interval);
                that.startCountdown()

              }
              var list_member_result_id = [];
              var list_group_id = [];
              if (res.data.resource[0])
                list_member_result_id.push(res.data.resource[0].member_result_id)
              if (res.data.resource[1])
                list_member_result_id.push(res.data.resource[1].member_result_id)
              if (res.data.resource[2])
                list_member_result_id.push(res.data.resource[2].member_result_id)
              if (res.data.resource[0])
                list_group_id.push(res.data.resource[0].group_id)
              if (res.data.resource[1])

                list_group_id.push(res.data.resource[1].group_id)
              if (res.data.resource[2])

                list_group_id.push(res.data.resource[2].group_id)
              that.setData({
                list_member_result_id: list_member_result_id,
                list_group_id: list_group_id
              })
              console.log(that.data.list_member_result_id)
              console.log(that.data.list_group_id)
            }
            that.setData({
              // list_data1: res.data.score[0].score / 30 * 100,
              // list_data1_num: res.data.score[0].score,
              // list_data2: res.data.score[1].score / 30 * 100,
              // list_data2_num: res.data.score[1].score,


            })
            // console.log(that.data.list_data1)

          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
          })
        }
        if (res.code == '0') {
         
          console.log(app.globalData.userInfo)
          // var params1 = {

          // };
          // console.log(res.data.openid)
          console.log(app.globalData.openId)

          app.globalData.head_img = app.globalData.userInfo.avatarUrl
          // params.openid = app.globalData.openId;
          // params.headimg = app.globalData.userInfo.avatarUrl;
          // params.user_name = app.globalData.userInfo.nickName;
          // params.sex = app.globalData.userInfo.gender;
          // console.log(params.headimg)
          // console.log(params.user_name)
          app.wxRequest('POST', url2, { openid: app.globalData.openId, headimg: app.globalData.userInfo.avatarUrl, user_name: app.globalData.userInfo.nickName, sex: app.globalData.userInfo.gender }, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, { openid: app.globalData.openId, headimg: app.globalData.userInfo.avatarUrl, user_name: app.globalData.userInfo.nickName, sex: app.globalData.userInfo.gender }, (res) => {
              console.log(res)
              that.setData({
                name: res.data.name,
                head_img: res.data.head_img,
                year: res.data.year,
                weight_name: res.data.weight_name,
                height_name: res.data.height_name,
                today: res.data.today,
                height: res.data.height,
                weight: res.data.weight,
                list_1: res.data.score[0].name,
                list_2: res.data.score[1].name,
                list_3: res.data.score[2].name,
                list_4: res.data.score[3].name,
                list_5: res.data.score[4].name,
              })
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
              var url4 = app.globalData.url + '/api/index/getResult';
              var params = {
                user_id: app.globalData.user_id
              }
              app.wxRequest('POST', url4, params, (res) => {
                console.log(res)
                if (res.code == 1) {
                  that.setData({
                    // list: res.data.list,
                    // result_id: res.data.result_id
                  })

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
              var url5 = app.globalData.url + '/api/index/getRecommend';
              var params = {
                user_id: app.globalData.user_id
              }
              app.wxRequest('POST', url4, params, (res) => {
                console.log(res)
                if (res.code == 0) {
                  that.setData({
                    is_showhide: false,
                    is_txt: '暂无推荐信息'
                  })
                } else {
                  that.setData({
                    is_showhide: true,
                    list_showhide: res.data.resource
                  })

                }
                var time_inertvl = that.data.time_inertvl;
                var time_overtime = res.data.over_timee;
                that.setData({
                  time_overtime: res.data.over_timee
                })
                if (time_inertvl > time_overtime) {
                  console.log(111111)
                  that.setData({
                    showinnert: true
                  })
                } else {
                  that.setData({
                    showinnert: false
                  })
                  clearInterval(that.data.interval);
                  that.startCountdown()

                }
                that.setData({
                  // list_data1: res.data.score[0].score / 30 * 100,
                  // list_data1_num: res.data.score[0].score,
                  // list_data2: res.data.score[1].score / 30 * 100,
                  // list_data2_num: res.data.score[1].score,


                })
                // console.log(that.data.list_data1)

              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
              })
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}
