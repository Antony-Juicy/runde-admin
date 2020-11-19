import Vue from 'vue'
import Router from 'vue-router'

const iceConfig = require('@/config/config.js')
Vue.use(Router)

import Layout from '@/layout'
import { log } from 'handlebars';

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
    children: [{
      path: '/dashboard',
      name: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎页', icon: 'dashboard' }
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


  let  asyncRoutes_yizhiquan = [
    {
      path: '/platform-management',
      component: Layout,
      redirect: '/platform-management/customer-service-settings',
      meta: { title: '平台管理', icon: 'example' },
      children: [
        {
          path: 'permission-settings',
          name: 'permission-settings',
          component: () => import('@/views/platform-management/permission-settings'),
          meta: { title: '权限设置', subtitle: '', icon: 'example' }
        },
        {
          path: 'permission-group-settings',
          name: 'permission-group-settings',
          component: () => import('@/views/platform-management/permission-group-settings'),
          meta: { title: '权限组设置', subtitle: '', icon: 'example' }
        }
      ]
    }, 
    {
      path: '/website-config',
      component: Layout,
      redirect: '/website-config/page-management',
      meta: { title: '网站配置', icon: 'example' },
      children: [
        {
          path: 'page-management',
          name: 'page-management',
          component: () => import('@/views/website-config/page-management'),
          meta: { title: '页面管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'banner-management',
          name: 'banner-management',
          component: () => import('@/views/website-config/banner-management'),
          meta: { title: '轮播图管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'classify-management',
          name: 'classify-management',
          component: () => import('@/views/website-config/classify-management'),
          meta: { title: '分类管理', subtitle: '', icon: 'example' }
        },
      ]
    },
    {
      path: '/error-management',
      component: Layout,
      redirect: '/log-management/error-management',
      meta: { title: '日志管理', icon: 'example' },
      children: [
        {
          path: 'error-management',
          name: 'error-management',
          component: () => import('@/views/log-management/error-management'),
          meta: { title: '错误日志', subtitle: '', icon: 'example' }
        },
        {
          path: 'handle-management',
          name: 'handle-management',
          component: () => import('@/views/log-management/handle-management'),
          meta: { title: '操作日志', subtitle: '', icon: 'example' }
        },
        {
          path: 'intercept-management',
          name: 'intercept-management',
          component: () => import('@/views/log-management/intercept-management'),
          meta: { title: '拦截日志', subtitle: '', icon: 'example' }
        },
        {
          path: 'visit-management',
          name: 'visit-management',
          component: () => import('@/views/log-management/visit-management'),
          meta: { title: '访问日志', subtitle: '', icon: 'example' }
        }
      ]
    },
    {
      path: '/doc-management',
      component: Layout,
      redirect: '/doc-management/news-management',
      meta: { title: '文档管理', icon: 'example' },
      children: [
        {
          path: 'information-management',
          name: 'information-management',
          component: () => import('@/views/doc-management/information-management'),
          meta: { title: '资讯管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ];
export const asyncRoutes = asyncRoutes_yizhiquan;
export default router;
