import Model from "../abstract_classes/model.js";
import { api_url } from "../../discord_constants.js";
import Keywords from "../text_rpg/keywords.js";
import Encounter from "../text_rpg/encounter.js";
import Attack from "../text_rpg/attack.js";
// Discord Channel documentation
// https://docs.discord.com/developers/resources/channel

// Discord Channel Gateway documentation
// https://docs.discord.com/developers/events/gateway-events#channel-create

export default class Channel extends Model {

    // typing_timer = new Map()
    encounter = null

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


    incoming_event(event_type, event) {
        switch (event_type) {
            case "MESSAGE_CREATE":
                if (event.author.bot) break;

                if (event.content.trim().includes(" ")) {
                    const keyword = new Keywords(event.content);
                    console.log(keyword)
                    
                    if(this.encounter?.is_encountered){
                        this.encounter.attack_enemy(new Attack(event.content));
                        
                        
                        return;
                    }
                    
                    if(keyword.encounter){
                        this.encounter = new Encounter(keyword.encounter, this);
                        if (this.encounter.is_encountered) {
                            this.send_message(`Channel: You have encountered a ${this.encounter.enemy.name}!`);
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

    send_message(message_content) {
        Channel.send_message(this.id, message_content);
    }

    static send_message(channel_id, message_content) {
        fetch(new URL(api_url + `/channels/${channel_id}/messages`), {
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