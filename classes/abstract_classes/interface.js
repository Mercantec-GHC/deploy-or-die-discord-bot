export default class Interface {
    constructor(args) {
        Object.assign(this, args);
    }

    static isValidInterface(inter) {
        if (inter instanceof Interface) {
            return true;
        }
        return false;
    }
}