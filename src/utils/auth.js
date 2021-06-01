import Cookies from 'js-cookie'

const pre = 'rundejy'
const TokenKey = pre + '_token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // console.log('remove')
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey)
}
