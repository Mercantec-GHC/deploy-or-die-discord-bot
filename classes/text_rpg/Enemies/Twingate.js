import Enemy from "./enemy.js";

export default class Twingate extends Enemy {
    constructor(encounter) {
        super(
            "Twingate", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "" // Description
        )
    }

    
    
}