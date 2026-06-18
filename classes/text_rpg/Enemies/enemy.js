import Character from "../character.js";

export default class Enemy extends Character {
    constructor(name, hp, atk, encounter, desc) {
        super(name, hp, atk, encounter);
        this.desc = desc;
    }

    // Attacks all characters in the provided array.
    attack_all(characters) {
        characters.forEach(character => {
            attack(character, this.atk);
        });
    }

    vex(character) {

    }
}