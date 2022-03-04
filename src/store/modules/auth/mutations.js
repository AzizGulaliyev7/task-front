export const mutations = {
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => state.user = user,
    SET_ROLE: (state, role) => state.role = role,
    REMOVE_TOKEN: (state, token) => state.token = null
};