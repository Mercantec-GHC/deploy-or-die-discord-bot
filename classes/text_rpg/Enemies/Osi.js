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

    
}