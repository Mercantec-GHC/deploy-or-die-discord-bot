import Interface from "../abstract_classes/interface.js";

/**
 * Interface for creating guilds.
 * Extends the base Interface class to provide guild creation functionality.
 */
export default class GuildCreateInterface extends Interface {
    /**
     * Initializes a new GuildCreateInterface instance.
     * @param {string} id - The unique identifier for the interface
     * @param {string} name - The name of the interface
     */
    constructor(id, name) {
        super({id, name});
    }
}