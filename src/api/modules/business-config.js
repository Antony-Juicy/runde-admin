import request from '@/utils/request'


export function getEmploymentPage(data) {
  return request({
    url: 'employment/getEmploymentPage',
    method: 'post',
    data
  })
}
export function setEmployment(data) {
  return request({
    url: 'employment/setEmployment',
    method: 'post',
    data
  })
}
export function delEmployment(data) {
  return request({
    url: 'employment/delEmployment',
    method: 'post',
    data
  })
}
export function addEmployment(data) {
  return request({
    url: 'employment/addEmployment',
    method: 'post',
    data
  })
}


