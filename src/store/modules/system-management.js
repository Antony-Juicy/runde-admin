import api from '@/api'
import md5 from 'md5-js'
import qs from 'querystring'
const {
  setAdminGroup,
  getAdminGroup,
  addPlatformAdminGroup,
  delPlatformAdminGroup,
  getPlatformAdmin,
  addPlatformAdminAccount,
  getPlatformAdminAccount,
  delPlatformAdminAccount,
  setPlatformAdminAccount,

  getErrorLogPage,
  getAdminLogPage,
  getIpInfoLogPage,
  getPublicLogPage,

} = api['system-management']

const state = {}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 获取管理员信息
  getPlatformAdmin() {
    return new Promise((resolve, reject) => {
      getPlatformAdmin().then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增管理员
  addPlatformAdminAccount({
    commit
  }, data) {
    const {
      userAccount,
      pwd,
      avatar,
      userName,
      admin_group_id
    } = data
    return new Promise((resolve, reject) => {
      addPlatformAdminAccount({
        userAccount: userAccount,
        password: md5(pwd),
        // avatar: '',
        userName: userName,
        groupId: admin_group_id
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取管理员
  getPlatformAdminAccount({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getPlatformAdminAccount().then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除管理员
  delPlatformAdminAccount({
    commit
  }, data) {
    const {
      id
    } = data
    return new Promise((resolve, reject) => {
      delPlatformAdminAccount({
        id
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改管理员
  setPlatformAdminAccount({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      setPlatformAdminAccount({
        ...data,
        password: md5(data.password)
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增权限组
  addPlatformAdminGroup({
    commit
  }, data) {
    const {
      groupName,
      vueRouter
    } = data
    return new Promise((resolve, reject) => {
      addPlatformAdminGroup({
        groupName,
        vueRouter
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改权限组
  setAdminGroup({
    commit
  }, groupInfo) {
    const {
      vueRouter,
      groupId,
      groupName
    } = groupInfo
    return new Promise((resolve, reject) => {
      setAdminGroup({
        vueRouter: JSON.stringify(vueRouter),
        groupId,
        groupName
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取权限组信息
  getAdminGroup() {
    return new Promise((resolve, reject) => {
      getAdminGroup().then(response => {
        let {
          data
        } = response
        data.list = data.list.map(item => {
          item.name = item.groupName
          // item.routes = []
          item.routes = JSON.parse(item.vueRouter)
          return item
        })
        console.log(data.list)
        resolve(data.list)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除权限组
  delPlatformAdminGroup({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      delPlatformAdminGroup({
        groupId: data
      }).then(response => {
        const {
          msg
        } = response
        resolve(msg)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取错误日志分页列表
  getErrorLogPage({commit}, data) {
    return new Promise((resolve, reject) => {
      getErrorLogPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取操作日志分页列表
  getAdminLogPage({commit}, data) {
    return new Promise((resolve, reject) => {
      getAdminLogPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取拦截日志分页列表
  getIpInfoLogPage({commit}, data) {
    return new Promise((resolve, reject) => {
      getIpInfoLogPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取访问日志分页列表
  getPublicLogPage({commit}, data) {
    return new Promise((resolve, reject) => {
      getPublicLogPage(data).then(response => {
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
