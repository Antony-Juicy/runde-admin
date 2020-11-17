import request from '@/utils/request'


export function getCustomerAll(data) {
  return request({
    url: 'customer/getCustomerAll',
    method: 'post',
    data
  })
}
export function getCustomerPage(data) {
  return request({
    url: 'customer/getCustomerPage',
    method: 'post',
    data
  })
}
export function setCustomer(data) {
  return request({
    url: 'customer/setCustomer',
    method: 'post',
    data
  })
}
export function delCustomer(data) {
  return request({
    url: 'customer/delCustomer',
    method: 'post',
    data
  })
}
export function addCustomer(data) {
  return request({
    url: 'customer/addCustomer',
    method: 'post',
    data
  })
}