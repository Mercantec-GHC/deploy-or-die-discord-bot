import Docker from "./Enemies/Docker.js"

export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2
        static missed_encounters = 0

    constructor(keyword){
        this.keyword = keyword;
        this.is_encountered = Encounter.calculate_chance();
        this.enemy = new Encounter.encounter_enemy(keyword)();

        
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
            "docker": Docker
        }[keyword]
    }
    attack_enemy(attack){
        if(this.is_encountered && this.enemy){
            console.log(this.enemy)
            this.enemy.hit(attack);
            if(!this.enemy.is_alive){
                delete this;
            }
        }
    } 
}