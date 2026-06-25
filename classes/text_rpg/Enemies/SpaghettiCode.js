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

    special_attack(player) {
        super.special_attack(player, [this.callback_hell, this.circular_dependency]);
    }

    callback_hell(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.2);
        this.say("drags you into callback hell with no return statement in sight.");
        this.attack(player, dmg);
    }

    circular_dependency() {
        let dmg = Math.floor(this.damage_calculator() * 0.6);
        this.say("spins a circular dependency web around the whole team.");
        this.attack_all(dmg);
    }
}