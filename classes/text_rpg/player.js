import Character from "./character.js";

export default class Player extends Character {
    constructor(name, hp, atk) {
        super(name, hp, atk);
    }


    attack(character, attack) {
        character.hit(attack.dmg);
    }
}