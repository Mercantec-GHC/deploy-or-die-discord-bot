export default class Attack {
   static max_dmg = 100;
   static min_dmg = 10;
   static abs_min_dmg = 1;
   static max_random_dmg = 10;
   static crit_chance = 5; // percentage

    constructor(message){
        let message_array = new Uint16Array([...message.trim().split("").map((c)=>c.charCodeAt(0))]);
        let sum = 0;
        message_array.forEach(element => {                        
            sum += element;
        });

        


        this.dmg = ((sum + Math.floor(Math.random() * Attack.max_random_dmg)) % Attack.max_dmg) + 1;
        //this.dmg = Math.max(1, Math.min(Attack.max_dmg, (sum + Math.floor(Math.random() * Attack.max_random_dmg))));

    } 
    
}