import Character from "../character.js";

export default class Enemy extends Character {
    /**
     * Creates a new enemy character.
     * @param {string} name - The name of the enemy
     * @param {number} hp - The health points of the enemy
     * @param {number} atk - The attack power of the enemy
     * @param {import("../encounter.js").default} encounter - The encounter the enemy is part of
     * @param {string} desc - A description of the enemy
     */
    constructor(name, hp, atk, encounter, desc) {
        super(name, hp, atk, encounter);
        this.desc = desc;
    }

    /**
     * Handles being hit by an attacker, applying damage and potentially triggering a counter-attack.
     * @param {number} dmg - The amount of damage taken
     * @param {Character} attacker - The character who is attacking
     */
    hit(dmg, attacker) {
        console.log("attacker:", attacker)


        if (super.hit(dmg, attacker)) {
            this.counter_attack(attacker);
        }
    }

    /**
     * Performs a counter-attack against the attacker based on a random roll.
     * - If the roll is 5 or below, the counter-attack misses.
     * - If the roll is 20, the enemy performs a powerful attack against all players.
     * Otherwise, the enemy attacks the attacker with its standard attack stat.
     * @param {Character} attacker - The character who is attacking
     */
    counter_attack(attacker) {
        let roll = Math.floor(Math.random() * 20) + 1;
        
        if (roll <= 5) {
            this.say("missed");
            return;
        }
        
        if (roll == 20) {
            let players = this.encounter.players.values();
            console.log(players)


            this.attack_all(players);
            return;
        }
            
        this.attack(attacker, this.atk);
    }

    /**
     * Attacks all characters in the provided array.
     * @param {Iterable<Character>} characters - The array of characters to attack
     */
    attack_all(characters) {
        characters.forEach(character => {
            this.attack(character, this.atk);
        });
    }

    /**
     * Vexes a character, applying a special effect or debuff.
     * @param {Character} character - The character to vex
     */
    vex(character) {

    }
}