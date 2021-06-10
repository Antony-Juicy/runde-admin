import router, { resetRouter } from '@/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/live-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // 如果是直播中转页 不需要鉴权
  if(to.path == '/live-redirect'){
    next()
  }
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        if (to.meta.noroles) {
          next('/401')
        }
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 获取用户信息 设置用户权限
          await store.dispatch('user/getInfo')
          
          if(to.path != '/live-redirect'){
             //如果不是直播中转页，就调取接口 获取路由信息
            await store.dispatch('permission/getRoutesInfo')
          }
          let type, pathObj;
          if(localStorage.getItem('clickMenu')) {
            type = localStorage.getItem('tabIndex') || 0;
            pathObj = { ...to, replace: true }
          }else if(to.path == '/live-redirect'){
            type = 0;
            const { path,query } = to;
            pathObj = { path,query }
          }else{
            type = 0;
            pathObj = { path: '/' }
          }
          const accessRoutes = await store.dispatch('permission/generateRoutes',{type})
          resetRouter()
          router.addRoutes(accessRoutes)
          next(pathObj)

          NProgress.done()
        } catch (error) {
          console.log(11111111)
          // remove token and go to login page to re-login
          let loginType = localStorage.getItem('loginType')
          let url = `/login?redirect=${to.path}`
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 如果是从旧系统跳转过来的 过期跳回旧大教务
          if(loginType == 0){
            url = 'http://jiaowu.rundejy.com/'
          }
          next(url)
          NProgress.done()
        }
        
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, form) => {
  NProgress.done()
})
