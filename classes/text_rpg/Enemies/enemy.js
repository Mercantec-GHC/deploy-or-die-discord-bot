export default class Enemy {
    constructor(name, hp){
        this.name = name;
        this.hp = hp;
    }
    hit(attack){
        this.hp -= attack.dmg;
    }
}