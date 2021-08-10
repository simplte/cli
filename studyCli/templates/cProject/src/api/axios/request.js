import axios from 'axios';

import { axiosCanceler } from './cancel.js';
import { axiosRetry } from './retry.js';

export class AxiosRequest {
  axiosInstance = null;
  options = null;

  constructor(options) {
    this.options = options || {};
    this.axiosInstance = axios.create(options);
    this.setupInterceptorsFn();
  }

  /**
   * @description : 拦截器配置
   */
   setupInterceptorsFn() {
    const transform = this.options?.transform;
    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (transform?.onBeforeRequest) {
        config = await transform?.onBeforeRequest(config);
      }
      const shouldIgnoreCancel = config?.closeCancelToken ?? this.options?.closeCancelToken;
      if (!shouldIgnoreCancel) {
        axiosCanceler.addPending(config);
      }
      return config;
    }, undefined);

    // 响应结果拦截器，数据处理
    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);

      if (transform?.onSuccessResponse) {
        return transform?.onSuccessResponse(res);
      }
      return res;
    }, undefined);
    // 捕获异常错误，是否尝试重试
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      return axiosRetry(error).then(() => {
        debugger
        this.request(error?.config);
      });
    });
    // 响应结果拦截器错误捕获
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      debugger
      if (transform?.onErrorResponse) {
        return transform?.onErrorResponse(error);
      }
      return Promise.reject(error);
    });
  }
  /**
   * @description: 请求方法
   */
  request(config) {
    console.log(config);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          if (axios.isCancel(res)) return;
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * @description: GET 请求方法
   */
  get(config) {
    return this.request({ ...config, method: 'GET' });
  }

  /**
   * @description: POST 请求方法
   */
  post(config) {
    return this.request({ ...config, method: 'POST' });
  }

  /**
   * @description: File Upload 请求方法
   */
  upload(config) {
    const formData = new FormData();
    const isFormData = (value) => value instanceof FormData;

    if (!isFormData(config.data) && config.data) {
      Object.keys(config.data).forEach((key) => {
        formData.append(key, config.data[key]);
      });
    }

    return this.request({
      ...config,
      data: isFormData(config.data) ? config.data : formData,
      method: 'POST',
      headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' },
    });
  }
}
