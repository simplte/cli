import qs from 'qs';
import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { isFunction } from 'lodash';
// 声明一个Map 用于存储每个请求的标识  和 取消函数
let pendingMap = new Map();

const getPendingUrl = (config) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

/**
 * 取消请求
 */
export class AxiosCanceler {
  /**
   * @description: 添加请求
   */
  addPending(config) {
    this.removePending(config);
    // 生成请求唯一标识
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果不存在就加进去
          const isRouteChangeCancel =
            config?.routeChangeCancel === undefined ? true : config.routeChangeCancel;
          pendingMap.set(url, [cancel, isRouteChangeCancel]);
        }
      });
  }
  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach(([cancel]) => {
      cancel && isFunction(cancel) && cancel();
    });
  }
  /**
   * @description: 路由改变，清空指定pending
   */
  removeRouterPending() {
    pendingMap.forEach(([cancel, routeChangeCancel]) => {
      if (routeChangeCancel) {
        console.log("路径改变取消请求")
        cancel && isFunction(cancel) && cancel();
      }
    });
    pendingMap.clear();
  }
  /**
   * @description: 移除请求
   */
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const [cancel] = pendingMap.get(url);
      cancel && cancel(config.url);
      pendingMap.delete(url);
    }
  }
  /**
   * @description: 重置
   */
  reset() {
    pendingMap = new Map();
  }
}

export const axiosCanceler = new AxiosCanceler();
