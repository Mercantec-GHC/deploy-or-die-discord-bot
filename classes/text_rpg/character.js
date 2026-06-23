export default class Character {
    /**
     * Creates a new character instance.
     * @param {string} name - The name of the character
     * @param {number} hp - The health points of the character
     * @param {import("./encounter.js").default} encounter - The encounter the character is part of
     */
    constructor(name, hp, encounter) {
        this.name = name;
        this.hp = hp;
        this.encounter = encounter;
        this.is_alive = true;
    }

    // EVENTUELT IMPLEMENTER STUN EFFEKTER OG ANDRE DEBUFFS SOM KAN PÅVIRKE SPILLERENS EVNE TIL AT ANGRIBE ELLER MODTAGE ANGREB

    /**
     * Applies incoming attack damage and updates alive status.
     * @param {number} dmg - The amount of damage taken
     * @param {Character} attacker - The character who is attacking
     * @returns {boolean} - Returns true if the character is still alive, false if dead
     */
    hit(dmg, attacker) {
        this.hp -= dmg;
        if(this.hp <= 0 && this.is_alive) {
            this.die();
            return false;
        }
        return true;
    }

    /**
     * Attacks a character, applying damage based on this enemy's attack stat.
     * @param {Character} character
     * @param {number} dmg
     * @returns {void}
     */
    attack(character, dmg) {
        if (dmg <= 0) {
            this.miss();
            return;
        }

        if (!character.is_alive) {
           this.say(`made [${character.name}] have an overflow error`);
            // this.say(`kicked [${character.name}]'s unmoving body`);
        }
        else this.say(`flooded [ ${character.name} ]'s memory for ( ${dmg} )MB of data and has ( ${character.hp - dmg} )MB of available memory left.`);
        // else this.say(`hit the [ ${character.name} ] for ( ${attack.dmg} ) damage and has ( ${character.hp - attack.dmg} ) HP left.`);
        
        character.hit(dmg, this);
    }

    /**
     * Sends a message to the encounter's message queue.
     * @param {string} message - The message to send
     */
    say(message) {
        this.encounter.messages_to_send.push(`[ ${this.name} ] ${message}`);
    }


    /** Handles character death, updating status and sending a death message. */
    die() {
        this.say("have been defeated");
        this.is_alive = false;
    }

    miss() {
        this.say("ran into an unknown error");
    }

    
}