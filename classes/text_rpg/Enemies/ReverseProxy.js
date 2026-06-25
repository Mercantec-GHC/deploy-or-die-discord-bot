import Enemy from "./enemy.js";

export default class ReverseProxy extends Enemy {
    constructor(encounter) {
        super(
            "Reverse Proxy", // Name
            1700, // HP
            30, // Attack
            encounter, // Encounter
            "A towering construct of mirrors and shifting data streams manifest before you, reflecting your truest of nature back at you. what a horrifying revalation roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.mirror_request, this.traffic_reflection]);
    }

    mirror_request(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.15);
        this.say("mirrors your own request and sends it back twice as sharp.");
        this.attack(player, dmg);
    }

    traffic_reflection() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("reflects traffic at random and catches multiple players off guard.");
        this.attack_random(2, dmg);
    }
}