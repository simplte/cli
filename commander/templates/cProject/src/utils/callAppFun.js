import _utils from "./utils.js";
/*
 * h5原生交互方法
 * createTime:2019-10-23
 * Author:bqc
 */

// 原生修改webview标题
function callAppChangeTitle(title) {
  if (title) {
    let params = {
      title: title
    };
    try {
      if (_utils.isIos()) {
        window.webkit.messageHandlers.h5ChangeTitle.postMessage(params);
      } else if (_utils.isAndroid()) {
        window.android.h5ChangeTitle(title);
      }
    } catch (e) {}
  }
}
// 唤醒app监听网络
function callAppWatchNet() {
  try {
    if (_utils.isIos()) {
      window.webkit.messageHandlers.bkStartListenNet.postMessage("");
    } else if (_utils.isAndroid()) {
      window.android.bkStartListenNet();
    }
  } catch (e) {
    console.warn("原生方法调用");
  }
}
// 发起跳转原生登陆请求
function callAppToken(callback) {
  this.jumpAppOtherPage();
  try {
    if (_utils.isIos()) {
      window.webkit.messageHandlers.bkUserLogin.postMessage("");
    } else if (_utils.isAndroid()) {
      window.android.bkUserLogin();
    }
  } catch (e) {
    callback("当前版本过低，请下载最新版本");
  }
}
// 发起分享请求
function callAppShare(img, url, con, miniurl, callback) {
  let that = this;
  try {
    let params = {
      shareImg: img,
      shareUrl: url, // h5地址
      shareCon: con,
      shareMini: miniurl //TODO小程序地址
    };
    if (_utils.isIos()) {
      window.webkit.messageHandlers.bkShareWX.postMessage(params);
    } else if (_utils.isAndroid()) {
      window.android.bkShareWX(params.shareImg, params.shareUrl, params.shareCon, params.shareMini);
    }
  } catch (e) {
    callback("当前版本过低，请下载最新版本");
  }
}
// 发起跳转原生的页面
function callAppJump(type, content, title, callback) {
  try {
    let params = {
      type: type,
      content: content,
      title: title
    };
    if (_utils.isIos()) {
      window.webkit.messageHandlers.bkPageJump.postMessage(params);
    } else if (_utils.isAndroid()) {
      window.android.bkPageJump(content, title, type);
    }
  } catch (e) {
    callback("当前版本过低，请下载最新版本");
  }
}
// 发起原生视频埋点
function callAppReport(videoId, videoName) {
  try {
    let params = {
      videoId,
      videoName
    };
    if (_utils.isIos()) {
      window.webkit.messageHandlers.bkWatchV.postMessage(params);
    } else if (_utils.isAndroid()) {
      window.android.bkWatchV(videoId, videoName);
    }
  } catch (e) {}
}
export default {
  callAppChangeTitle,
  callAppWatchNet,
  callAppToken,
  callAppShare,
  callAppJump,
  callAppReport
};
