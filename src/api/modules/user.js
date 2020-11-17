import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'secUser/getToken',
    method: 'post',
    data
  })
}

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function getInfo(token) {
  return request({
    url: 'secUser/getSecUserCurrent',
    method: 'post'
    // headers: {
    //   'sessionid': token
    // }
    // data: { token }
  })
}

export function logout() {
  return request({
    url: 'login/logoutAdmin',
    method: 'post'
  })
}

// 获取会员信息
export function getUserInfo(data) {
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}

// 修改会员信息
export function setUserInfo(data) {
  return request({
    url: 'user/setUserInfo',
    method: 'post',
    data
  })
}

// 删除会员信息
export function delUserInfo(data) {
  return request({
    url: 'user/delUserInfo',
    method: 'post',
    data
  })
}

// 导出会员信息
export function explodeUserInfo(data) {
  return request({
    url: 'user/explodeUserInfo',
    method: 'post',
    data
  })
}
