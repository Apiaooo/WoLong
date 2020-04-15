import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'

//导入全局样式
import '../src/assets/css/global.css'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(config => {
  return config
  }, error => { 
  return Promise.reject(error)
})

