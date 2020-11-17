import api from '@/api'
const {
  getCourseIdAndNameAll,
  getCourseAll,
  getCoursePage,
  addCourse,
  setCourse,
  delCourse,
} = api['course-management']

const state = {}


const actions = {
  getCourseIdAndNameAll({ }, data) {
    return new Promise((resolve, reject) => {
      getCourseIdAndNameAll(data).then(response => {

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCourseAll({ }, data) {
    return new Promise((resolve, reject) => {
      getCourseAll(data).then(response => {
        response.data.list = response.data.list.map(item => {
          item.liveTime = item.liveTime ? JSON.parse(item.liveTime) : '[]'
          return item;
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getCoursePage({ }, data) {
    return new Promise((resolve, reject) => {
      getCoursePage(data).then(response => {
        response.data.list = response.data.list.map(item => {
          item.liveTime = item.liveTime ? JSON.parse(item.liveTime) : '[]'
          return item;
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addCourse({ }, data) {
    data.liveTime = data.liveTime ? JSON.stringify(data.liveTime) : '[]'
    return new Promise((resolve, reject) => {
      addCourse(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setCourse({ }, data) {
    data.liveTime = data.liveTime ? JSON.stringify(data.liveTime) : '[]'
    return new Promise((resolve, reject) => {
      setCourse(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delCourse({ }, data) {
    return new Promise((resolve, reject) => {
      delCourse(data).then(response => {
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
