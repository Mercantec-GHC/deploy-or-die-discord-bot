import Character from "../character.js";
import Dice from "../dice.js";

export default class Enemy extends Character {

    static roll_weight = 0.05;
    /**
     * Creates a new enemy character.
     * @param {string} name - The name of the enemy
     * @param {number} hp - The health points of the enemy
     * @param {number} atk - The attack power of the enemy
     * @param {import("../encounter.js").default} encounter - The encounter the enemy is part of
     * @param {string} desc - A description of the enemy
     */
    constructor(name, hp, atk, encounter, desc) {
        super(name, hp, encounter);
        this.atk = atk;
        this.desc = desc;
    }

    /**
     * Handles being hit by an attacker, applying damage and potentially triggering a counter-attack.
     * @param {number} dmg - The amount of damage taken
     * @param {Character} attacker - The character who is attacking
     */
    hit(dmg, attacker) {
        if (super.hit(dmg, attacker)) {
            this.counter_attack(attacker);
        }
    }

    /**
     * Performs a counter-attack against the attacker based on a random roll.
     * - If the roll is 5 or below, the counter-attack misses.
     * - If the roll is between 6 and 17, the enemy attacks the attacker with its standard attack stat.
     * - If the roll is 18 or 19 and the enemy has a special attack, it performs the special attack.
     * - If the roll is 20, the enemy performs a powerful attack against all players.
     * Otherwise, the enemy attacks the attacker with its standard attack stat.
     * @param {Character} attacker - The character who is attacking
     */
    counter_attack(attacker) {
        this.encounter.messages_to_send.push(""); // Add a blank line for spacing
        
        let roll = Dice.roll(20);
        
        if (roll <= 5) {
            this.say("unknown error occurred");
            return;
        }

        
        if (roll >=18 && roll <= 19 && this.special_attack && typeof this.special_attack === "function") {
            this.special_attack(attacker, []);
            return;
        }
        
        if (roll == 20) {
            console.log("enemy hit a nat 20")

            
            this.attack_all();
            return;
        }
        let abs_dmg = this.damage_calculator();    

        this.attack(attacker, abs_dmg);
    }

    damage_calculator() {
        let roll_dmg = Dice.roll(20);

        return Math.floor(this.atk + this.atk * roll_dmg * Enemy.roll_weight);
    }

    /**
     * Performs a special attack on a player.
     * @param {Character} player - The player to attack
     * @param {Array<Function>} special_attacks - The list of special attacks
     */
    special_attack(player, special_attacks) {
        let abs_dmg = this.damage_calculator();

        if (special_attacks.length == 0) {
            this.attack(player, abs_dmg);
            return;
        }

        let roll = Dice.roll(special_attacks.length);
        special_attacks[roll - 1].call(this);
    }

    /**
     * Attacks all.
     */
    attack_all() {
        let players = Array.from(this.encounter.players.values());

        let abs_dmg = this.damage_calculator();

        players.forEach(character => {
            this.attack(character, abs_dmg);
        });
    }

    /**
     * Attacks a specified amount of random characters
     * @param {number} amount - The number of random characters to attack
     */
    attack_random(amount) {
        let players = Array.from(this.encounter.players.values()).sort(() => Math.random() - 0.5).slice(0, amount);

        let abs_dmg = this.damage_calculator();

        players.forEach(character => {
            this.attack(character, abs_dmg);
        });
    }

    /**
     * Vexes a character, applying a special effect or debuff.
     * @param {Character} character - The character to vex
     */
    vex(character) {

    }
}