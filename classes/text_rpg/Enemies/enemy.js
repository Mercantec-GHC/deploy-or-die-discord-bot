import Character from "../character.js";

export default class Enemy extends Character {
    constructor(name, hp, atk, desc) {
        super(name, hp, atk);
        this.desc = desc;
    }


    // Attacks a character, applying damage based on this enemy's attack stat.
    attack(character) {
        character.hit(this.atk);
    }

    // Attacks all characters in the provided array.
    attack_all(characters) {
        characters.forEach(character => {
            attack(character);
        });
    }

    vex(character) {

    }
}