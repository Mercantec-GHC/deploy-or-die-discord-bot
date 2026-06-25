import Enemy from "./enemy.js";

export default class DiscordBot extends Enemy {
    constructor(encounter) {
        super(
            "Discord Bot", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "A helpful assistant that can perform various tasks and provide information within the Discord platform. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.rate_limit_raid, this.mod_queue]);
    }

    rate_limit_raid(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.05);
        this.say("hits the rate limit and your actions are throttled into oblivion.");
        this.attack(player, dmg);
    }

    mod_queue(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.75);
        this.say("throws your ticket to the bottom of the mod queue.");
        this.attack(player, dmg);
        this.attack_random(1, dmg);
    }
}