import { asyncRoutes0, asyncRoutes1, asyncRoutes2,constantRoutes } from '@/router'
import Fetch from '@/utils/fetch'
import axios from 'axios'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(checkRoutes, route) {
  // return true;
  if (route.meta && route.path) {
    return checkRoutes.includes(route.path)
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
    const tmp = { ...route }
    if (hasPermission(checkRoutes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, checkRoutes)
      }
      res.push(tmp)
    } else {
      tmp.hidden = true
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
  moduleRoutes:[]
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes      //动态的路由
    state.routes = constantRoutes.concat(routes)   //所有的路由
  },
  SET_MODULES: (state, routes) => {
    state.moduleRoutes = routes;
  }
}

function transRouter(type){
  switch(type){
    case 0:
      return asyncRoutes0;
    case 1:
      return asyncRoutes1;
    case 2:
        return asyncRoutes2;
    default:
      return asyncRoutes0;
  }
}

const actions = {
  async generateRoutes({ commit },{type}) {
    return new Promise(async (resolve) => {
      const {data} = await axios.get('/json/menu.json')
      let menuList = data.data.records;
      let routes = JSON.stringify(menuList.map(item => item.frontUrl))
      let menuRouters = [] 
      /*先取出模块，没有父id的就是模块菜单*/
      menuList.forEach((m,i)=>{
        //console.log(i)
        if(m.parentId=="0"){
          m.fullPath = '/'+m.frontUrl
          let module = {
            path: '/' + m.frontUrl,
            id:m.id, 
            title:m.name, 
            fullPath:'/'+m.frontUrl
          }
          menuRouters.push(module)
        }
      })
      menuRouters.unshift({
        path:'/dashboard',
        title:'首页', 
        fullPath:'/dashboard'
      })
      console.log(menuRouters,'menuRouters---')
      commit('SET_MODULES',menuRouters)
      // 定义的路由信息： asyncRoutes    后台返回的路由信息：routes
      const accessedRoutes = filterAsyncRoutes(transRouter(Number(type)), routes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
