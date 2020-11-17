import api from '@/api'
import md5 from 'md5-js'
import qs from 'querystring'
const {
  getEmploymentPage,
  addEmployment,
  setEmployment,
  delEmployment,
} = api['business-config']

const state = {}


const actions = {
  // 获取招聘分页列表
  getEmploymentPage({},data) {
    return new Promise((resolve, reject) => {
      getEmploymentPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加招聘
  addEmployment({},data) {
    return new Promise((resolve, reject) => {
      addEmployment(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改招聘
  setEmployment({},data) {
    return new Promise((resolve, reject) => {
      setEmployment(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除招聘
  delEmployment({},data) {
    return new Promise((resolve, reject) => {
      delEmployment(data).then(response => {
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
