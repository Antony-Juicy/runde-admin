import { Loading } from 'element-ui'
import Store from '@/store'
let loadingCount = 0
let loading

const startLoading = () => {
  loading = Loading.service({
    // lock: true,
    // text: '加载中……',
    background: 'rgba(0, 0, 0, 0.2)'
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = () => {
  if (loadingCount === 0) {
    Store.dispatch("user/setTableImg",0) //隐藏表格图片
    startLoading()
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    
    endLoading()
    Store.dispatch("user/setTableImg",1) //显示表格图片

  }
}