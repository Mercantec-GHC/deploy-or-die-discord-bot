import Model from "../abstract_classes/model.js";
import MemberCreateInterface from './member_create_interface.js';

export default class Member extends Model {
    constructor(memberCreateInterface) {
        if (!MemberCreateInterface.isSpecificInterface(memberCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(memberCreateInterface);
    }
}