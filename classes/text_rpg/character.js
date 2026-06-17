export default class Character {
    constructor(name, hp, atk){
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.is_alive = true;
    }

    hit(attack) {
        this.hp -= attack.dmg;
        if(this.hp <= 0){
            this.is_alive = false;
        }
    }

    
}