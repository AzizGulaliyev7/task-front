import { model } from "./properties/model";

export const mutations = {
    SET_LIST: (state, companies) => { state.list = companies },
    SET_MODEL: (state, model) => { state.model = model },
    SET_USER_COMPANY: (state, userCompany) => { state.userCompany = userCompany },
    EMPTY_MODEL: (state) => {
        state.model = JSON.parse(JSON.stringify(model));
    },
};