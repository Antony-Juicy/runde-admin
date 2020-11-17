import api from '@/api'
const {
  getTroubleAll,
  getTroublePage,
  addTrouble,
  setTrouble,
  delTrouble,

  getNewsAll,
  getNewsPage,
  addNews,
  setNews,
  delNews,

  getInformationAll,
  getInformationPage,
  addInformation,
  setInformation,
  delInformation,

  getTeacherAll,
  getTeacherPage,
  addTeacher,
  setTeacher,
  delTeacher,

  getBookAll,
  getBookPage,
  addBook,
  setBook,
  delBook,

} = api['doc-management']

const state = {}


const actions = {
  // 获取所有
  getTroubleAll({ }, data) {
    return new Promise((resolve, reject) => {
      getTroubleAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getTroublePage({ }, data) {
    return new Promise((resolve, reject) => {
      getTroublePage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addTrouble({ }, data) {
    return new Promise((resolve, reject) => {
      addTrouble(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setTrouble({ }, data) {
    return new Promise((resolve, reject) => {
      setTrouble(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delTrouble({ }, data) {
    return new Promise((resolve, reject) => {
      delTrouble(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有
  getNewsAll({ }, data) {
    return new Promise((resolve, reject) => {
      getNewsAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getNewsPage({ }, data) {
    return new Promise((resolve, reject) => {
      getNewsPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addNews({ }, data) {
    return new Promise((resolve, reject) => {
      addNews(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setNews({ }, data) {
    return new Promise((resolve, reject) => {
      setNews(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delNews({ }, data) {
    return new Promise((resolve, reject) => {
      delNews(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有
  getInformationAll({ }, data) {
    return new Promise((resolve, reject) => {
      getInformationAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getInformationPage({ }, data) {
    return new Promise((resolve, reject) => {
      getInformationPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addInformation({ }, data) {
    return new Promise((resolve, reject) => {
      addInformation(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setInformation({ }, data) {
    return new Promise((resolve, reject) => {
      setInformation(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delInformation({ }, data) {
    return new Promise((resolve, reject) => {
      delInformation(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有
  getTeacherAll({ }, data) {
    return new Promise((resolve, reject) => {
      getTeacherAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getTeacherPage({ }, data) {
    return new Promise((resolve, reject) => {
      getTeacherPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addTeacher({ }, data) {
    return new Promise((resolve, reject) => {
      addTeacher(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setTeacher({ }, data) {
    return new Promise((resolve, reject) => {
      setTeacher(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delTeacher({ }, data) {
    return new Promise((resolve, reject) => {
      delTeacher(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有
  getBookAll({ }, data) {
    return new Promise((resolve, reject) => {
      getBookAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分页列表
  getBookPage({ }, data) {
    return new Promise((resolve, reject) => {
      getBookPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  addBook({ }, data) {
    return new Promise((resolve, reject) => {
      addBook(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  setBook({ }, data) {
    return new Promise((resolve, reject) => {
      setBook(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  delBook({ }, data) {
    return new Promise((resolve, reject) => {
      delBook(data).then(response => {
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
