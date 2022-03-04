import {getToken} from "../../../utils/auth";

export const state = {
    token: getToken(),
    user: null,
    role: null,
};
