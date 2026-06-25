import Enemy from "./enemy.js";

export default class Deploy extends Enemy {
    constructor(encounter) {
        super(
            "The Great Deployer", // Name
            1500, // HP
            50, // Attack
            encounter, // Encounter
            "In the middle of a horde of shambling creatures made of code, stands a cloaked figure, face hidden by a weird texture error as you look upon the creature, you are strangely drawn towards him almost as if you are being compelled by MAGS. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.blue_green_rollout, this.forced_hotfix]);
    }

    blue_green_rollout(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.25);
        this.say("ships a blue-green rollout and you are routed to the unstable environment.");
        this.attack(player, dmg);
    }

    forced_hotfix(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.8);
        this.say("pushes a panic hotfix that destabilizes the whole cluster.");
        this.attack_all(dmg);
    }
}