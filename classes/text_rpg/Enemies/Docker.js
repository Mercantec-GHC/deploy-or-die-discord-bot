import Enemy from "./enemy.js"
import Dice from "../dice.js";

export default class Docker extends Enemy {
    constructor(encounter) {
        super(
            "Docker Container", // Name
            200, // HP
            60, // Attack
            encounter, // Encounter
            "An endless series of rooms lay before you, you feel a pull towards the next door as though beckon by an existence deep within the code. Roll for initiative!" // Description
        );
    }
    
    
    special_attack(player) {
        super.special_attack(player, [this.composing_containers]);
    }


    
    composing_containers() {
        this.say("composes more containers to attack!");

        let abs_dmg = this.damage_calculator();

        this.attack_random(2, abs_dmg);
    }


}