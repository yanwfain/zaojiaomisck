const app = getApp()
const innerAudioContext = wx.getBackgroundAudioManager();
// const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    audiolist: [
      {
        audiosrc: '',
        coverimg: "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg"
      }
    ],
    isPlayAudio: true,
    audioSeek: 0,
    audioDuration: 0,
    showTime1: '00:00',
    showTime2: '00:00',
    audioTime: 0,
    islist: false,
    index: 0,
    isaudios_start:false
  },
  onLoad: function (options) {


    console.log(options)
   
    if (options.url_id == 2) {
      this.setData({
        url_id: options.url_id,
        image: options.image,
        name: options.name,
        'audiolist[0].audiosrc': options.url
      })
      // const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.title = this.data.name
      innerAudioContext.src = this.data.audiolist[0].audiosrc
      this.Initialization();
      this.loadaudio();

    } else {
      this.setData({
        resource_id: options.resource_id
      })
      var that = this;
      var url1 = app.globalData.url + '/api/index/getMusicById';
      var params = {
        id: that.data.resource_id,

      }
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)

        } else {
          console.log('hhh1')
          clearInterval(this.data.durationIntval);
          this.setData({
            // url_id: options.url_id,
            image: res.data.music_image,
            name: res.data.name,
            'audiolist[0].audiosrc': res.data.music_url,
            // showTime1: '00:00',
            audioSeek: 0,
            audioDuration: 0,
          })
          innerAudioContext.autoplay = true
          innerAudioContext.title = this.data.name
          innerAudioContext.src = this.data.audiolist[0].audiosrc
          // this.Initialization();
          this.loadaudio();
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
      })
    }

    var that = this;
    var url1 = app.globalData.url + '/api/index/getAllMusic';
    var params = {
      type: 1,
      user_id: app.globalData.user_id

    }
    app.wxRequest('POST', url1, params, (res) => {
      console.log(res)
      that.setData({
        list: res.data
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })

    // this.onReady()

  },
  bin_wei: function (e) {
    wx.showToast({
      title: '小贝学堂绘本音乐为会员专属',
      icon: 'none'
    })
  },
  audioPlayed: function () {
    myAudio.play()
    setTimeout(() => {

      myAudio.currentTime

      myAudio.onTimeUpdate(() => {
        console.log(myAudio.duration)   //总时长
        console.log(myAudio.currentTime)   //当前播放进度
      })
    }, 500)
  },
  bindautioFn: function (e) {
    console.log(e.currentTarget.dataset.max_score)
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.max_score > 0) {
      wx.showToast({
        title: '小贝学堂绘本音乐为会员专属',
        icon: 'none'
      })
    } else {
      this.setData({
        isaudios_start: false
      })
      clearInterval(this.data.durationIntval);
      this.setData({
        image: e.currentTarget.dataset.image,
        name: e.currentTarget.dataset.name,
        'audiolist[0].audiosrc': e.currentTarget.dataset.url,
        // showTime1: '00:00',
        audioSeek: 0,
        audioDuration: 0,
        index: e.currentTarget.dataset.index
      })
      this.setData({
        isPlayAudio: true
      })
      innerAudioContext.autoplay = true
      innerAudioContext.title = this.data.name
      innerAudioContext.src = this.data.audiolist[0].audiosrc
      this.Initialization();
      this.loadaudio();

    }
  },
  listFn: function (e) {
    this.setData({
      islist: true
    })
  },
  listFNis: function (e) {
    this.setData({
      islist: false
    })
  },
  topFn: function (e) {
    var index = this.data.index;
    index--
    console.log(index)
    if (index < 0) {
      wx.showToast({
        title: '已经是第一首歌曲了',
        icon: 'none'
      })
      this.setData({
        index: 0
      })
    } else {
      console.log(index)
      if (this.data.list[index].max_score > 0) {
        wx.showToast({
          title: '该歌曲小贝学堂绘本音乐为会员专属',
          icon: 'none'
        })
      } else {
        this.setData({
          isaudios_start: false
        })
        this.setData({
          index: index,
          isPlayAudio: true
        })
        clearInterval(this.data.durationIntval);
        this.setData({
          image: this.data.list[index].music_image,
          name: this.data.list[index].name,
          'audiolist[0].audiosrc': this.data.list[index].music_url,
          // showTime1: '00:00',
          audioSeek: 0,
          audioDuration: 0,
        })
        innerAudioContext.autoplay = true
        innerAudioContext.title = this.data.name
        innerAudioContext.src = this.data.audiolist[0].audiosrc
        this.Initialization();
        this.loadaudio();
      }
    }
  },
  botFn: function (e) {
    console.log(this.data.list)
    var index = this.data.index;
    index++
    console.log(this.data.list.length)
    if (index > this.data.list.length - 1) {
      wx.showToast({
        title: '已经是最后一首歌曲了',
        icon: 'none'
      })
      this.setData({
        index: this.data.list.length - 1
      })
    } else {
      
      console.log(index)
      if (this.data.list[index].max_score > 0) {
        wx.showToast({
          title: '该歌曲小贝学堂绘本音乐为会员专属',
          icon: 'none'
        })
      } else {
        this.setData({
          isaudios_start: false
        })
        
        this.setData({
          index: index,
          isPlayAudio:true
        })
        console.log(index)
        console.log(this.data.index)
        console.log(this.data.list[this.data.index])
        clearInterval(this.data.durationIntval);
        this.setData({
          image: this.data.list[index].music_image,
          name: this.data.list[index].name,
          'audiolist[0].audiosrc': this.data.list[index].music_url,
          // showTime1: '00:00',
          audioSeek: 0,
          audioDuration: 0,
        })
        innerAudioContext.autoplay = true
        innerAudioContext.title = this.data.name
        innerAudioContext.src = this.data.audiolist[0].audiosrc
        this.Initialization();
        this.loadaudio();
      }
    }
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
        if (res.platform == "devtools") {
                      console.log('pc')
        } else if (res.platform == "ios") {
          console.log('ios')
        } else if (res.platform == "android") {
          console.log('android')
        }
      }
    })

    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx)
    this.audioCtx.play()

  },

  onShow: function () {
    var that = this
    // this.Initialization();
    // this.loadaudio();

    // this.funplay()
    // this.Initialization();
    // this.loadaudio();
    // wx.onBackgroundAudioPlay(function () {
    //   console.log('onBackgroundAudioPlay')
    // }),

    /**
     * 监听音乐暂停
     */
    // wx.onBackgroundAudioPause(function () {
    //   console.log('onBackgroundAudioPause')
    // }),

    /**
     * 监听音乐停止
     */
    // wx.onBackgroundAudioStop(function () {
    //   console.log('onBackgroundAudioStop')
    //   util.playAudio()
    // })

  },
  //初始化播放器，获取duration
  Initialization() {
  
    // if (this.data.audiolist[0].audiosrc.length != 0) {
    //设置src
   
    if (this.data.url_id!=2){
      // innerAudioContext.src = this.data.audiolist[0].audiosrc;
      //运行一次
      innerAudioContext.play();
      // innerAudioContext.pause();
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.data.audiolist[0].audiosrc
      innerAudioContext.title = this.data.name
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
        this.setData({
          isaudios_start: true
        })
        console.log('hhh')
        if (this.data.isaudios_start) {
          console.log('eeee')
          var that = this
         
          this.data.durationIntval = setInterval(function () {
            //当歌曲在播放时执行
            if (that.data.isPlayAudio == true) {
              //获取歌曲的播放时间，进度百分比
              var seek = that.data.audioSeek;
              var duration = innerAudioContext.duration;
              var time = that.data.audioTime;
              time = parseInt(100 * seek / duration);
              //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
              var min = parseInt((seek + 1) / 60);
              var sec = parseInt((seek + 1) % 60);
              //填充字符串，使3:1这种呈现出 03：01 的样式
              if (min.toString().length == 1) {
                min = `0${min}`;
              }
              if (sec.toString().length == 1) {
                sec = `0${sec}`;
              }
              var min1 = parseInt(duration / 60);
              var sec1 = parseInt(duration % 60);
              if (min1.toString().length == 1) {
                min1 = `0${min1}`;
              }
              if (sec1.toString().length == 1) {
                sec1 = `0${sec1}`;
              }
              //当进度条完成，停止播放，并重设播放时间和进度条
              if (time >= 100) {
                innerAudioContext.stop();
                that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
                return false;
              }
              //正常播放，更改进度信息，更改播放时间信息
              that.setData({ audioSeek: seek + 1, audioTime: time, audioDuration: duration, showTime1: `${min}:${sec}`, showTime2: `${min1}:${sec1}` });
            }
          }, 1000);
        }
        this.setData({
          showTime1: '00:00',
          audioSeek: 0,
          audioDuration: 0,
        })

      })
    }
    var t = this;
    innerAudioContext.onCanplay(() => {
      console.log('开始')

      //初始化duration
      innerAudioContext.duration
      setTimeout(function () {
        //延时获取音频真正的duration
        var duration = innerAudioContext.duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        }
        t.setData({ audioDuration: innerAudioContext.duration, showTime2: `${min}:${sec}` });
      }, 1000)
    })
    // }
  },
  //拖动进度条事件
  sliderChange(e) {
    var that = this;
    // innerAudioContext.src = this.data.audiolist[0].audiosrc;
    // innerAudioContext.title = this.data.name;
    //获取进度条百分比
    var value = e.detail.value;
    this.setData({ audioTime: value });
    var duration = this.data.audioDuration;
    //根据进度条百分比及歌曲总时间，计算拖动位置的时间
    value = parseInt(value * duration / 100);
    //更改状态
    this.setData({ audioSeek: value, isPlayAudio: true });
    //调用seek方法跳转歌曲时间
    innerAudioContext.seek(value);
    //播放歌曲
    innerAudioContext.play();
  },
  //播放、暂停按钮
  playAudio() {
    //获取播放状态和当前播放时间
   
    var isPlayAudio = this.data.isPlayAudio;
    var seek = this.data.audioSeek;
    innerAudioContext.pause();
    // clearInterval(this.data.durationIntval);
    //更改播放状态
    this.setData({ isPlayAudio: !isPlayAudio })
    if (isPlayAudio) {
      //如果在播放则记录播放的时间seek，暂停
      // innerAudioContext.pause();
      this.audioCtx.pause()
      this.setData({ audioSeek: innerAudioContext.currentTime });
      console.log(this.data.audioSeek)

    } else {
      // clearInterval(this.data.durationIntval);
      console.log(this.data.audioSeek)
      // this.setData({
      //   showTime1: this.data.audioSeek
      // })
      console.log(this.data.showTime1)
      this.audioCtx.play()
      // innerAudioContext.play();
      //如果在暂停，获取播放时间并继续播放
      // innerAudioContext.src = this.data.audiolist[0].audiosrc;
      // innerAudioContext.title = this.data.name;
      if (innerAudioContext.duration != 0) {
        this.setData({ audioDuration: innerAudioContext.duration });
      }
      //跳转到指定时间播放
      innerAudioContext.seek(this.data.audioSeek);
      innerAudioContext.play();
      // var seek = this.data.audioSeek;
      // var duration = innerAudioContext.duration;
      // var time = this.data.audioTime;
      // time = parseInt(100 * seek / duration);
      // //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
      // var min = parseInt((seek + 1) / 60);
      // var sec = parseInt((seek + 1) % 60);
      // //填充字符串，使3:1这种呈现出 03：01 的样式
      // if (min.toString().length == 1) {
      //   min = `0${min}`;
      // }
      // if (sec.toString().length == 1) {
      //   sec = `0${sec}`;
      // }
      // var min1 = parseInt(duration / 60);
      // var sec1 = parseInt(duration % 60);
      // if (min1.toString().length == 1) {
      //   min1 = `0${min1}`;
      // }
      // if (sec1.toString().length == 1) {
      //   sec1 = `0${sec1}`;
      // }
      // this.setData({
      //   showTime1: `${min}:${sec}`
      // })
      console.log(this.data.showTime1)
    }
  },
  loadaudio() {
    var that = this;
    //设置一个计步器
    // if (that.data.isaudios_start)
    this.data.durationIntval = setInterval(function () {
      //当歌曲在播放时执行
      if (that.data.isPlayAudio == true) {
        //获取歌曲的播放时间，进度百分比
        var seek = that.data.audioSeek;
        var duration = innerAudioContext.duration;
        var time = that.data.audioTime;
        time = parseInt(100 * seek / duration);
        //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
        var min = parseInt((seek + 1) / 60);
        var sec = parseInt((seek + 1) % 60);
        //填充字符串，使3:1这种呈现出 03：01 的样式
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        }
        var min1 = parseInt(duration / 60);
        var sec1 = parseInt(duration % 60);
        if (min1.toString().length == 1) {
          min1 = `0${min1}`;
        }
        if (sec1.toString().length == 1) {
          sec1 = `0${sec1}`;
        }
        //当进度条完成，停止播放，并重设播放时间和进度条
        if (time >= 100) {
          console.log(time)
          innerAudioContext.stop();
          that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
          return false;
        }
        //正常播放，更改进度信息，更改播放时间信息
        that.setData({ audioSeek: seek + 1, audioTime: time, audioDuration: duration, showTime1: `${min}:${sec}`, showTime2: `${min1}:${sec1}` });
      }
    }, 1000);

  },
  onUnload: function () {
    //卸载页面，清除计步器
    clearInterval(this.data.durationIntval);
    innerAudioContext.pause();
  }
})

