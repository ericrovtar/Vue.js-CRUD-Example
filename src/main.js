// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import { store } from './store/index';

import _string from './includes/string';
import _array from './includes/array';

var vueSmoothScroll = require('vue-smoothscroll');
Vue.use(vueSmoothScroll);

var scrollToTop = require('./plugins/scrollToTop');
Vue.use(scrollToTop);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App },
  methods: {
    scrollToTop() {
      let top = document.getElementById("app");
      this.$SmoothScroll(top);
    }
  }
})
