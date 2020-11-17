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

  let asyncRoutes_rundejy= [
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
    }, {
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
          path: 'nav-management',
          name: 'nav-management',
          component: () => import('@/views/website-config/nav-management'),
          meta: { title: '导航栏管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'classify-management',
          name: 'classify-management',
          component: () => import('@/views/website-config/classify-management'),
          meta: { title: '分类管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'footernav-management',
          name: 'footernav-management',
          component: () => import('@/views/website-config/footernav-management'),
          meta: { title: '底部链接管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'link-management',
          name: 'link-management',
          component: () => import('@/views/website-config/link-management'),
          meta: { title: '友情链接管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'basic-management',
          name: 'basic-management',
          component: () => import('@/views/website-config/basic-management'),
          meta: { title: '基础管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'img-management',
          name: 'img-management',
          component: () => import('@/views/website-config/img-management'),
          meta: { title: '图片管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    {
      path: '/business-config',
      component: Layout,
      redirect: '/business-config/employment-management',
      meta: { title: '业务页面', icon: 'example' },
      children: [
        {
          path: 'employment-management',
          name: 'employment-management',
          component: () => import('@/views/business-config/employment-management'),
          meta: { title: '招聘管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    {
      path: '/chance-management',
      component: Layout,
      redirect: '/chance-management/custom-management',
      meta: { title: '机会管理', icon: 'example' },
      children: [
        {
          path: 'custom-management',
          name: 'custom-management',
          component: () => import('@/views/chance-management/custom-management'),
          meta: { title: '客户管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'customer-export',
          name: 'customer-export',
          component: () => import('@/views/chance-management/customer-export'),
          meta: { title: '导出Excel表', subtitle: '', icon: 'example' }
        }
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
          path: 'news-management',
          name: 'news-management',
          component: () => import('@/views/doc-management/news-management'),
          meta: { title: '新闻管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'information-management',
          name: 'information-management',
          component: () => import('@/views/doc-management/information-management'),
          meta: { title: '资讯管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'teacher-management',
          name: 'teacher-management',
          component: () => import('@/views/doc-management/teacher-management'),
          meta: { title: '教师管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'book-management',
          name: 'book-management',
          component: () => import('@/views/doc-management/book-management'),
          meta: { title: '图书管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'trouble-management',
          name: 'trouble-management',
          component: () => import('@/views/doc-management/trouble-management'),
          meta: { title: '疑难解答', subtitle: '', icon: 'example' }
        }
  
      ]
    },
    {
      path: '/course-management',
      component: Layout,
      redirect: '/course-management/course-management',
      meta: { title: '课程管理', icon: 'example' },
      children: [
        {
          path: 'course-management',
          name: 'course-management',
          component: () => import('@/views/course-management/course-management'),
          meta: { title: '课程管理', subtitle: '', icon: 'example' }
        }
  
      ]
    },
    { path: '*', redirect: '/404', hidden: true,children: [] }
  ]

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
export const asyncRoutes = (iceConfig.version === 'yizhiquan') ? asyncRoutes_yizhiquan :  asyncRoutes_rundejy;
export default router;
