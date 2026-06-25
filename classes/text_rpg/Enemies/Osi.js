import Enemy from "./enemy.js";

export default class Osi extends Enemy {
    constructor(encounter) {
        super(
            "OSI", // Name
            1000, // HP
            50, // Attack
            encounter, // Encounter
            "As you desend the layers of the network you lose your way, suddenly you get grabbed by a giant hand, it starts to encode you. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.layer_seven_crush, this.encapsulation]);
    }

    layer_seven_crush(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.3);
        this.say("drops all seven layers on top of your protocol stack.");
        this.attack(player, dmg);
    }

    encapsulation() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("encapsulates every packet and squeezes the whole party.");
        this.attack_all(dmg);
    }

    
}