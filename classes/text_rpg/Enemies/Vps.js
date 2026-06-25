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

    special_attack(player) {
        super.special_attack(player, [this.noisy_neighbor, this.sudden_reboot]);
    }

    noisy_neighbor() {
        let dmg = Math.floor(this.damage_calculator() * 0.7);
        this.say("acts as a noisy neighbor and steals cycles from everyone.");
        this.attack_all(dmg);
    }

    sudden_reboot(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.2);
        this.say("unexpectedly reboots and catches you mid-action.");
        this.attack(player, dmg);
    }

    
}