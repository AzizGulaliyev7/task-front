import { model } from "./properties/model";
import { rules } from "./properties/rules";

export const state = {
    list: [],
    model: JSON.parse(JSON.stringify(model)),
    rules: rules
};
