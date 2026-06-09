export default class Interface {
    constructor(args) {
        Object.assign(this, args);
    }

    static isValidInterface(interface) {
        if (interface.constructor.name === Interface.name) {
            return true;
        }
        return false;
    }
}