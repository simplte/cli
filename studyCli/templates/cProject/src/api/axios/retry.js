/**
 * 请求重试机制
 * @param error HttpError
 * @return promise
 */

export function axiosRetry(error) {
  const { config } = error;
  if (!config?.retry) {
    return Promise.reject(error);
  }

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(error);
  }
  config.retryCount += 1;
  const backOff = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(config);
    }, 1000);
  });
  return backOff;
}
