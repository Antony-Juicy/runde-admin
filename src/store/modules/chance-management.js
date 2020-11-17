import api from '@/api'
const {
  getCustomerAll,
  getCustomerPage,
  addCustomer,
  setCustomer,
  delCustomer,
} = api['chance-management']

const state = {}


const actions = {
  getCustomerAll({ }, data) {
    return new Promise((resolve, reject) => {
      getCustomerAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getCustomerPage({ }, data) {
    return new Promise((resolve, reject) => {
      getCustomerPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addCustomer({ }, data) {
    return new Promise((resolve, reject) => {
      addCustomer(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setCustomer({ }, data) {
    return new Promise((resolve, reject) => {
      setCustomer(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delCustomer({ }, data) {
    return new Promise((resolve, reject) => {
      delCustomer(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  actions
}
