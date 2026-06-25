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

        this.last_dmg_taken = 0;
    }

    hit(dmg, attacker) {
        this.last_dmg_taken = dmg;

        super.hit(dmg, attacker)
    }


    counter_attack(attacker) {
        this.name = attacker.name;

        super.counter_attack(attacker);
    }

    special_attack(player) {
        this.say("is not the imposter")

        super.special_attack(player, [this.identity_theft]);
    }

    identity_theft() {
        this.attack_random(2, this.last_dmg_taken)
    }
}