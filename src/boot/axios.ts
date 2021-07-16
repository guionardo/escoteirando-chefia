import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export const proxyURL:string = (process.env.PROXY_URL || 'https://mappa-proxy.herokuapp.com')


axios.defaults.baseURL = `${proxyURL}/mappa/` //'http://mappa.escoteiros.org.br';
axios.defaults.headers = {
  'User-Agent': 'okhttp/3.4.1'
};

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});

export const setAxiosAuth = (auth: string) => {
  axios.defaults.headers = {
    'User-Agent': 'okhttp/3.4.1',
    Authorization: auth
  };
};

