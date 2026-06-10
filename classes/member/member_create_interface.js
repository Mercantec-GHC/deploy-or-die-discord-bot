import Interface from '../abstract_classes/interface.js';

export default class MemberCreateInterface extends Interface {

    /**
     * Initializes a new MemberCreateInterface instance.
     * @param {Array} roles - The roles of the member
     * @param {string} joined_at - The timestamp when the member joined the guild
     * @param {boolean} deaf - Whether the member is deafened
     * @param {boolean} mute - Whether the member is muted
     * @param {number} flags - The flags for the member
     * @param {string} guild_id - The ID of the guild the member belongs to
     */
    constructor(roles, joined_at, deaf, mute, flags, guild_id) {
        super({ roles, joined_at, deaf, mute, flags, guild_id });
    }
}