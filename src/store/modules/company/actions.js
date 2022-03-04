import { index, getUserCompany, show, store, update, destroy } from '@/api/companies';

export const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            index().then(res => {
                commit("SET_LIST", res.data.result.data.companies);
                resolve(res.data.result)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    getUserCompany({ commit }) {
        return new Promise((resolve, reject) => {
            getUserCompany().then(res => {
                commit("SET_USER_COMPANY", res.data.result.data.company);
                resolve(res.data.result);
            }).catch(err => {
                reject(err.response.data);
            })
        })
    },

    show({ commit }, id) {
        return new Promise((resolve, reject) => {
            show(id).then(res => {
                commit("SET_MODEL", res.data.result.data.company);
                resolve(res.data.result)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    store({ commit }, data) {
        return new Promise((resolve, reject) => {
            store(data).then(res => {
                resolve(res.data.result)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    update({ commit }, data) {
        return new Promise((resolve, reject) => {
            update(data).then(res => {
                resolve(res.data.result)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    destroy({ commit }, id) {
        return new Promise((resolve, reject) => {
            destroy(id).then(res => {
                resolve(res.data.result)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    emptyModel({ commit }) {
        return new Promise((resolve, reject) => {
            commit("EMPTY_MODEL");
            resolve()
        })
    },
}
