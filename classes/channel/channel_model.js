import Model from "../abstract_classes/model.js";

// Discord Channel documentation
// https://docs.discord.com/developers/resources/channel

// Discord Channel Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#channel-create

export default class Channel extends Model {
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
    )
    {
        super({
            id,
            type,
            guild_id
        });
    }
}