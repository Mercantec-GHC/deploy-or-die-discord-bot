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
}