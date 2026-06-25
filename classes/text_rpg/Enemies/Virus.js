import Enemy from "./enemy.js";

export default class Virus extends Enemy {
    constructor(encounter) {
        super(
            "Virus", // Name
            500, // HP
            60, // Attack
            encounter, // Encounter
            "A malicious program that can infect and disrupt systems. Roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.signature_mutation, this.replication_burst]);
    }

    signature_mutation(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.2);
        this.say("mutates its signature and bypasses your latest defense update.");
        this.attack(player, dmg);
    }

    replication_burst(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.85);
        this.say("splits into frantic replicas and floods the host.");
        this.attack(player, dmg);

        if (this.encounter.enemy.length < 6) {
            this.encounter.enemy.push(new Virus(this.encounter));
            this.say("replicates into a fresh process.");
        }
    }
}