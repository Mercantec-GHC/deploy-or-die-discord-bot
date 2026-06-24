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
}