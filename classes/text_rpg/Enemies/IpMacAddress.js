import Enemy from "./enemy.js";

export default class IpMacAddress extends Enemy {
    constructor(encounter) {
        super(
            "Ip and Mac Ad Ress", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "The Twinheaded messenger Ip and Mac Ad Ress stands before you a terrifying amalgamation of static and shifting construction, in this case shooting the messenger is recommended. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.arp_spoofing, this.dhcp_shuffle]);
    }

    arp_spoofing(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.15);
        this.say("spoofs your ARP table and hijacks your next move.");
        this.attack(player, dmg);
    }

    dhcp_shuffle() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("shuffles addresses and hits random players in the confusion.");
        this.attack_random(2, dmg);
    }
}