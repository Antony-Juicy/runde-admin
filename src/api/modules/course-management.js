import request from '@/utils/request'


export function getCourseIdAndNameAll(data) {
  return request({
    url: 'course/getCourseIdAndNameAll',
    method: 'post',
    data
  })
}
export function getCourseAll(data) {
  return request({
    url: 'course/getCourseAll',
    method: 'post',
    data
  })
}
export function getCoursePage(data) {
  return request({
    url: 'course/getCoursePage',
    method: 'post',
    data
  })
}
export function setCourse(data) {
  return request({
    url: 'course/setCourse',
    method: 'post',
    data
  })
}
export function delCourse(data) {
  return request({
    url: 'course/delCourse',
    method: 'post',
    data
  })
}
export function addCourse(data) {
  return request({
    url: 'course/addCourse',
    method: 'post',
    data
  })
}
