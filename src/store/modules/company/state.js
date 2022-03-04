import { model } from "./properties/model";
import { rules } from "./properties/rules";

export const state = {
    list: [],
    userCompany: null,
    model: JSON.parse(JSON.stringify(model)),
    rules: rules
};
