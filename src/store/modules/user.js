import api from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'md5-js';

const { login, logout, getInfo, getUserInfo, setUserInfo, delUserInfo, explodeUserInfo } = api['user']

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  osscdn: ''
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
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const appId = 'cc83f3dd7c45afce86f802903ad715b8';
      const appKey = '328adda459d6d4d4bf9a94eae2ebf307';
      const timestamp = parseInt(new Date().getTime() / 1000);
      let sign = `userAccount=${username.trim()}password=${md5(password)}timestamp=${timestamp}appId=${appId}appKey=${appKey}`
      sign = sign.toUpperCase()
      // sign = md5(sign);

      login({ userAccount: username.trim(), password: md5(password) }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token) //在全局vuex中存入state
        setToken(data.token)   //把token存储在本地cookie之中
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getToken()).then(response => {
        commit('SET_OSSCDN', response.osscdn)
        const { data } = response

        if (!data) {
          reject('验证失败,请重新登录')
        }

        const { userName, avatar, vueRouter } = data
        commit('SET_NAME', userName)
        commit('SET_ROLES', ['admin'])
        commit('SET_AVATAR', state.osscdn + avatar)
        resolve({
          roles: ['admin'],
          routes: vueRouter
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

