import Player from "./player.js";
import Dice from "./dice.js";
import getEnemyEncounter from "./encounter_enemy_classes.js";


export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2;
        static missed_encounters = 0;
        static timeout_duration =  1; // minutes
        static leave_timeout_duration = 15; // minutes

    /**
     * @param {string} keyword
     * @param {import("../channel/channel_model.js").default} channel
     */
    constructor(keyword, channel) {
        this.keyword = keyword;
        /** @type {import("../channel/channel_model.js").default} */
        this.channel = channel;
        /** @type {boolean} */
        this.is_encountered = Encounter.calculate_chance();
        /** @type {import("./encounter_enemy_classes.js").default[keyof import("./encounter_enemy_classes.js").default] | null} */
        this.enemy = [...this.encounter_enemy(keyword)];

        /** @type {Map<string, Player>} */
        this.players = new Map();

        /** @type {string[]} */
        this.messages_to_send = [];
    }
    
        
    /**
     * Rolls encounter chance with pity logic after missed attempts.
     * @returns {boolean}
     */
    static calculate_chance() {
        let is_encountered = Math.random() * 100 < this.encounter_chance;
        if (!is_encountered) {
            this.missed_encounters++;
            if (this.missed_encounters >= this.max_missed_encounters) {
                this.missed_encounters = 0;
                return true
            }
        }
        else {
            this.missed_encounters = 0;
        }
        return is_encountered;
    }

    /**
     * Returns an enemy instance based on the encounter keyword, or undefined if no match.
     * @param {string} keyword
     * @returns {import("./encounter_enemy_classes.js").default[keyof import("./encounter_enemy_classes.js").default] | undefined}
     */
    encounter_enemy(keyword) {

        // CHECK ON ALL KEYWORDS FOR ENEMIES

        return getEnemyEncounter(keyword, this);
    }

    /**
     * Applies a player attack to the current enemy and posts combat messages.
     * @param {import("./attack.js").default} attack
     * @param {Player} player
     * @returns {Promise<void>}
     */
    async attack_enemy(attack, player) {
        if(this.is_encountered && this.enemy) {
            let roll = new Dice(this.enemy.length).roll() - 1 
            player.attack(this.enemy[roll], attack);
            
            let whole_message = this.messages_to_send.join("\n");
            this.messages_to_send = [];

            await this.channel.reply_to_last_message(whole_message);

            if (this.enemy.length == 0) {
                this.game_end("You win!")
                
            }
        }
    }

    /**
     * Adds a member as a combat player in this encounter.
     * @param {import("../member/member_model.js").default} member
     * @returns {Promise<void>}
     */
    add_player(member) {
        let player = new Player(member.name, 500, this);

        console.log(member.id, member.name)
        this.players.set(member.id, player);

        let join_messages = [
            `[ ${player.name} ] went online! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] plugged in their controller! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] initialized their system! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] played the windows boot up sound! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] is ready to deploy! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] connected successfully! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] joined the network! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] authenticated their credentials! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] has entered the chat... menacingly. ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] successfully passed the CAPTCHA! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] left the tutorial area. Good luck. ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] chose their starter Pokémon! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] is challenged by Youngster Joey! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] installed 37 mods and somehow launched successfully! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] would like to battle! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] connected via SSH. ( ${player.hp} Available Memory )`,
        ]

        let join_dice = new Dice(join_messages.length);

        this.messages_to_send.push(join_messages[join_dice.roll() - 1]);
    }

    game_end(message) {
        this.channel.send_message(`# ${message}`);
        this.channel.encounter = null;
    }

}