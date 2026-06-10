import Model from '../abstract_classes/model.js';
import DiscordGatewayCreateInterface from './discord_gateway_create_interface.js';

// WebSocket API documentation
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

// Discord Gateway documentation
// https://docs.discord.com/developers/events/gateway#connection-lifecycle


export default class DiscordGateway extends Model {
    constructor(discordGatewayInterface) {
        if (!DiscordGatewayCreateInterface.isSpecificInterface(discordGatewayInterface)) {
            throw new Error("Invalid interface");
        }
        super(discordGatewayInterface);
        
    }

    incomming_message(message) {
        console.log(message)
    }

    start() {
        this.socket = new WebSocket(this.gateway_url);
        this.socket.onmessage = function(event) {
            this.incomming_message(event.data)
        };
        this.socket.onerror = function(error) {
            console.error("WebSocket error: ", error);
        }
    }



}