import Model from "../abstract_classes/model.js";
import { api_url } from "../../discord_constants.js";
import Keywords from "../text_rpg/keywords.js";
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


                // game logic
                if (event.content.trim().includes(" ")) {
                    const keyword = new Keywords(event.content);
                    console.log(keyword)
                    
                    if(this.encounter?.is_encountered) {
                        let player = this.encounter.players.get(event.author.id);

                        if (!player) {
                            await this.encounter.add_player(this.guild.members.get(event.author.id));
                            //this.encounter.add_player(event.author.id, event.author.username);

                            player = this.encounter.players.get(event.author.id);
                        }

                        await this.encounter.attack_enemy(new Attack(event.content), player);
                        
                        return;
                    }
                    
                    if(keyword.encounter){
                        this.encounter = new Encounter(keyword.encounter, this);
                        if (this.encounter.is_encountered) {
                            await this.send_message(`Channel: You have encountered a ${this.encounter.enemy.name}!`);
                        }
                    }
                }
                    
                // clearTimeout(this.typing_timer.get(event.author.id))
                // this.typing_timer.delete(event.author.id)


                // if (event.content.trim().toLowerCase().startsWith("hejsa")) {
                //     this.send_message("Channel: Hejsa!");
                // }

            break;

            case "TYPING_START":
                // if (event.member.user.bot) break;

                // this.typing_timer.set(event.member.user.id, setTimeout(() => {
                //     let user_id = event.member.user.id;

                //     this.send_message(`<@${user_id}> Du for langsom!`);
                // }, 5000));
                break;
        }
    }
    
    
    async reply_to_last_message(message_content) {
        let message_id = this.last_message_id;
        this.last_message_id = null;
        await Channel.reply_to_message(this.id, message_id, message_content);
    }

    /** Sends a message to the current channel. */
    async send_message(message_content) {
        await Channel.send_message(this.id, message_content);
    }

    /** Replies to a specific message in the channel. */
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
                }
            })
        });
    }

    /** Sends a message to a specified channel. */
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