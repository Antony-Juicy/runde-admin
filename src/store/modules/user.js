import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'md5-js';
import Fetch from '@/utils/fetch'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  osscdn: '',
  userId:'',
  endLoading: 0,
  endText:"暂无数据"
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_OSSCDN: (state, osscdn) => {
    state.osscdn = osscdn
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_TABLE_IMAGE: (state, endLoading) => {
    state.endLoading = endLoading
  },
  SET_TABLE_TEXT: (state, endText) => {
    state.endText = endText
  },
}

const actions = {
  // 公共表格无数据时图片显示
  setTableImg({commit},data){
    commit('SET_TABLE_IMAGE', data)
  },
  // 公共表格无数据时文字显示
  setTableText({commit},data){
    commit('SET_TABLE_TEXT', data)
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password, VerifyCode, slatkey } = userInfo
    return new Promise((resolve, reject) => {

      Fetch('user_login',{ username: username.trim(), password: md5(password), code: VerifyCode, slatkey }).then(response => {

        const { data } = response

        console.log(data)
        commit('SET_TOKEN', data.token) //在全局vuex中存入state
        setToken(data.token)   //把token存储在本地cookie之中
        commit('SET_NAME', data.username)  //用户名
        commit('SET_USERID', data.userId)  //用户id
        localStorage.setItem('userInfo',JSON.stringify(data));
        localStorage.setItem('loginUserId',data.userId);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 直播跳转链接的登录方式
  loginLive({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const data = userInfo
        console.log(data,'data---')
        commit('SET_TOKEN', data.token) //在全局vuex中存入state
        setToken(data.token)   //把token存储在本地cookie之中
        commit('SET_NAME', data.username)  //用户名
        commit('SET_USERID', data.userId)  //用户id
        localStorage.setItem('userInfo',JSON.stringify(data));
        localStorage.setItem('loginUserId',data.userId);
        resolve();
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin']
      }
      commit('SET_ROLES', data.roles)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      Fetch('user_logout',{
        loginUserId: JSON.parse(localStorage.getItem('userInfo')).userId
      }).then((res) => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        commit('SET_ROLES', '')
        localStorage.clear()
        dispatch('tagsView/delAllViews', null, { root: true })
        const { msg } = res
        resolve(msg)
      }).catch(error => {
        // reject(error)
        //即使注销失败也照样清数据退出来
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        commit('SET_ROLES', '')
        localStorage.clear()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit, dispatch }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      dispatch('tagsView/delAllViews', null, { root: true })
      localStorage.clear()
      resolve()
    })
  },

  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

