import Model from "../abstract_classes/model.js";
import GuildCreateInterface from "./guild_create_interface.js";

// Discord Guild documentation
// https://docs.discord.com/developers/resources/guild

// Discord Guild Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#guild-create

export default class Guild extends Model {
    constructor(guildCreateInterface) {

        if (!GuildCreateInterface.isSpecificInterface(guildCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(guildCreateInterface);
    }
}