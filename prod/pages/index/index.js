//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    formIds: [],
    userInfo: {},
    hasUserInfo: false,
    collapse: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navList: null
  },
  //事件处理函数
  bindViewTap: function () { wx.navigateTo({ url: '../logs/logs' }); },
  onCollapse(e) { let { collapse } = this.data; this.setData({ collapse: !collapse }) },
  onLoad: function () {
    setTimeout(_ => {
      let { id, openId, wechatId, unionId } = app.globalData;
      let params = app.util.createQueryString({ id, openId, wechatId, unionId })
      let navList = [
        { title: 'BZ主页', path: `/BZ/pages/index/index${params}` },
        { title: 'Teein主页', path: `/Teein/pages/index/index${params}` },
      ];
      this.setData({ navList })
    }, 800)
    this.setData({ pageCounting: getCurrentPages().length });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let formIds = []
    let timer = setInterval(_ => {
      let { formIds } = this.data;
      if (formIds.length > 2) { clearInterval(timer); this.setData({ formIds }) }
    }, 100)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
