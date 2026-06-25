import Enemy from "./enemy.js";

export default class FortiClient extends Enemy {
    constructor(encounter) {
        super(
            "FortiClient", // Name
            444, // HP
            44, // Attack
            encounter, // Encounter
            "Surely that is not just forty clients in a trench coat? roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.vpn_tunnel_ambush, this.endpoint_swarm]);
    }

    vpn_tunnel_ambush(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.15);
        this.say("opens a tunnel behind your guard and ambushes your endpoint.");
        this.attack(player, dmg);
    }

    endpoint_swarm() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("deploys a swarm of clients that peck at every connected player.");
        this.attack_all(dmg);
    }

    
}