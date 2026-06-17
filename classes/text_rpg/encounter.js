import Docker from "./Enemies/Docker.js"
import Enemy from "./Enemies/enemy.js";

export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2
        static missed_encounters = 0

    constructor(keyword, channel){
        this.keyword = keyword;
        /** @type {import("../channel/channel_model.js").default} */
        this.channel = channel;
        /** @type {boolean} */
        this.is_encountered = Encounter.calculate_chance();
        /** @type {Enemy | null} */
        this.enemy = Encounter.encounter_enemy(keyword);

        
    }
    
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

    static encounter_enemy(keyword) {
        return {
            "docker": new Docker(),
            "reverse proxy": new Enemy("reverse proxy", 1700, 20, "[mads edit]")
        }[keyword]

    }

    attack_enemy(attack){
        if(this.is_encountered && this.enemy){
            console.log(this.enemy)
            this.enemy.hit(attack);
            this.channel.send_message(`Channel: You hit the [ ${this.enemy.name} ] for ${attack.dmg} damage! It has [ ${this.enemy.hp} ] HP left.`);



            if(!this.enemy.is_alive){
                this.channel.send_message(`Channel: You have defeated the ${this.enemy.name}!`);
                this.channel.encounter = null;
            }

            
        }
    } 



}