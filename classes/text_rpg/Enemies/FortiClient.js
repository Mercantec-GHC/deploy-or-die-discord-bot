import Enemy from "./enemy.js";

export default class FortiClient extends Enemy {
    constructor(encounter) {
        super(
            "FortiClient", // Name
            444, // HP
            44, // Attack
            encounter, // Encounter
            "Surely that is not just forty clients in a trench coat? roll for initiative!" // Description
        )
    }

    
}