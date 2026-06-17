export default class Character {
    /**
     * @param {string} name
     * @param {number} hp
     * @param {number} atk
     */
    constructor(name, hp, atk){
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.is_alive = true;
    }

    /**
     * Applies incoming attack damage and updates alive status.
     * @param {number} dmg
     * @returns {void}
     */
    hit(dmg) {
        this.hp -= dmg;
        if(this.hp <= 0){
            this.is_alive = false;
        }
    }

    
}