import Enemy from "./enemy.js";

export default class Vps extends Enemy {
    constructor(encounter) {
        super(
            "VPS", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "You spot the creature to late it is already upon you, a miniscule compared to others you have faced its form transparent and lite, its face contorted in a myriad of expressinons fear, pain, pleasure, joy all incompasing it lurches at you with a haunting wail. roll for initiative!" // Description
        )
    }

    
}