import Model from "../abstract_classes/model.js";

// Discord Member documentation
// https://docs.discord.com/developers/resources/guild#guild-member-object

// Discord Member Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#guild-member-add

export default class Member extends Model {

    /**
     * Initializes a new Member instance.
     * @param {string} id - The unique identifier for the member
     * @param {string} name - The display name of the member
     * @param {import("../guild/guild_model.js").default} guild - The guild to which the member belongs
     */
    constructor(id, name, guild) {

        super(id, name, guild);
    }
}