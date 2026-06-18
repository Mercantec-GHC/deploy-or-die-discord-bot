import Character from "./character.js";

export default class Player extends Character {
    /**
     * @param {string} name
     * @param {number} hp
     * @param {number} atk
     */
    constructor(name, hp, atk, encounter) {
        super(name, hp, atk, encounter);
    }


    /**
     * Attacks a target character with a generated attack value.
     * @param {Character} character
     * @param {import("./attack.js").default} attack
     * @returns {void}
     */

    attack(character, attack) {
        super.attack(character, attack.dmg);
    }
}