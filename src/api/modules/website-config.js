import request from '@/utils/request'

export function getTdkAll(data) {
  return request({
    url: 'tdkInfo/getTdkInfoAll',
    method: 'post',
    data
  })
}
export function getTdkPage(data) {
  return request({
    url: 'tdkInfo/getTdkInfoPage',
    method: 'post',
    data
  })
}
export function setTdk(data) {
  return request({
    url: 'tdkInfo/setTdkInfo',
    method: 'post',
    data
  })
}
export function delTdk(data) {
  return request({
    url: 'tdkInfo/delTdkInfo',
    method: 'post',
    data
  })
}
export function addTdk(data) {
  return request({
    url: 'tdkInfo/addTdkInfo',
    method: 'post',
    data
  })
}
export function getNavMenuPage(data) {
  return request({
    url: 'navMenu/getNavMenuPage',
    method: 'post',
    data
  })
}
export function getFriendMenuPage(data) {
  return request({
    url: 'navMenu/getFriendMenuPage',
    method: 'post',
    data
  })
}
export function getFriendMenuAll(data) {
  return request({
    url: 'navMenu/getFriendMenuAll',
    method: 'post',
    data
  })
}
export function setNavMenu(data) {
  return request({
    url: 'navMenu/setNavMenu',
    method: 'post',
    data
  })
}
export function delNavMenu(data) {
  return request({
    url: 'navMenu/delNavMenu',
    method: 'post',
    data
  })
}
export function addNavMenu(data) {
  return request({
    url: 'navMenu/addNavMenu',
    method: 'post',
    data
  })
}

export function getFooterMenuPage(data) {
  return request({
    url: 'navMenu/getFooterMenuPage',
    method: 'post',
    data
  })
}

export function getCarouselPage(data) {
  return request({
    url: 'carousel/getCarouselPage',
    method: 'post',
    data
  })
}
export function setCarousel(data) {
  return request({
    url: 'carousel/setCarousel',
    method: 'post',
    data
  })
}
export function delCarousel(data) {
  return request({
    url: 'carousel/delCarousel',
    method: 'post',
    data
  })
}
export function addCarousel(data) {
  return request({
    url: 'carousel/addCarousel',
    method: 'post',
    data
  })
}

export function getClassifyAll(data) {
  return request({
    url: 'classify/getClassifyAll',
    method: 'post',
    data
  })
}
export function getClassifyPage(data) {
  return request({
    url: 'classify/getClassifyPage',
    method: 'post',
    data
  })
}
export function setClassify(data) {
  return request({
    url: 'classify/setClassify',
    method: 'post',
    data
  })
}
export function delClassify(data) {
  return request({
    url: 'classify/delClassify',
    method: 'post',
    data
  })
}
export function addClassify(data) {
  return request({
    url: 'classify/addClassify',
    method: 'post',
    data
  })
}
export function setExaminationTime(data) {
  return request({
    url: 'setExaminationTime',
    method: 'post',
    data
  })
}
export function getExaminationTimeAll(data) {
  return request({
    url: 'getExaminationTimeAll',
    method: 'post',
    data
  })
}
export function getPinYinJianCheng(data) {
  return request({
    url: 'classify/getPinYinJianCheng',
    method: 'post',
    data
  })
}
export function oneKeyMakeUrl(data) {
  return request({
    url: 'classify/oneKeyMakeUrl',
    method: 'post',
    data
  })
}




