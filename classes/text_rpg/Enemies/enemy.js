export default class Enemy {
    constructor(name, hp, atk, desc){
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.desc = desc;
        this.is_alive = true;
    }
    hit(attack){
        this.hp -= attack.dmg;
        if(this.hp <= 0){
            this.is_alive = false;
        }

    }



    
    counter_attack() {
        
    }
}