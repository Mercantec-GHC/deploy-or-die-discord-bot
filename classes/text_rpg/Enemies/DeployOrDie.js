import Enemy from "./enemy.js";

export default class DeployOrDie extends Enemy {
    constructor(encounter) {
        super(
            "Deployer of Die", // Name
            1111, // HP
            42, // Attack
            encounter, // Encounter
            "I think you might have misunderstood something. Roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.deadline_crunch, this.rollback_disaster]);
    }

    deadline_crunch(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.35);
        this.say("announces a hard deadline and crushes you with impossible scope.");
        this.attack(player, dmg);
    }

    rollback_disaster(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.7);
        this.say("attempts a rollback and drags everyone into dependency chaos.");
        this.attack(player, dmg);
        this.attack_all(dmg);
    }
}