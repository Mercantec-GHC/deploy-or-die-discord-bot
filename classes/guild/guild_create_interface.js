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
     * @param {string} joined_at - The timestamp when the interface was created
     * @param {number} member_count - The number of members in the guild
     * @param {Array} voice_states - The voice states of the members in the guild
     * @param {Array} members - The members of the guild
     * @param {Array} channels - The channels available in the guild
     * @param {Array} threads - The threads available in the guild
     * 
     * @param {string} icon - The icon of the guild
     * @param {string} splash - The splash image of the guild
     * @param {string} discovery_splash - The discovery splash image of the guild
     * @param {string} owner_id - The ID of the guild owner
     * @param {string} afk_channel_id - The ID of the AFK channel
     * @param {number} afk_timeout - The AFK timeout duration in seconds
     * @param {number} verification_level - The verification level of the guild
     * @param {number} explicit_content_filter - The explicit content filter level of the guild
     * @param {Array} roles - The roles available in the guild
     * @param {Array} emojis - The emojis available in the guild
     * @param {Array} features - The features enabled in the guild
     * @param {number} mfa_level - The MFA level of the guild
     * @param {string} application_id - The ID of the application associated with the guild
     * @param {string} system_channel_id - The ID of the system channel
     * @param {number} system_channel_flags - The flags for the system channel
     * @param {string} rules_channel_id - The ID of the rules channel
     * @param {string} vanity_url_code - The vanity URL code for the guild
     * @param {string} description - The description of the guild
     * @param {string} banner - The banner image of the guild
     * @param {number} premium_tier - The premium tier of the guild
     * @param {string} preferred_locale - The preferred locale of the guild
     * @param {string} public_updates_channel_id - The ID of the public updates channel
     * @param {number} nsfw_level - The NSFW level of the guild
     * @param {boolean} premium_progress_bar_enabled - Whether the premium progress bar is enabled
     * @param {string} safety_alerts_channel_id - The ID of the safety alerts channel
     * @param {Array} incidents_data - The incidents data for the guild
     */
    constructor(
        id, 
        name, 
        joined_at,
        member_count,
        voice_states,
        members,
        channels,
        threads,
        icon, 
        splash, 
        discovery_splash, 
        owner_id, 
        afk_channel_id, 
        afk_timeout, 
        verification_level,
        explicit_content_filter,
        roles,
        emojis,
        features,
        mfa_level,
        application_id,
        system_channel_id,
        system_channel_flags,
        rules_channel_id,
        vanity_url_code,
        description,
        banner,
        premium_tier,
        preferred_locale,
        public_updates_channel_id,
        nsfw_level,
        premium_progress_bar_enabled,
        safety_alerts_channel_id,
        incidents_data,
    ) {
        super({
            id, 
            name, 
            joined_at: new Date(joined_at),
            member_count,
            voice_states,
            members,
            channels,
            threads,
            icon, 
            splash, 
            discovery_splash, 
            owner_id, 
            afk_channel_id, 
            afk_timeout, 
            verification_level,
            explicit_content_filter,
            roles,
            emojis,
            features,
            mfa_level,
            application_id,
            system_channel_id,
            system_channel_flags,
            rules_channel_id,
            vanity_url_code,
            description,
            banner,
            premium_tier,
            preferred_locale,
            public_updates_channel_id,
            nsfw_level,
            premium_progress_bar_enabled,
            safety_alerts_channel_id,
            incidents_data,
        });
    }
}