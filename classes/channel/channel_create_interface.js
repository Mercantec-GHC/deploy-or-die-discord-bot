import Interface from "../abstract_classes/interface.js";

/**
 * Interface for creating channels.
 * Extends the base Interface class to provide channel creation functionality.
 */
export default class ChannelCreateInterface extends Interface {
    /**
     * Initializes a new GuildCreateInterface instance.
     * @param {string} id - The unique identifier for the interface
     * @param {number} type - The type of channel
     * @param {string} guild_id - The id of the guild (may be missing for some channel objects received over gateway guild dispatches)
     */

    constructor(
        id,
        type,
        guild_id
    ) {
        super({
            id,
            type,
            guild_id
        });
    }
}