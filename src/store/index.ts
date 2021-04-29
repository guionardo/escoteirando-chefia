import Vuex from 'vuex';
import mappa from './MappaStoreModule';
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import MappaStoreModule from './MappaStoreModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    mappa
  },
  strict: !!process.env.DEBUGGING
});

export default store;

export const mappaStore = getModule(MappaStoreModule, store);
