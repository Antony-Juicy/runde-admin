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
  },
  // --------静态路由本地用-----------
  {
    path: '/my-chance',
    component: Layout,
    redirect: '/my-chance',
    hidden: true,
    children: [{
      path: '/my-chance',
      name: 'my-chance',
      component: () => import('@/views/crm-module/chance/my-chance'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/branch-school',
    component: Layout,
    redirect: '/branch-school',
    hidden: true,
    children: [{
      path: '/branch-school',
      name: 'branch-school',
      component: () => import('@/views/crm-module/chance/branch-school'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/province-school',
    component: Layout,
    redirect: '/province-school',
    hidden: true,
    children: [{
      path: '/province-school',
      name: 'province-school',
      component: () => import('@/views/crm-module/chance/province-school'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/activity-manage',
    component: Layout,
    redirect: '/activity-manage',
    hidden: true,
    children: [{
      path: '/activity-manage',
      name: 'activity-manage',
      component: () => import('@/views/activity-module/marketing/activity-manage'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/call-records',
    component: Layout,
    redirect: '/call-records',
    hidden: true,
    children: [{
      path: '/call-records',
      name: 'call-records',
      component: () => import('@/views/crm-module/chance/call-records'),
      meta: { title: '欢迎页' }
    }]
  },
  {
    path: '/live',
    component: Layout,
    redirect: '/live',
    hidden: true,
    children: [
      {
        path: '/live',
        name: 'live',
        component: () => import('@/views/weapp-module/live'),
        meta: { title: '欢迎页' }
      },
    ]
  },
  {
    path: '/live-goods',
    component: Layout,
    redirect: '/live-goods',
    hidden: true,
    children: [
      {
        path: '/goods-list',
        name: '/goods-list',
        component: () => import('@/views/weapp-module/live-goods/goods-list'),
        meta: { title: '商品列表' }
      }
    ]
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
