wx.config({
  debug: false,
  appId: wxConfig.appId,
  timestamp: wxConfig.timestamp,
  nonceStr: wxConfig.nonceStr,
  signature: wxConfig.signature,

  jsApiList: [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    // 'hideMenuItems',
    'showMenuItems',
    // 'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
  ]
});

wx.ready(function() {
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareQZone(shareData);
  wx.onMenuShareQQ(shareData);
  wx.hideMenuItems({
    menuList: ['menuItem:originPage', 'menuItem:openWithQQBrowser',
      'menuItem:copyUrl', 'menuItem:openWithSafari'
    ],
  });
});
