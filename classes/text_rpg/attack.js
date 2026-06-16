export default class Attack {
   static max_dmg = 100;
   static min_dmg = 10;
   static abs_min_dmg = 1;
   static max_random_dmg = 10;
   static crit_chance = 5; // percentage
   static crit_multiplier = 3; // multiplier for critical hits
   static crit_fail_chance = 1; // percentage for critical failure

    constructor(message){
        let message_array = new Uint16Array([...message.trim().split("").map((c)=>c.charCodeAt(0))]);
        let sum = 0;
        let multiplier = 1;
        message_array.forEach(element => {                        
            sum += element;
        });


        if (Math.random() * 100 < Attack.crit_chance) {
            multiplier *= Attack.crit_multiplier; // Critical hit multiplies the damage
        } else if (Math.random() * 100 < Attack.crit_fail_chance) {
            multiplier = 0; // Critical failure results in no damage
        }


        // Calculate base damage from message sum with random variance
        const randomComponent = Math.floor(Math.random() * Attack.max_random_dmg);
        const baseDamage = sum + randomComponent;
        
        // Apply damage range constraints
        const cappedDamage = Math.max(Attack.min_dmg, baseDamage % Attack.max_dmg) + 1;
        
        // Ensure absolute minimum damage and apply multiplier
        this.dmg = Math.max(Attack.abs_min_dmg, cappedDamage * multiplier);


        //this.dmg = Math.max(1, Math.min(Attack.max_dmg, (sum + Math.floor(Math.random() * Attack.max_random_dmg))));

    } 
    
}