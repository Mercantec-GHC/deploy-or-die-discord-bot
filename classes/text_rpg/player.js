import Character from "./character.js";
import Encounter from "./encounter.js";

export default class Player extends Character {
    /**
     * @param {string} name
     * @param {number} hp
     * @param {Encounter} encounter
     */
    constructor(name, hp, encounter) {
        super(name, hp, encounter);
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