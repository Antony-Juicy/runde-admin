import api from '@/api'
import md5 from 'md5-js'
import qs from 'querystring'
const {
  getTdkAll,
  getTdkPage,
  addTdk,
  setTdk,
  delTdk,

  getNavMenuPage,
  addNavMenu,
  setNavMenu,
  delNavMenu,
  getFooterMenuPage,
  getFriendMenuAll,
  getFriendMenuPage,

  getCarouselPage,
  addCarousel,
  setCarousel,
  delCarousel,
  getClassifyPage,
  addClassify,
  setClassify,
  delClassify,
  getClassifyAll,
  getCourseIdAndNameAll,
  setExaminationTime,
  
  getExaminationTimeAll,
  getPinYinJianCheng,
  oneKeyMakeUrl
} = api['website-config']

const state = {}

const actions = {
  getTdkAll({ }, data) {
    return new Promise((resolve, reject) => {
      getTdkAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取页面分页列表
  getTdkPage({ }, data) {
    return new Promise((resolve, reject) => {
      getTdkPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加页面
  addTdk({ }, data) {
    return new Promise((resolve, reject) => {
      addTdk(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改页面
  setTdk({ }, data) {
    return new Promise((resolve, reject) => {
      setTdk(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除页面
  delTdk({ }, data) {
    return new Promise((resolve, reject) => {
      delTdk(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取导航栏分页列表
  getNavMenuPage({ }, data) {
    return new Promise((resolve, reject) => {
      getNavMenuPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加导航栏
  addNavMenu({ }, data) {
    return new Promise((resolve, reject) => {
      addNavMenu(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改导航栏
  setNavMenu({ }, data) {
    return new Promise((resolve, reject) => {
      setNavMenu(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除导航栏
  delNavMenu({ }, data) {
    return new Promise((resolve, reject) => {
      delNavMenu(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取底部链接
  getFooterMenuPage({ }, data) {
    return new Promise((resolve, reject) => {
      getFooterMenuPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取友情链接
  getFriendMenuPage({ }, data) {
    return new Promise((resolve, reject) => {
      getFriendMenuPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取友情链接全部
  getFriendMenuAll({ }, data) {
    return new Promise((resolve, reject) => {
      getFriendMenuAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取轮播图分页列表
  getCarouselPage({ }, data) {
    return new Promise((resolve, reject) => {
      getCarouselPage(data).then(response => {
        response.data.list = response.data.list.map(item => {
          item.content = JSON.parse(item.content || '[]')
          return item
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加轮播图
  addCarousel({ }, data) {
    data.content = JSON.stringify(data.content)
    return new Promise((resolve, reject) => {
      addCarousel(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改轮播图
  setCarousel({ }, data) {
    data.content = JSON.stringify(data.content)
    return new Promise((resolve, reject) => {
      setCarousel(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除轮播图
  delCarousel({ }, data) {
    return new Promise((resolve, reject) => {
      delCarousel(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getClassifyAll({ }, data) {
    return new Promise((resolve, reject) => {
      getClassifyAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取分类分页列表
  getClassifyPage({ }, data) {
    return new Promise((resolve, reject) => {
      getClassifyPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加分类
  addClassify({ }, data) {
    return new Promise((resolve, reject) => {
      addClassify(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改分类
  setClassify({ }, data) {
    return new Promise((resolve, reject) => {
      setClassify(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除分类
  delClassify({ }, data) {
    return new Promise((resolve, reject) => {
      delClassify(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取课程ID和名称列表
  getCourseIdAndNameAll({ }, data) {
    return new Promise((resolve, reject) => {
      getCourseIdAndNameAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 设置倒计时
  setExaminationTime({ }, data) {
    return new Promise((resolve, reject) => {
      setExaminationTime(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
    // 获取倒计时列表
    getExaminationTimeAll({ }, data) {
      return new Promise((resolve, reject) => {
        getExaminationTimeAll(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取分类的拼音
    getPinYinJianCheng({ }, data) {
      return new Promise((resolve, reject) => {
        getPinYinJianCheng(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 一键生成路径接口
    oneKeyMakeUrl({ }, data) {
      return new Promise((resolve, reject) => {
        oneKeyMakeUrl(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }


}

export default {
  namespaced: true,
  actions
}
