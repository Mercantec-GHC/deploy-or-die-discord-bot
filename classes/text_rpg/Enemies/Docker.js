import Enemy from "./enemy.js"
import Dice from "../dice.js";

export default class Docker extends Enemy {
    constructor(encounter) {
        super(
            "Docker Container", // Name
            200, // HP
            10, // Attack
            encounter, // Encounter
            "A containerized enemy that can deploy various attacks." // Description
        );
    }
    
    
    special_attack(player) {
        super.special_attack(player, [this.composing_containers]);

        //let attacks = [
        //    this.composing_containers
        //]
        //let roll = Dice.roll(attacks.length);
        //attacks[roll - 1].call(this);
    }


    
    composing_containers() {
        this.say("composes more containers to attack!");

        this.attack_random(2);
    }


}