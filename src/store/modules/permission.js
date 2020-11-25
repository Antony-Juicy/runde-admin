import { asyncRoutes0,constantRoutes  } from '@/router'
import Fetch from '@/utils/fetch'
import Layout from '@/layout'

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
      if(tmp.meta) {
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
  moduleRoutes:[],  //顶级模块导航
  btnRoutes:[],  // 按钮
  processedRoutes:[], //拿去过滤匹配的路由
  menuList:[]
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
  async generateRoutes({ commit },{type}) {
    return new Promise(async (resolve) => {
      
         //定义子的路由
         function convertTree(routers){
          routers.forEach(r=>{
            state.menuList.forEach((m,i)=>{
              if(m.parentId && m.type == "0" && m.parentId == r.meta.id){
                if(!r.children) r.children = []
                m.fullPath = m.frontUrl
                let menu = {
                  path: m.frontUrl,
                  name: m.frontUrl,
                  meta:{ 
                    id:m.id, 
                    title:m.name, 
                    fullPath: m.frontUrl,
                    icon: m.icon
                 }
                }
                if(!r.children.find(ele => ele.path == menu.path)){
                  r.children.push(menu)
                }
                
              }
            })
            if(r.children) convertTree(r.children)
          })
        }
        let moduleRoutes = JSON.parse(JSON.stringify(state.moduleRoutes))
        convertTree(moduleRoutes)

        let currentRoutes = moduleRoutes.find(item => item.id == type)&&moduleRoutes.find(item => item.id == type).children;
        function trans(currentRoutes){
          currentRoutes.forEach(item => {
            if(item.children&&item.children.length){
              item.component = Layout;
              trans(item.children)
            }else {
              item.component = (resolve) => require([`@/views/${item.meta.fullPath}`],resolve)
            }
            if(item.path.indexOf('-config') > 0 && item.path.indexOf('/') !=0 ) {
              item.path = '/' +item.path;
            }
          })
        }
        if(currentRoutes){
          trans(currentRoutes)
        }
        

        if(!currentRoutes){
          currentRoutes = asyncRoutes0
        }

      // 定义的路由信息： asyncRoutes    后台返回的路由信息：routes
      const accessedRoutes = filterAsyncRoutes(currentRoutes, state.processedRoutes)
      console.log( state.processedRoutes,' state.processedRoutes--')
      console.log(accessedRoutes,' accessedRoutes--')
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  async getRoutesInfo({ commit }) {
    return new Promise(async (resolve) => {
      const {data} = await Fetch('user_getMenuList',{
        currentPage: 1,
        pageSize: 999999,
        loginUserId: JSON.parse(localStorage.getItem('userInfo')).userId
      })
      let menuList = data.records;
      let processedRoutes = []
      let btnRoutes = []
      menuList.forEach(item => {
        // 是菜单 并且不是顶级导航栏
        if(item.type == "0" && item.parentId != "0"){
          processedRoutes.push({
            path: item.frontUrl.indexOf('-config') >0? '/'+ item.frontUrl : item.frontUrl,
            title: item.name
          })
        }else if(item.type == "1"){
          // 按钮
          btnRoutes.push(item.backUrl)
        }
      })
      commit('SET_MENULIST',menuList)
      commit('SET_PROCESSEDROUTES',processedRoutes)
      commit('SET_BTNROUTES',btnRoutes)
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
            fullPath:'/'+m.frontUrl,
            meta: {
              id:m.id, 
              title:m.name,
              fullPath:'/'+m.frontUrl
            }
          }
          menuRouters.push(module)
        }
      })
      menuRouters.unshift({
        path:'/dashboard',
        title:'首页', 
        fullPath:'/dashboard',
        id: -1,
        meta: {
          id:-1, 
          title:'首页'
        }
      })
      commit('SET_MODULES',menuRouters)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
