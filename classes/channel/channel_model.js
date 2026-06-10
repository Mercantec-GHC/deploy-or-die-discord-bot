import Model from "../abstract_classes/model.js";
import ChannelCreateInterface from "./channel_create_interface.js";
export default class Channel extends Model {
    constructor(channelCreateInterface) {

        if (!ChannelCreateInterface.isSpecificInterface(channelCreateInterface)) {
            throw new Error("Invalid interface");
        }

        super(channelCreateInterface);
    }
}