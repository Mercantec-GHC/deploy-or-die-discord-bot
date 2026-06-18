import Model from '../abstract_classes/model.js';
import { api_url } from '../../discord_constants.js';
import Guild from '../guild/guild_model.js';

// WebSocket API documentation
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

// Discord Gateway documentation
// https://docs.discord.com/developers/events/gateway#connection-lifecycle


export default class DiscordGateway extends Model {
    /** @type {number} - The interval at which heartbeats are sent, in milliseconds */
    heartbeat_interval = 0;
    /** @type {number | null} - The last sequence number received from the gateway */
    sequence = null;
    /** @type {string} - The URL to resume a previous session */
    resume_url = "";
    /** @type {string} - The session ID for the current connection */
    session_id = "";
    /** @type {Map<string, Guild>} - A map of guild IDs to Guild instances */
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

        /** @type {string} - The authentication token for the Discord Gateway */
        this.token = token;
    }

    /**
     * Handles an incoming message from the Discord Gateway.
     * @param {Object} message - The message received from the gateway
     * @param {number} message.op - The opcode of the message
     * @param {string} [message.t] - The event type (for opcode 0)
     * @param {Object} [message.d] - The event data (for opcode 0)
     * @param {number} [message.s] - The sequence number of the message
     */
    incomming_message(message) {
        //console.log("discord:", message)
        //console.log("op:", message.op)
        
        if (message.s) this.sequence = message.s;

        switch (message.op) {
            case 0:
                this.incoming_event(message.t, message.d)
                break;

            case 1:
                let send_immediately = true;
                this.send_heartbeat(send_immediately);
                break;

            case 7:
             this.resume_connection();
             break;

            case 10:
                this.heartbeat_interval = message.d.heartbeat_interval;
                this.send_identification();

            case 11: // heartbeat response code
                this.send_heartbeat();
                break;
        }
    }

    /** Starts the WebSocket connection to the Discord Gateway and sets up event handlers. */
    start() {
        if (this.is_running()) return;

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

    /** Stops the WebSocket connection to the Discord Gateway. */
    stop() {
        if (this.is_running()) this.socket.close(1000);
    }

    /** Checks if the WebSocket connection to the Discord Gateway is running. */
    is_running() {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) return true;
        return false;
    }

    /** Sends a heartbeat to the Discord Gateway.
     * @param {boolean} send_immediately - If true, sends the heartbeat immediately; otherwise, waits for a random interval up to the heartbeat interval.
     */
    send_heartbeat(send_immediately=false) {
        console.log("Sending heartbeat")

        setTimeout(() => {
            if (!this.is_running()) return; 
            console.log("Heartbeat send")

            this.send({
                d: this.sequence,
                op: 1
            })
            
        }, this.heartbeat_interval * Math.random() * !send_immediately)
    }

    /** Sends a payload to the Discord Gateway.
     * @param {Object} payload - The payload to send to the gateway
     */
    send(payload) {
        this.socket.send(JSON.stringify(payload))
    }

    /** Sends the identification payload to the Discord Gateway. */
    send_identification() {
        console.log("Sending identification")

        /** @type {number} - The intents for the Discord Gateway */
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

    /** Handles an incoming event from the Discord Gateway.
     * @param {string} event_type - The type of the event (e.g., "MESSAGE_CREATE")
     * @param {Object} event - The data associated with the event
     */
    async
    incoming_event(event_type, event) {
        console.log("Event type:", event_type)

        console.log(event)

        // If the event is associated with a guild, delegate it to the appropriate Guild instance
        if (event.guild_id) {
            this.guilds.get(event.guild_id).incoming_event(event_type, event);
            return;
        }

        switch (event_type) {
            case "READY":
                this.resume_url = event.resume_gateway_url;
                this.session_id = event.session_id;
                break;

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
                break;

            case "GUILD_CREATE":
                this.guilds.set(event.id, new Guild(
                    event.id, 
                    event.name, 
                    event.channels,
                    event.members,
                    event.guild_scheduled_events,
                ))

                break;
        }

    }

    /// MARK: RESUME CONNECTION

    /** Resumes a previous WebSocket connection to the Discord Gateway using the session ID and sequence number. */
    resume_connection() {
        console.log("connection resumed");

        this.socket = new WebSocket(this.resume_url);
        this.socket.onmessage = (event) => {
            this.incoming_message(JSON.parse(event.data));
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