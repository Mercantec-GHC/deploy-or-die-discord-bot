export default class Interface {
    constructor(args) {
        Object.assign(this, args);
    }

    static isInterface(inter) {
        if (inter instanceof Interface) {
            return true;
        }
        return false;
    }

    static isSpecificInterface(inter) {
        if (inter instanceof this) {
            return true;
        }
        return false;
    }
}