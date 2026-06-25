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

    die() {
        this.say("has ended")
        this.encounter.enemy[this.mercantec_index] = this.summoner;
    }
    
}