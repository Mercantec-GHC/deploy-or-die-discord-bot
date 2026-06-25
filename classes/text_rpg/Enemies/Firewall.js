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

    special_attack(player) {
        super.special_attack(player, [this.deep_packet_inspection, this.block_all_incoming]);
    }

    deep_packet_inspection(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.2);
        this.say("deep-inspects your payload and burns every suspicious byte.");
        this.attack(player, dmg);
    }

    block_all_incoming() {
        let dmg = Math.floor(this.damage_calculator() * 0.75);
        this.say("drops all incoming traffic and scorches everyone at the perimeter.");
        this.attack_all(dmg);
    }
}