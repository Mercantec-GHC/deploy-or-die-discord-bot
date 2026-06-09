import Model from "../abstract_classes/model.js";
import GuildCreateInterface from "./guild_create_interface.js";
export default class Guild extends Model {
    constructor(guildCreateInterface) {

        if (!GuildCreateInterface.isInterface(guildCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(guildCreateInterface);
    }
}