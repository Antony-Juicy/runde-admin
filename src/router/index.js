import Vue from 'vue'
import Router from 'vue-router'

//将路由重定向时的这个错误通过catch给捕获到
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location) && originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: '/dashboard',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/redirect', // 重定向路由
    // component: () => import('@/views/layout/components/Sidebar/redirect'), hidden: true
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/redirect')
    }]
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export let asyncRoutes0 = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon:'',
      title:'首页'
    },
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎页' }
    }]
  },
  // {
  //   path: '/img-management',
  //   component: Layout,
  //   redirect: '/img-management',
  //   meta: {
  //     icon:'',
  //     title:'test'
  //   },
  //   children: [{
  //     path: '/img-management',
  //     name: '/img-management',
  //     component: () => import('@/views/test'),
  //     meta: { title: 'test'}
  //   }]
  // }
];


export default router;
