import Enemy from "./enemy.js";

export default class Trojan extends Enemy {
    constructor(encounter) {
        super(
            "Trojan", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "This program is probably totally normal, roll for initiative!" // Description
        )
    }


    counter_attack(attacker) {
        this.name = attacker.name;

        super.counter_attack(attacker);
    }
}