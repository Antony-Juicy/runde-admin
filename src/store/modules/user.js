import api from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'md5-js';
import Fetch from '@/utils/fetch'
const { login, logout, getInfo, getUserInfo, setUserInfo, delUserInfo, explodeUserInfo } = api['user']

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  osscdn: '',
  userId:''
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
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {

      Fetch('user_login',{ username: username.trim(), password: md5(password) }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token) //在全局vuex中存入state
        setToken(data.token)   //把token存储在本地cookie之中
        commit('SET_NAME', data.username)  //用户名
        commit('SET_USERID', data.userId)  //密码

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      Fetch('user_getInfo',{
        // token: getToken(),
        token: 'rd_superadmin',
        id: state.userId,
        loginUserId: state.userId
      }).then(response => {
        console.log(response,'response')
        const { data } = response
        
        if (!data) {
          reject('验证失败,请重新登录')
        }

        commit('SET_ROLES', ['admin'])
        resolve({
          roles: ['admin'],
          routes: ''
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const a = ''
      // if (a) {
      //   logout()
      //   getInfo()
      // }
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      removeToken()
      resetRouter()
      resolve()

      return;
      logout().then((res) => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        commit('SET_ROLES', '')
        const { msg } = res
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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

  getUserInfo({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      getUserInfo(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setUserInfo({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      setUserInfo(data).then(response => {
        const { msg } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delUserInfo({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      delUserInfo(data).then(response => {
        const { msg } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  explodeUserInfo({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      explodeUserInfo(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

