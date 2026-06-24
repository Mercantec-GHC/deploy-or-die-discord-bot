import Enemy from "./enemy.js";

export default class Firewall extends Enemy {
    constructor(encounter) {
        super(
            "Firewall", // Name
            500, // HP
            70, // Attack
            encounter, // Encounter
            "You feel the heat before you spot it - a towering wall of bright flames. as you approach is start to notice the screams of unseen creatures trapped outside. roll for initiative!" // Description
        )
    }
}