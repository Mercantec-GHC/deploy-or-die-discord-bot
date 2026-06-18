import Character from "../character.js";

export default class Enemy extends Character {
    constructor(name, hp, atk, encounter, desc) {
        super(name, hp, atk, encounter);
        this.desc = desc;
    }

    hit(dmg, attacker) {
        if (super.hit(dmg, attacker)) {
            this.counter_attack();
        }
    }


    counter_attack(attacker) {
        roll = Math.floor(Math.random() * 20) + 1;
        
        if (roll <= 5) {
            this.say("missed");
            return;
        }
        
        if (roll == 20) {

            this.attack_all(this.encounter.players.values());
            return;
        }
            
        this.attack(attacker, this.atk);
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