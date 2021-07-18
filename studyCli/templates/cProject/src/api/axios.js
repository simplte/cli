import axios from "axios";
// 创建 axios 实例
let service = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 30000
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "post" || config.method === "put") {
      if (config.url.indexOf("videoDetailH5") > -1 || config.url.indexOf("likeH5") > -1) {
        config.headers["sid"] = sessionStorage.getItem("sid");
      }
    }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    let info = {};

    if (!error.response) {
      info = {
        code: 5000,
        msg: "Network Error"
      };
    } else {
      let { status, statusText, data } = error.response;
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
  }
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function() {
  return service;
}
