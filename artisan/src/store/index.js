import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/User';
import Drawer from './modules/Drawer';
import Sidebar from './modules/Sidebar';
import PageTabs from './modules/PageTabs';

import Tree from './modules/Tree';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
    Drawer,
    Sidebar,
    Tree,

    PageTabs,
  },
  getters,
});

export default store;
