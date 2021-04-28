import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

axios.defaults.baseURL = 'https://mappa.escoteiros.org.br';
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

