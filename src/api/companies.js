import request from '@/utils/request'

export function index() {
    return request({
        url: '/companies',
        method: 'get'
    })
}

export function getUserCompany() {
    return request({
        url: '/companies/getUserCompany',
        method: 'get',
    })
}

export function show(id) {
    return request({
        url: `/companies/${id}`,
        method: 'get'
    })
}

export function store(data) {
    return request({
        url: '/companies',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: `/companies/${data.id}`,
        method: 'put',
        data
    })
}

export function destroy(id) {
    return request({
        url: `/companies/${id}`,
        method: 'delete',
    })
}