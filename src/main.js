import Vue from 'vue'
import App from './App.vue'
import {store} from './store';
import lodash from 'lodash';   
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

Vue.config.productionTip = false;

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')
