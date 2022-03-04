import request from './../utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getAuth() {
  return request({
    url: '/auth/getAuth',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
