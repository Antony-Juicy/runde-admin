import request from '@/utils/request'


export function getTroubleAll(data) {
  return request({
    url: 'trouble/getTroubleAll',
    method: 'post',
    data
  })
}
export function getTroublePage(data) {
  return request({
    url: 'trouble/getTroublePage',
    method: 'post',
    data
  })
}
export function setTrouble(data) {
  return request({
    url: 'trouble/setTrouble',
    method: 'post',
    data
  })
}
export function delTrouble(data) {
  return request({
    url: 'trouble/delTrouble',
    method: 'post',
    data
  })
}
export function addTrouble(data) {
  return request({
    url: 'trouble/addTrouble',
    method: 'post',
    data
  })
}


export function getNewsAll(data) {
  return request({
    url: 'news/getNewsAll',
    method: 'post',
    data
  })
}
export function getNewsPage(data) {
  return request({
    url: 'news/getNewsPage',
    method: 'post',
    data
  })
}
export function setNews(data) {
  return request({
    url: 'news/setNews',
    method: 'post',
    data
  })
}
export function delNews(data) {
  return request({
    url: 'news/delNews',
    method: 'post',
    data
  })
}
export function addNews(data) {
  return request({
    url: 'news/addNews',
    method: 'post',
    data
  })
}


export function getInformationAll(data) {
  return request({
    url: 'information/getInformationAll',
    method: 'post',
    data
  })
}
export function getInformationPage(data) {
  return request({
    url: 'information/getInformationPage',
    method: 'post',
    data
  })
}
export function setInformation(data) {
  return request({
    url: 'information/setInformation',
    method: 'post',
    data
  })
}
export function delInformation(data) {
  return request({
    url: 'information/delInformation',
    method: 'post',
    data
  })
}
export function addInformation(data) {
  return request({
    url: 'information/addInformation',
    method: 'post',
    data
  })
}


export function getTeacherAll(data) {
  return request({
    url: 'page/getTeacherAll',
    method: 'post',
    data
  })
}
export function getTeacherPage(data) {
  return request({
    url: 'teacher/getTeacherPage',
    method: 'post',
    data
  })
}
export function setTeacher(data) {
  return request({
    url: 'teacher/setTeacher',
    method: 'post',
    data
  })
}
export function delTeacher(data) {
  return request({
    url: 'teacher/delTeacher',
    method: 'post',
    data
  })
}
export function addTeacher(data) {
  return request({
    url: 'teacher/addTeacher',
    method: 'post',
    data
  })
}


export function getBookAll(data) {
  return request({
    url: 'book/getBookAll',
    method: 'post',
    data
  })
}
export function getBookPage(data) {
  return request({
    url: 'book/getBookPage',
    method: 'post',
    data
  })
}
export function setBook(data) {
  return request({
    url: 'book/setBook',
    method: 'post',
    data
  })
}
export function delBook(data) {
  return request({
    url: 'book/delBook',
    method: 'post',
    data
  })
}
export function addBook(data) {
  return request({
    url: 'book/addBook',
    method: 'post',
    data
  })
}