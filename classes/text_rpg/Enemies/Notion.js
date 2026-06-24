import Enemy from "./enemy.js";

export default class Notion extends Enemy {
    constructor(encounter) {
        super(
            "Notion", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "A black book lays before you on a pedestal of green stone, it hums with a strange energy as you approach it, the moment your hand grasp the cover your mind is flooded with immesurable knowledge acompanied by a overwhelming pain, as the pain subsides you understand that knowledge and understanding are not always companions. roll for initiative!" // Description
        )
    }

    
}