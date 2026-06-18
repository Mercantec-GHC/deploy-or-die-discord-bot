import Docker from "./Enemies/Docker.js"
import Enemy from "./Enemies/enemy.js";
import Player from "./player.js";

export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2;
        static missed_encounters = 0;

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
        /** @type {Enemy | null} */
        this.enemy = this.encounter_enemy(keyword);

        this.players = new Map();
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
     * @returns {Enemy | undefined}
     */
    encounter_enemy(keyword) {
        return {
            "docker": new Docker(this),
            "reverse proxy": new Enemy("reverse proxy", 1700, 20, this, "[mads edit]")
        }[keyword]

    }

    /**
     * Applies a player attack to the current enemy and posts combat messages.
     * @param {import("./attack.js").default} attack
     * @param {Player} player
     * @returns {Promise<void>}
     */
    async attack_enemy(attack, player){
        if(this.is_encountered && this.enemy) {
            player.attack(this.enemy, attack);
            
            let whole_message = this.messages_to_send.join("\n");
            this.messages_to_send = [];

            await this.channel.reply_to_last_message(whole_message);

            if (!this.enemy.is_alive) {
                this.channel.encounter = null;
            }
        }
    }

    /**
     * Adds a member as a combat player in this encounter.
     * @param {import("../member/member_model.js").default} member
     * @returns {Promise<void>}
     */
    add_player(member) {
        let player = new Player(member.name, 500, 10, this);

        console.log(member.id, member.name)
        this.players.set(member.id, player);

        this.messages_to_send.push(`[ ${player.name} ] has joined the battle! ( ${player.atk} ATK ) ( ${player.hp} HP )`);
    }

}