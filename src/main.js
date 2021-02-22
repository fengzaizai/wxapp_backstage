import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Axios from 'axios'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
 
Vue.config.productionTip = false


// Vue.use(Axios)
Vue.prototype.$axios = Axios
Vue.use(elementUi)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
