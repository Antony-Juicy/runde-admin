import request from '@/utils/request'

export function getPlatformAdmin(data) {
  return request({
    url: 'secGroup/getSecUserAll',
    method: 'post',
    data
  })
}
export function addPlatformAdminGroup(data) {
  return request({
    url: 'secGroup/addSecGroup',
    method: 'post',
    data
  })
}

export function setAdminGroup(data) {
  return request({
    url: 'secGroup/setSecGroup',
    method: 'post',
    data
  })
}

export function getAdminGroup(data) {
  return request({
    url: 'secGroup/getSecGroupAll',
    method: 'post',
    data
  })
}

export function delPlatformAdminGroup(data) {
  return request({
    url: 'secGroup/delSecGroup',
    method: 'post',
    data
  })
}

export function getPlatformAdminAccount(data) {
  return request({
    url: 'secUser/getSecUserAll',
    method: 'post',
    data
  })
}
export function setPlatformAdminAccount(data) {
  return request({
    url: 'secUser/setSecUser',
    method: 'post',
    data
  })
}
export function addPlatformAdminAccount(data) {
  return request({
    url: 'secUser/addSecUser',
    method: 'post',
    data
  })
}
export function delPlatformAdminAccount(data) {
  return request({
    url: 'secUser/delSecUser',
    method: 'post',
    data
  })
}

export function getErrorLogPage(data) {
  return request({
    url: 'errorLog/getErrorLogPage',
    method: 'post',
    data
  })
}

export function getAdminLogPage(data) {
  return request({
    url: 'adminLog/getAdminLogPage',
    method: 'post',
    data
  })
}

export function getIpInfoLogPage(data) {
  return request({
    url: 'ipInfoLog/getIpInfoLogPage',
    method: 'post',
    data
  })
}

export function getPublicLogPage(data) {
  return request({
    url: 'publicLog/getPublicLogPage',
    method: 'post',
    data
  })
}
