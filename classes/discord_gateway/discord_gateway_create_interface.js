import Interface from '../abstract_classes/interface.js';

export default class DiscordGatewayCreateInterface extends Interface {

    /**
     * Initializes a new DiscordGatewayCreateInterface instance.
     * @param {string | URL} gateway_url - The URL of the Discord Gateway
     * @param {string} token - The authentication token for the Discord Gateway
     */
    constructor(gateway_url, token) {
        super({ 
            gateway_url: new URL(gateway_url), 
            token 
        });
    }

}