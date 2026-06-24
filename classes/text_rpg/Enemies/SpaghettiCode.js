import Enemy from "./enemy.js";

export default class SpaghettiCode extends Enemy {
    constructor(encounter) {
        super(
            "Spaghetti code", // Name
            30, // HP
            300, // Attack
            encounter, // Encounter
            "You spot a monster seemingly made entirely of spaghetti, suddenly you get entangled in a mess of code as it tries to consume you. Roll for initiative!" // Description
        )
    }
}