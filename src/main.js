import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import * as ecStat from 'echarts-stat'

// 注册ElementUI组件
Vue.use(ElementUI)

// 将echarts挂载到Vue原型上，这样所有组件都可以通过this.$echarts访问
Vue.prototype.$echarts = echarts
// 将ecStat挂载到Vue原型上，用于数据统计分析功能
Vue.prototype.ecStat = ecStat

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
