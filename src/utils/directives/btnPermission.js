// 需要全局注入（即在main.js引入）
import Vue from 'vue'
import store from '@/store'
/**
 * 使用：v-permission="'resCode'"
 *   resCode 按钮资源（即路由path）
 * **/
Vue.directive('btnPermission', {
  inserted (el, vDir) {
    let btnPermission = store.getters.permission_btn
    if (vDir.value) {
      if (!btnPermission.includes(vDir.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
})