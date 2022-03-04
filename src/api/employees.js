import request from '@/utils/request'

export function index() {
    return request({
        url: '/employees',
        method: 'get'
    })
}

export function show(id) {
    return request({
        url: `/employees/${id}`,
        method: 'get'
    })
}

export function store(data) {
    return request({
        url: '/employees',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: `/employees/${data.id}`,
        method: 'put',
        data
    })
}

export function destroy(id) {
    return request({
        url: `/employees/${id}`,
        method: 'delete',
    })
}