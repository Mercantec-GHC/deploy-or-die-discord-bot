export default class Character {
    /**
     * @param {string} name
     * @param {number} hp
     * @param {number} atk
     * @param {import("./encounter.js").default} encounter
     */
    constructor(name, hp, atk, encounter){
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.encounter = encounter;
        this.is_alive = true;
    }

        

    /**
     * Applies incoming attack damage and updates alive status.
     * @param {number} dmg
     * @returns {void}
     */
    hit(dmg, attacker) {
        this.hp -= dmg;
        if(this.hp <= 0){
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
        console.log(character);
        this.say(`hit the [ ${character.name} ] for ( ${dmg} ) damage! It has ( ${character.hp - dmg} ) HP left.`);
        
        character.hit(dmg, this);
    }

    say(message) {
        this.encounter.messages_to_send.push(`[ ${this.name} ] ${message}`);
    }


    die() {
        this.say("have been defeated");
        this.is_alive = false;
    }

    

    
}