import Model from '../abstract_classes/model.js';
import DiscordGatewayInterface from './discord_gateway_interface.js';

// WebSocket API documentation
// https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

// Discord Gateway documentation
// https://docs.discord.com/developers/events/gateway#connection-lifecycle


export default class DiscordGateway extends Model {
    constructor(discordGatewayInterface) {
        if (!DiscordGatewayInterface.isSpecificInterface(discordGatewayInterface)) {
            throw new Error("Invalid interface");
        }
        super(discordGatewayInterface);
        this.socket = new WebSocket(this.gateway_url);
    }



}