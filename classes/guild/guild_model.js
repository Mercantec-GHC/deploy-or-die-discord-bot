import Model from "../abstract_classes/model.js";
import { api_url } from "../../discord_constants.js";
import Channel from "../channel/channel_model.js";
import Member from "../member/member_model.js";

// Discord Guild documentation
// https://docs.discord.com/developers/resources/guild

// Discord Guild Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#guild-create

export default class Guild extends Model {
    /**
    * Initializes a new GuildCreateInterface instance.
    * @param {string} id - The unique identifier for the interface
    * @param {string} name - The name of the interface
    * @param {Array} channels - The channels available in the guild
    * @param {Array} members - The members available in the guild
    * @param {Array} guild_scheduled_events - The scheduled events in the guild
    */
    constructor(
        id, 
        name, 
        channels,
        members,
        guild_scheduled_events,
    ) {
        super({
            id, 
            name, 
            channels,
            members,
            guild_scheduled_events,
        });

        /** @type {Map<string, Channel>} - A map of channel IDs to Channel instances */
        this.channels = new Map()
        channels.forEach((channel) => this.channels.set(channel.id, new Channel(channel.id, channel.type, this)))

        /** @type {Map<string, Member>} - A map of member IDs to Member instances */
        this.members = new Map()
        members.forEach((member) => {
            return this.members.set(member.user.id, new Member(member.user.id, member.nick || member.user.display_name || member.user.global_name || member.user.username, this))
        })
    }

    /** Handles an incoming event for the guild. */
    incoming_event(event_type, event) {

        // If the event is related to a specific channel, delegate it to the corresponding Channel instance
        if (event.channel_id) {
            this.channels.get(event.channel_id).incoming_event(event_type, event);
            return;
        }

        switch (event_type) {
        }
    }
}