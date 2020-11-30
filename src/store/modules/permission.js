import { asyncRoutes0, constantRoutes } from '@/router'
import Fetch from '@/utils/fetch'
import Layout from '@/layout'
import axios from 'axios'
import router from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(checkRoutes, route) {
  // return true;
  if (route.meta && route.path) {
    return checkRoutes.find(item => item.path == route.path)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, checkRoutes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }  //前端配置的路由
    const per = hasPermission(checkRoutes, tmp) //后台匹配到的路由
    if (per) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, checkRoutes)
      }
      if (tmp.meta) {
        tmp.meta.title = per.title;
      }
      res.push(tmp)
    } else {
      tmp.hidden = false
      tmp.meta.noroles = true
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, checkRoutes)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  moduleRoutes: [],  //顶级模块导航
  btnRoutes: [],  // 按钮
  processedRoutes: [], //拿去过滤匹配的路由
  menuList: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes      //动态的路由
    state.routes = constantRoutes.concat(routes)   //所有的路由
  },
  SET_MODULES: (state, routes) => {
    state.moduleRoutes = routes;
  },
  SET_BTNROUTES: (state, routes) => {
    state.btnRoutes = routes;
  },
  SET_PROCESSEDROUTES: (state, routes) => {
    state.processedRoutes = routes;
  },
  SET_MENULIST: (state, routes) => {
    state.menuList = routes;
  }
}

const actions = {
  async generateRoutes({ commit }, { type }) {
    return new Promise(async (resolve) => {

      //定义子的路由
      let moduleRoutes = JSON.parse(JSON.stringify(state.moduleRoutes))
      let currentRoutes = moduleRoutes.find(item => item.id == type) && moduleRoutes.find(item => item.id == type).children;

      let index = 0;
      function trans(currentRoutes, index) {
        index = index + 1;
        currentRoutes.forEach(item => {
          item.path = item.frontUrl;
          item.meta = {
            id: item.id,
            title: item.name,
            fullPath: item.frontUrl,
            icon: item.icon
          }
          item.name = item.frontUrl + '?' + new Date().getTime()
          if (item.children && item.children.length) {
            if (index == 1) {
              item.component = Layout;
            } else {
              item.component = (resolve) => require([`@/views/${item.meta.fullPath}`], resolve)
            }
            trans(item.children, index)
          } else {
            item.component = (resolve) => require([`@/views/${item.meta.fullPath}`], resolve)
          }
          if (item.path && item.path.indexOf('/') != 0) {
            item.path = '/' + item.path;
          }
        })
      }
      if (currentRoutes) {
        trans(currentRoutes, index)
      } else {
        currentRoutes = asyncRoutes0
      }


      currentRoutes.push({ path: '*', redirect: '/404', hidden: true, children: [] })
      console.log(currentRoutes, 'currentRoutes----')
      // 定义的路由信息： asyncRoutes    后台返回的路由信息：routes
      // const accessedRoutes = filterAsyncRoutes(currentRoutes, state.processedRoutes)
      const accessedRoutes = currentRoutes
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  async getRoutesInfo({ commit }) {
    return new Promise(async (resolve) => {
      try {
        // const { data } = await Fetch('user_getMenuList', {
        //   loginUserId: JSON.parse(localStorage.getItem('userInfo')).userId,
        //   type: 0
        // })
        const { data } = await axios.get('/json/menu.json')
        let menuList = data.data.records;
        let processedRoutes = []
        let btnRoutes = []
        commit('SET_MENULIST', menuList)
        commit('SET_PROCESSEDROUTES', processedRoutes)
        commit('SET_BTNROUTES', btnRoutes)
        let menuRouters = []
        /*先取出模块，没有父id的就是模块菜单*/
        menuRouters = menuList[0].children.map(m => {
          return {
            path: '/' + m.frontUrl,
            id: m.id,
            title: m.name,
            fullPath: '/' + m.frontUrl,
            children: m.children,
            meta: {
              id: m.id,
              title: m.name,
              fullPath: '/' + m.frontUrl
            }
          }
        })
        menuRouters.unshift({
          path: '/dashboard',
          title: '首页',
          fullPath: '/dashboard',
          id: -1,
          meta: {
            id: -1,
            title: '首页'
          }
        })
        commit('SET_MODULES', menuRouters)

        resolve()
      } catch (err) {
        router.push(`/login`)
      }
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
