import Interface from "./interface.js";

export default class Model {
    constructor(inter) {
        if (!Interface.isInterface(inter)) {
            throw new Error("Invalid interface");
        }
        Object.assign(this, inter);
    }
}