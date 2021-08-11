import api from '../../index';
import urls from './urls';
export default {
  demo(params) {
    return api.get({ url: urls.readBuyList, params,retry: 3, routeChangeCancel: true});
  },

};
