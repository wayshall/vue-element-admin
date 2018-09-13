import request from '@/utils/request'

export function loginByUsername(loginData) {
  const data = loginData
  return request({
    url: '/dologin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request.get('/web-admin/userProfile.json')
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function getRouters() {
  return request.get('/web-admin/vueRouters.json')
}
