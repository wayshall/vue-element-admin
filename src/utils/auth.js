import Cookies from 'js-cookie'

const TokenKey = 'SESSION'
const LoginKey = 'isLogin'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function isLogin() {
  return Cookies.get(LoginKey)
}

export function setLogin(state) {
  return Cookies.set(LoginKey, state)
}

export function removeLogin() {
  return Cookies.remove(LoginKey)
}
