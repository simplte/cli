// 本地代理
let baseUrl = '/api';
let imgBaseUrl = '/imgapi';
let cmsBaseUrl = '/cmsBaseUrl';
/**
 * 启动命令，请求地址环境区分
 * npm run serve                    环境为development，走本地代理地址
 * npm run build:dev                sit环境
 * npm run build:pre                uat环境
 * npm run build:production         线上环境
 */
switch (process.env.NODE_ENV) {
  //TODO 现将地址改成这个
  case 'dev':
    baseUrl = ''; // 测试环境sit

    break;
  case 'pre':
    baseUrl = ''; // 预上线环境uat

    break;
  case 'production':
    baseUrl = ''; // 生产环境obt
    break;
}

export default {
  baseUrl,
};
