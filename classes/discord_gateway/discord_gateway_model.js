import Model from '../abstract_classes/model.js';
import { api_url } from '../../discord_constants.js';
import Guild from '../guild/guild_model.js';

// WebSocket API documentation
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

// Discord Gateway documentation
// https://docs.discord.com/developers/events/gateway#connection-lifecycle


export default class DiscordGateway extends Model {
    heartbeat_interval = 0;
    sequence = null;
    resume_url = "";
    session_id = "";
    guilds = new Map();

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

    incomming_message(message) {
        //console.log("discord:", message)
        //console.log("op:", message.op)
        
        if (message.s) this.sequence = message.s;

        switch (message.op) {
            case 0:
                this.incoming_event(message.t, message.d)
                break

            case 1:
                let send_immediately = true;
                this.send_heartbeat(send_immediately);
                break

            case 7:
             this.resume_connection();
             break

            case 10:
                this.heartbeat_interval = message.d.heartbeat_interval;
                this.send_identification();

            case 11: // heartbeat response code
                this.send_heartbeat();
                break
        }
    }

    start() {
        this.socket = new WebSocket(this.gateway_url);
        this.socket.onmessage = (event) => {
            this.incomming_message(JSON.parse(event.data));
        }

        this.socket.onerror = (error) => {
            console.error("WebSocket error: ", error);

        }
        this.socket.onclose = (event) => {
            console.log(event);
        }
    }

    

    send_heartbeat(send_immediately=false) {
        console.log("Sending heartbeat")

        setTimeout(() => {
            console.log("Heartbeat send")

            this.send({
                d: this.sequence,
                op: 1
            })
            
        }, this.heartbeat_interval * Math.random() * !send_immediately)
    }

    send(payload) {
        this.socket.send(JSON.stringify(payload))
    }

    send_identification() {
        console.log("Sending identification")

        let intent = 0;
        intent += 1 << 0; // guild
        intent += 1 << 1; // guild members
        intent += 1 << 2; // guild moderation
        intent += 1 << 3; // guild expressions
        intent += 1 << 4; // guild intergrations
        intent += 1 << 5; // guild webhooks
        intent += 1 << 6; // guild invites
        intent += 1 << 7; // guild voice states
        intent += 1 << 8; // guild prescenses
        intent += 1 << 9; // guild messages
        intent += 1 << 10; // guild message reactions
        intent += 1 << 11; // guild message typing
        intent += 1 << 12; // direct messages
        intent += 1 << 13; // direct message reactions
        intent += 1 << 14; // direct message typing
        intent += 1 << 15; // message content
        intent += 1 << 16; // guild scheduled events

        intent += 1 << 20; // auto moderation configuration
        intent += 1 << 21; // auto moderation execution

        intent += 1 << 24; // guild message polls
        intent += 1 << 25; // direct message polls

        this.send({
                op: 2,
                d: {
                    token: this.token,
                    properties: {
                        os: "linux",
                        browser: "chrome",
                        device: "disco"
                    },
                    intents: intent
                }
            });
    }

    // MARK: INCOMING EVENT
    incoming_event(event_type, event) {
        console.log("Event type:", event_type)

        console.log(event)

        if (event.guild_id) {
            this.guilds.get(event.guild_id).incoming_event(event_type, event);
            return;
        }

        switch (event_type) {
            case "READY":
                this.resume_url = event.resume_gateway_url;
                this.session_id = event.session_id;
                break

            case "MESSAGE_CREATE":
                if (event.author.bot) break;
                if (event.content.trim().toLowerCase().startsWith("hejsa")) {
                    fetch(new URL(api_url + `/channels/${event.channel_id}/messages`), {
                        method: "POST",
                        headers: {
                            "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            content: "Privat: Hejsa!"
                        })
                    })
                }
                break

            case "GUILD_CREATE":
                this.guilds.set(event.id, new Guild(
                    event.id, 
                    event.name, 
                    event.joined_at,
                    event.member_count,
                    event.voice_states,
                    event.members,
                    event.channels,
                    event.threads,
                    event.presences,
                    event.stage_instances,
                    event.guild_scheduled_events,
                    event.soundboard_sounds,
                    event.icon, 
                    event.splash, 
                    event.discovery_splash, 
                    event.owner_id, 
                    event.afk_channel_id, 
                    event.afk_timeout, 
                    event.verification_level,
                    event.explicit_content_filter,
                    event.roles,
                    event.emojis,
                    event.features,
                    event.mfa_level,
                    event.application_id,
                    event.system_channel_id,
                    event.system_channel_flags,
                    event.rules_channel_id,
                    event.vanity_url_code,
                    event.description,
                    event.banner,
                    event.premium_tier,
                    event.preferred_locale,
                    event.public_updates_channel_id,
                    event.nsfw_level,
                    event.premium_progress_bar_enabled,
                    event.safety_alerts_channel_id,
                    event.incidents_data,
                ))

                break
        }

    }

    resume_connection() {
        console.log("connection resumed")

        this.socket = new WebSocket(this.resume_url);
        this.socket.onmessage = (event) => {
            this.incomming_message(JSON.parse(event.data));
        }

        this.socket.onerror = (error) => {
            console.error("WebSocket error: ", error);

        }
        this.socket.onclose = (event) => {
            console.log(event);
        }

        this.socket.onopen = (event) => {
            this.send({
                op: 6,
                d: {
                    token: this.token,
                    session_id: this.session_id,
                    seq: this.sequence
                }
            })

        }
    }
}