export default class Enemy {
    constructor(name, hp){
        this.name = name;
        this.hp = hp;
        this.is_alive = true;
    }
    hit(attack){
        this.hp -= attack.dmg;
        if(this.hp <= 0){
            this.is_alive = false;
        }
    }

}