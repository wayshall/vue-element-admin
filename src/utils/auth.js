import Cookies from 'js-cookie'

const TokenKey = 'SESSION'
const LoginKey = 'isLogin'
const cookieOptions = {
  path: '/'
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, cookieOptions)
}

export function removeToken() {
  return Cookies.remove(TokenKey, cookieOptions)
}

export function isLogin() {
  return Cookies.get(LoginKey)
}

export function setLogin(state) {
  return Cookies.set(LoginKey, state, cookieOptions)
}

export function removeLogin() {
  return Cookies.remove(LoginKey, cookieOptions)
}

export function setVerifyCodeSign(sign) {
  return Cookies.set('_cv', sign, cookieOptions)
}
