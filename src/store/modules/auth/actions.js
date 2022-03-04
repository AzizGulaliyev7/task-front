import {login, logout, getAuth} from "../../../api/auth";
import {setToken, removeToken} from "../../../utils/auth";

export const actions = {
    login({ commit }, loginData) {
        return new Promise((resolve, reject) => {
            login(loginData).then(response => {
                if (response.data) {
                    commit('SET_TOKEN', response.data.access_token)         
                    setToken(response.data.access_token)
                    resolve()
                }
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },

    getAuth({commit}){
        return new Promise((resolve, reject) => {
            getAuth().then(res => {
                if (!res.data) {
                    reject('User is not fetched, please login again.')
                }
                if (!res.data.role) {
                    reject('Role can not be empty')
                }

                commit('SET_USER', res.data)
                commit('SET_ROLE', res.data.role)
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
          })
    },

    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken()
                commit('REMOVE_TOKEN')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    resetToken({ commit }) {
        return new Promise((resolve) => {
            removeToken()
            commit('REMOVE_TOKEN')
            resolve()
        })
    },
}
