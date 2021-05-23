import { route } from 'quasar/wrappers';
import { Logger } from 'src/services/logger';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import routes from './routes';
import { mappaStore } from 'src/store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const logger = new Logger('Router');

export default route<Store<unknown>>(function({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  // Router.beforeEach(async (to, from, next) => {
  //   await mappaStore.getAuthFromLocalStorage();

  //   if (mappaStore.isAuthorized) {
  //     if (to.name == 'login') {
  //       logger.logDebug('User is logged. Login denied');
  //       next({ path: '/' }); // false
  //       return;
  //     }
  //     next();
  //   } else {
  //     logger.logDebug('User is not logged. Redirect to login');
  //     next('login');
  //   }
  // });
  return Router;
});
