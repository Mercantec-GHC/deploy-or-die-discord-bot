import Interface from "./interface.js";

export default class Model {
    constructor(inter) {
        if (!Interface.isValidInterface(inter)) {
            throw new Error("Invalid interface");
        }
        Object.assign(this, inter);
    }
}