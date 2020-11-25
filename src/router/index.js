import Vue from 'vue'
import Router from 'vue-router'

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

export let asyncRoutes0 = [
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
];

export let asyncRoutes1 = [
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
          meta: { title: '分类管理', subtitle: '', icon: 'example' }
        },
        
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ];

  export let asyncRoutes2 = [
    {
      path: '/bussines-config',
      component: Layout,
      redirect: '/bussines-config/activity-management',
      meta: { title: '营销管理', icon: 'example' },
      children: [
        {
          path: 'activity-management',
          name: 'activity-management',
          component: () => import('@/views/bussines-config/activity-management'),
          meta: { title: '活动管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'banner-management',
          name: 'banner-management',
          component: () => import('@/views/bussines-config/banner-management'),
          meta: { title: '海报管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ];
  export let asyncRoutes3 = [
    {
      path: '/ecommerce-config',
      component: Layout,
      redirect: '/ecommerce-config/ecommerce-management',
      meta: { title: '电商管理', icon: 'example' },
      children: [
        {
          path: 'partner-management',
          name: 'partner-management',
          component: () => import('@/views/ecommerce-moudle/ecommerce-config/partner-management'),
          // component: () => import('@/views/ecommerce-moudle/ecommerce-config/partner-management/test'),
          meta: { title: '合作方管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'shop-management',
          name: 'shop-management',
          component: () => import('@/views/ecommerce-moudle/ecommerce-config/shop-management'),
          meta: { title: '店铺管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    {
      path: '/booksEcommerce-config',
      component: Layout,
      redirect: '/ecommerce-moudle/bookecommerce-config/booksPartner-management',
      meta: { title: '图书电商管理', icon: 'example' },
      children: [
        {
          path: 'bookspartner-management',
          name: 'bookspartner-management',
          component: () => import('@/views/ecommerce-moudle/booksEcommerce-config/booksPartner-management'),
          meta: { title: '图书合作方管理', subtitle: '', icon: 'example' }
        },
        {
          path: 'booksshop-management',
          name: 'booksshop-management',
          component: () => import('@/views/ecommerce-moudle/booksEcommerce-config/booksShop-management'),
          meta: { title: '图书店铺管理', subtitle: '', icon: 'example' }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ];

export default router;
