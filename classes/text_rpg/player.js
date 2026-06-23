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
        //super.attack(character, attack.dmg);

        

        if (!character.is_alive) {
            this.say(`made [${character.name}] have an overflow error`);

            // this.say(`kicked [${character.name}]'s unmoving body`);
        }
        else {
            if (attack.roll == 20) {
                this.say(`effectively flooded [ ${character.name} ]'s memory with ( ${attack.dmg} )MB of data and has ( ${character.hp - attack.dmg} )MB of available memory left.`)
                // this.say(`critically hit on [ ${character.name} ] for ( ${attack.dmg} ) damage and has ( ${character.hp - attack.dmg} ) HP left.`)
            }
            else this.say(`flooded [ ${character.name} ]'s memory for ( ${attack.dmg} )MB of data and has ( ${character.hp - attack.dmg} )MB of available memory left.`);
            // else this.say(`hit the [ ${character.name} ] for ( ${attack.dmg} ) damage and has ( ${character.hp - attack.dmg} ) HP left.`);

        }

        character.hit(attack.dmg, this);
    }


    
}