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

    special_attack(player) {
        super.special_attack(player, [this.worker_process_storm, this.rewrite_loop]);
    }

    worker_process_storm() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("spawns a storm of worker processes that strike multiple targets.");
        this.attack_random(3, dmg);
    }

    rewrite_loop(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.25);
        this.say("locks you in a rewrite loop until your request collapses.");
        this.attack(player, dmg);
    }

    
}