import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由守卫

import RdTable from '@/components/RdTable' // ElDataTable
import RdDialog from '@/components/RdDialog' // ElDataTable
import searchForm from "@/components/Searchform";
import fullDialog from "@/components/FullDialog";
import RdForm from "@/components/RdForm";

import Fetch from '@/utils/fetch'
import Common from '@/utils/common'
import Filters from '@/utils/filters'
import '@/utils/directives/preventReClick'
import '@/utils/directives/btnPermission'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.component('rd-table', RdTable)
Vue.component('rd-dialog', RdDialog)
Vue.component('search-form',searchForm)
Vue.component('full-dialog',fullDialog)
Vue.component('rd-form',RdForm)

Vue.config.productionTip = false

Vue.prototype.$fetch = Fetch
Vue.prototype.$common = Common
Vue.prototype.$Bus = new Vue();
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
