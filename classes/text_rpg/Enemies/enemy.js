import Character from "../character.js";

export default class Enemy extends Character {
    constructor(name, hp, atk, desc) {
        super(name, hp, atk);
        this.desc = desc;
    }



    attack(character) {
        character.hit(this.atk);
    }


    attack_all(characters) {
        characters.forEach(character => {
            attack(character);
        });
    }

    vex(character) {

    }
}