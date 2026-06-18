import Interface from "./interface.js";

export default class Model {

    /**
     * @param {Object} inter - An object containing properties to assign to this model instance
     */
    constructor(inter) {
        Object.assign(this, inter);
    }
}