import api from '../../index';
import urls from './urls';
console.log(api)
export default {
  demo(params) {
    return api.get({ url: urls.readBuyList, params,retry: 3 });
  },
};
