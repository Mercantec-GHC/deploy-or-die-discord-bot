import Enemy from "./enemy.js"
import Dice from "../dice.js";

export default class Docker extends Enemy {
    constructor(encounter) {
        super("Docker Container", 200, 10, encounter, "A containerized enemy that can deploy various attacks.");
    }
    
    
    special_attack(player) {
        let attacks = [
            this.composing_containers
        ]

       let roll = Dice.roll(attacks.length);
       attacks[roll - 1].call(this);
    }


    
    composing_containers() {
        this.say("composes more containers to attack!");

        this.attack_random(2);
    }


}