import Enemy from "./enemy.js";
import Lesson from "./MercantecLesson.js";

export default class Mercantec extends Enemy {
    constructor(encounter) {
        super(
            "Mercantec", // Name
            300, // HP
            50, // Attack
            encounter, // Encounter
            "A legendary institution where students battle ancient foes such as Deadlines, Group Projects, and Documentation. Its workshops are filled with strange machines, while its computer labs glow long into the night. Those who survive its trials emerge armed with practical skills and an unhealthy relationship with caffeine. roll for initiative!" // Description
        )
    }
        special_attack(player) {
        super.special_attack(player, [this.start_lesson]);
    }


    start_lesson(player) {
        this.say("the bell has rung it is time for learning");

       new Lesson(this.encounter)
    }
    
}