import Enemy from "./enemy.js";

export default class DNS extends Enemy {
    constructor(encounter) {
        super(
            "DNS", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "A sleek black obelisk looms before you, humming faintly with power. as you approach, it begins to pulse with an otherworldly energy. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.cache_poisoning, this.recursive_storm]);
    }

    cache_poisoning(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.15);
        this.say("poisons your cache and redirects your packets into the abyss.");
        this.attack(player, dmg);
    }

    recursive_storm(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.7);
        this.say("loops recursive queries until the whole party times out.");
        this.attack(player, dmg);
        this.attack_all(dmg);
    }
}