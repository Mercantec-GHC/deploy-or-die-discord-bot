import Enemy from "./enemy.js";

export default class Nginx extends Enemy {
    constructor(encounter) {
        super(
            "Nginx", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "The moment you lay your eyes on this creature your brain immidiately starts screaming warnings at you - it filles you with a primordial dread the being that was not suppose to be, the unborn, the lord of the void. roll for initiative!" // Description
        )
    }

    
}