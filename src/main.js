import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import RdTable from '@/components/RdTable' // ElDataTable
import RdDialog from '@/components/RdDialog' // ElDataTable
import ElFormRenderer from '@femessage/el-form-renderer' // render El Form
import Album from '@/components/Album/index.vue'
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import Fetch from '@/utils/fetch'
import '@/utils/directives/preventReClick'
import '@/utils/directives/btnPermission'

import '@/icons' // icon
import '@/permission' // 路由守卫
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
Vue.component('rd-table', RdTable)
Vue.component('rd-dialog', RdDialog)
Vue.component('el-album', Album)

Vue.config.productionTip = false

Vue.prototype.$fetch = Fetch
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
