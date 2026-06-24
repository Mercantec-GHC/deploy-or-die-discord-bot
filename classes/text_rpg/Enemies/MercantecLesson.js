import Enemy from "./enemy.js";

export default class Lesson extends Enemy {
    
    constructor(encounter) {
        super(
            "Lesson at Mercantec", // Name
            70, // HP
            50, // Attack
            encounter, // Encounter
            "" // Description
        )
        this.summoner = this.encounter.enemy
        this.encounter.enemy = this
    }
        die(){
        this.say("has ended")
        this.encounter.enemy = this.summoner

    }
    
}