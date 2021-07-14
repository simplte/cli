import api from "../index";
import urls from "./urls";
import md5Util from "../../assets/js/md5.js";
import _utils from "@/utils/utils.js";
let platform = _utils.isIos() ? "iphone" : "android";
console.warn(`手机系统：${platform}`);
// 生成签名
function buildSign(platform, macAddress, time) {
  var pjStr = "platform=" + platform + "&macAddress=" + macAddress + "&time=" + time + "&appsecret=ZePD4yB5";
  var signStr = pjStr.toLowerCase();
  var sign = md5Util.mhex_md5(signStr);
  return sign;
}
// 请求头数据
const header = {
  "Content-Type": "application/json",
  platform: "h5",
  macAddress: "",
  time: "",
  sign: "",
  appKey: "bqcApp",
  sid: ""
};

export default {
  readBuyList(params) {
    var timestamp = Date.parse(new Date()) / 1000;
    header["sign"] = buildSign("h5", "", timestamp);
    header["time"] = timestamp;
    return api.post(urls.readBuyList, params, header);
  },
  readBuyDetail(params) {
    var timestamp = Date.parse(new Date()) / 1000;
    header["sign"] = buildSign("h5", "", timestamp);
    header["time"] = timestamp;
    return api.post(urls.readBuyDetail, params, header);
  },
  readBuyBanner(params) {
    var timestamp = Date.parse(new Date()) / 1000;
    header["sign"] = buildSign("h5", "", timestamp);
    header["time"] = timestamp;
    return api.post(urls.readBuyBanner, params, header);
  },
  readBuyLike(params) {
    var timestamp = Date.parse(new Date()) / 1000;
    header["sign"] = buildSign("h5", "", timestamp);
    header["time"] = timestamp;
    return api.post(urls.readBuyLike, params, header);
  }
};
