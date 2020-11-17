import Cookies from 'js-cookie'

import {
  uploadFile,
  getSpaceImage,
  getArea
} from '@/api'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  albumDialog: false,
  albumDialogCallback: null,
  albumOptions: null
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_ALBUM: (state, albumDialog) => {
    state.albumDialog = albumDialog.type
    if (albumDialog.type) {
      state.albumDialogCallback = albumDialog.fn
      state.albumOptions = albumDialog.options
    } else {
      state.albumDialogCallback(albumDialog.data)
    }
  }
}

const actions = {
  toggleSideBar({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  openAlbum({
    commit
  }, data) {
    commit('TOGGLE_ALBUM', {
      type: true,
      fn: data.success,
      options: data
    })
  },
  submitAlbum({
    commit
  }, data) {
    commit('TOGGLE_ALBUM', {
      type: false,
      data
    })
  },
  uploadFile({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      uploadFile(data).then(response => {
        const {
          data,
          msg
        } = response
        resolve({
          file: data.filePath,
          msg
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  getSpaceImage({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      getSpaceImage(data).then(response => {
        resolve({
          ...response.data
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  getArea({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      getArea(data).then(response => {
        resolve({
          ...response.data
        })
      }).catch(error => {
        reject(error)
      })
    })
  }
}
getSpaceImage

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
