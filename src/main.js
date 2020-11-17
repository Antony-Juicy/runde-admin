import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ElDataTable from '@/components/ElDataTable' // ElDataTable
import ElFormRenderer from '@femessage/el-form-renderer' // render El Form
import Album from '@/components/Album/index.vue'
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由守卫
const iceConfig = require('./config/config.js')
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI)
Vue.use(VCharts)

// use ElDataTable
Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)
Vue.component('el-album', Album)

Vue.config.productionTip = false

Vue.mixin({
	computed: {
		_config() {
			return iceConfig;
		}
	}
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
