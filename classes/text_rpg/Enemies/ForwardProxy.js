import Enemy from "./enemy.js";

export default class ForwardProxy extends Enemy {
    constructor(encounter) {
        super(
            "Forward Proxy", // Name
            30, // HP
            1700, // Attack
            encounter, // Encounter
            "Floating in the air you see a construct of glass and steel, jagged edges and sheer planes inside it seemingly a black void, the being feels weirdly familiar. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.header_rewrite, this.chain_proxy]);
    }

    header_rewrite(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.1);
        this.say("rewrites your headers and routes your request through hostile nodes.");
        this.attack(player, dmg);
    }

    chain_proxy() {
        let dmg = Math.floor(this.damage_calculator() * 0.6);
        this.say("forms a proxy chain and batters multiple random targets.");
        this.attack_random(2, dmg);
    }
}