import api from '../../index';
import urls from './urls';

export default {
  demo(params) {
    return api.post(urls.readBuyList, params);
  },
};
