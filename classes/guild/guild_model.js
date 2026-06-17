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

        this.channels = new Map()
        channels.forEach((channel) => this.channels.set(channel.id, new Channel(channel.id, channel.type, this)))

        this.members = new Map()
        members.forEach((member) => { 
            return this.members.set(member.id, new Member(member.id, member.nick || member.user.display_name || member.user.global_name || member.user.username, this))
        })
    }


    incoming_event(event_type, event) {
        if (event.channel_id) {
            this.channels.get(event.channel_id).incoming_event(event_type, event);
            return;
        }

        switch (event_type) {
        }
    }
}