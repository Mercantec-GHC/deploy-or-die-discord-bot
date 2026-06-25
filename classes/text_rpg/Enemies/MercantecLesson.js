import Enemy from "./enemy.js";
import Mercantec from "./Mercantec.js";

export default class Lesson extends Enemy {
    
    constructor(encounter) {
        super(
            "Lesson at Mercantec", // Name
            70, // HP
            50, // Attack
            encounter, // Encounter
            "" // Description
        )
        
        
        this.mercantec_index = this.encounter.enemy.findIndex((e) => {
            return e instanceof Mercantec;
        });
        
        
        this.summoner = this.encounter.enemy[this.mercantec_index];
        this.encounter.enemy[this.mercantec_index] = this;
    }

    special_attack(player) {
        super.special_attack(player, [this.pop_quiz, this.group_assignment]);
    }

    pop_quiz(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.1);
        this.say("starts a surprise pop quiz you definitely did not study for.");
        this.attack(player, dmg);
    }

    group_assignment() {
        let dmg = Math.floor(this.damage_calculator() * 0.6);
        this.say("assigns group work and everyone takes collaborative damage.");
        this.attack_all(dmg);
    }

    die() {
        this.say("has ended")
        this.encounter.enemy[this.mercantec_index] = this.summoner;
    }
    
}