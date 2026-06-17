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
        this.enemy = Encounter.encounter_enemy(keyword);

        this.players = new Map();
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
     * @param {string} keyword
     * @returns {Enemy | undefined}
     */
    static encounter_enemy(keyword) {
        return {
            "docker": new Docker(),
            "reverse proxy": new Enemy("reverse proxy", 1700, 20, "[mads edit]")
        }[keyword]

    }

    /**
     * Applies a player attack to the current enemy and posts combat messages.
     * @param {import("./attack.js").default} attack
     * @param {Player} player
     * @returns {Promise<void>}
     */
    async attack_enemy(attack, player){
        if(this.is_encountered && this.enemy){
            console.log(this.enemy)
            player.attack(this.enemy, attack);
            await this.channel.send_message(`Channel: [ ${player.name} ] hit the [ ${this.enemy.name} ] for ( ${attack.dmg} ) damage! It has ( ${this.enemy.hp} ) HP left.`);



            if(!this.enemy.is_alive){
                this.channel.send_message(`Channel: You have defeated the ${this.enemy.name}!`);
                this.channel.encounter = null;
            }

            
        }
    }

    /**
     * Adds a member as a combat player in this encounter.
     * @param {import("../member/member_model.js").default} member
     * @returns {Promise<void>}
     */
    async add_player(member) {
        let player = new Player(member.name, 500, 10);

        console.log(member.id, member.name)
        this.players.set(member.id, player);

        await this.channel.send_message(`[ ${player.name} ] has joined the battle! ( ${player.atk} ATK ) ( ${player.hp} HP )`);
    }

}