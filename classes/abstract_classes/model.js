export default class Model {
    constructor(interface) {
        if (!Interface.isValidInterface(interface)) {
            throw new Error("Invalid interface");
        }
        Object.assign(this, interface);
    }
}