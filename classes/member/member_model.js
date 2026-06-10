import Model from "../abstract_classes/model.js";
import MemberCreateInterface from './member_create_interface.js';

// Discord Member documentation
// https://docs.discord.com/developers/resources/guild#guild-member-object

// Discord Member Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#guild-member-add

export default class Member extends Model {
    constructor(memberCreateInterface) {
        if (!MemberCreateInterface.isSpecificInterface(memberCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(memberCreateInterface);
    }
}