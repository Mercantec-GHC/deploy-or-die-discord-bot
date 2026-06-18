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


    die() {
        super.die();

        let alive_players = Array.from(this.encounter.players.values()).filter(player => player.is_alive);
        console.log("alive players", alive_players);

        if (alive_players.length == 0) {
            console.log("GAME OVER")

            this.encounter.game_end("Everyone died");
        } 
    }
}