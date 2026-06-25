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

    special_attack(player) {
        super.special_attack(player, [this.knowledge_dump, this.infinite_subpages]);
    }

    knowledge_dump(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.3);
        this.say("dumps forbidden knowledge directly into your short-term memory.");
        this.attack(player, dmg);
    }

    infinite_subpages() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("opens infinite nested subpages and everyone gets buried.");
        this.attack_all(dmg);
    }

    
}