import Model from "../abstract_classes/model.js";
import { api_url } from "../../discord_constants.js";
import Keyword from "../text_rpg/keywords.js";
import Encounter from "../text_rpg/encounter.js";
import Attack from "../text_rpg/attack.js";
import Member from "../member/member_model.js";
// Discord Channel documentation
// https://docs.discord.com/developers/resources/channel

// Discord Channel Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#channel-create

export default class Channel extends Model {

    // typing_timer = new Map()
    /** @type {Encounter | null} */
    encounter = null

    /** @type {string | null} */
    last_message_id = null;
    last_message_timestamp = null;


    /**
    * Initializes a new Channel instance.
    * @param {string} id - The unique identifier for the interface
    * @param {number} type - The type of channel
    * @param {import("../guild/guild_model.js").default} guild - The guild to which the channel belongs
    */

    constructor(
        id,
        type,
        guild
    )
    {
        super({
            id,
            type,
            guild

        });

    }

    /** Handles incoming events for the channel. */
    async incoming_event(event_type, event) {
        switch (event_type) {
            case "MESSAGE_CREATE":
                if (event.author.bot) break;
                this.last_message_id = event.id;
                this.last_message_timestamp = Date.now();

                // game logic
                
                const keyword = new Keyword(event.content);
                //console.log(keyword)
                
                if(this.encounter?.is_encountered) {
                    let player = this.encounter.players.get(event.author.id);

                    if (!player) {
                        await this.encounter.add_player(this.guild.members.get(event.author.id));
                        //this.encounter.add_player(event.author.id, event.author.username);

                        player = this.encounter.players.get(event.author.id);
                    }

                    if (player.is_alive) await this.encounter.attack_enemy(new Attack(event.content, player), player);
                    
                    return;
                }
                
                if(keyword.encounter) {
                    this.encounter = new Encounter(keyword.encounter, this);
                    if (this.encounter.is_encountered && this.encounter.enemy.length) {
                        if(this.encounter.enemy.length >= 2){
                            let message = ""
                            for(let enemy of this.encounter.enemy){
                                message += `${this.encounter.enemy.desc}\n`
                                
                            }
                            for(let enemy of this.encounter.enemy){
                                message += `You have encountered a [ ${this.encounter.enemy.name} ]! ( ${this.encounter.enemy.atk} )MB Bandwidth ( ${this.encounter.enemy.hp} )MB Available Memory.\n`
                            }
                            await this.send_message(message)
                        }
                        await this.send_message(`${this.encounter.enemy.desc}\nYou have encountered a [ ${this.encounter.enemy.name} ]! ( ${this.encounter.enemy.atk} )MB Bandwidth ( ${this.encounter.enemy.hp} )MB Available Memory.`);
                    }
                }
                
                    
                // clearTimeout(this.typing_timer.get(event.author.id))
                // this.typing_timer.delete(event.author.id)


                // if (event.content.trim().toLowerCase().startsWith("hejsa")) {
                //     this.send_message("Channel: Hejsa!");
                // }

            break;

            case "TYPING_START":
                if (!this.encounter?.is_encountered) break; // If there's no active encounter, ignore typing events
                let alive_players = Array.from(this.encounter.players.values()).filter(player => player.is_alive);
                //console.log("alive players", alive_players);
                
                if (this.last_message_timestamp && (Date.now() - this.last_message_timestamp) >= 1000 * 60 * Encounter.leave_timeout_duration) {
                    this.encounter = null; // Reset encounter on typing start after timeout
                    this.send_message("## The batllefield has become quiet the Deployment Gods look down on you in disappointment...  ");
                    break;
                } // If a message was sent in the last 15 minutes, ignore typing events
                
                if (alive_players.length > 0) break; // If there are still alive players, ignore typing events

                if (this.last_message_timestamp && (Date.now() - this.last_message_timestamp) < 1000 * 60 * Encounter.timeout_duration) break; // If a message was sent in the last 60 seconds, ignore typing events
                this.encounter = null; // Reset encounter on typing start after timeout
                this.send_message("## The batllefield has become quiet the Deployment Gods look down on you in disappointment...  ");
            break;
        }
    }
    
    
    /** Replies to the last message in the channel with the given content.
     * @param {string} message_content - The content of the reply message
     * @returns {Promise<void>}
     */
    async reply_to_last_message(message_content) {
        let message_id = this.last_message_id;
        this.last_message_id = null;
        await Channel.reply_to_message(this.id, message_id, message_content);
    }

    /** Sends a message to the current channel.
     * @param {string} message_content - The content of the message to send
     * @returns {Promise<void>}
     */
    async send_message(message_content) {
        await Channel.send_message(this.id, message_content);
    }

    /** Replies to a specific message in the channel.
     * @param {string} channel_id - The ID of the channel where the message is located
     * @param {string} message_id - The ID of the message to reply to
     * @param {string} message_content - The content of the reply message
     */
    static async reply_to_message(channel_id, message_id, message_content) {
        await fetch(new URL(api_url + `/channels/${channel_id}/messages`), {
            method: "POST",
            headers: {
                "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: message_content,
                message_reference: {
                    message_id: message_id,
                    fail_if_not_exists: false
                },
                allowed_mentions: {
                    replied_user: false
                },
            })
        });
    }

    /** Sends a message to a specified channel.
     * @param {string} channel_id - The ID of the channel to send the message to
     * @param {string} message_content - The content of the message to send
     */
    static async send_message(channel_id, message_content) {
        await fetch(new URL(api_url + `/channels/${channel_id}/messages`), {
            method: "POST",
            headers: {
                "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: message_content,
            })
        })
    }
}