import Model from "../abstract_classes/model.js";
import ChannelCreateInterface from "./channel_create_interface.js";

// Discord Channel documentation
// https://docs.discord.com/developers/resources/channel

// Discord Channel Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#channel-create

export default class Channel extends Model {
    constructor(channelCreateInterface) {

        if (!ChannelCreateInterface.isSpecificInterface(channelCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(channelCreateInterface);
    }
}