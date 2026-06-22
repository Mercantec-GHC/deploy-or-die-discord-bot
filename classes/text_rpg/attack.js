import Dice from "./dice.js";
import Keyword from "./keywords.js";
export default class Attack {
    //static max_random_dmg = 10;
    //static crit_chance = 5; // percentage
    //static crit_fail_chance = 1; // percentage for critical failure
    
    static min_dmg = 10;
    static max_dmg = 100;
    static abs_min_dmg = 1;
    
    static crit_multiplier = 3; // multiplier for critical hits
    static max_message_array_dmg = 10;
    static max_letter_dmg = 50;
    static letter_weight = 0.2;
    static dice_weight = 0.05;

    static buff_value = 10;
    static debuff = 20;

    constructor(message, player) {

        // Convert message to array of character codes and sum them

        this.letter_count = message.replace(/\s+/g, "").length;

        
        let message_array = new Uint16Array([...message.trim().split("").map((c)=>c.charCodeAt(0))]);
        let sum = 0;
        let multiplier = 1;
        message_array.forEach(element => {                        
            sum += element;
        });
        
        // the amount of letters times letter_weight
        let letter_dmg = Math.min(Math.floor(this.letter_count * Attack.letter_weight), Attack.max_letter_dmg);

        let message_array_dmg = sum % Attack.max_message_array_dmg + 1;


        let keywords = new Keyword(message);
        let buff_dmg = 0;
        
        if (keywords.buff) buff_dmg += Attack.buff_value;
        
        if (keywords.debuff) buff_dmg -= Attack.debuff;

        
        let pre_roll_dmg = letter_dmg + message_array_dmg + buff_dmg;


        this.roll = Dice.roll(20);

        if (this.roll == 1) multiplier = 0;
        if (this.roll == 20) multiplier = Attack.crit_multiplier;


        /*

            IMPLEMENT BUFFS AND DEBUFFS THAT AFFECT THE MULTIPLIER HERE

        */



        let post_roll_dmg = Math.min(Math.max(Math.floor(pre_roll_dmg + pre_roll_dmg * this.roll * Attack.dice_weight), Attack.min_dmg), Attack.max_dmg);

        /** @type {number} */
        this.dmg = Math.floor(Math.max((post_roll_dmg * multiplier), Attack.abs_min_dmg));






        // Determine if the attack is a critical hit or a critical failure
        //if (Math.random() * 100 < Attack.crit_chance) {
        //    multiplier *= Attack.crit_multiplier; // Critical hit multiplies the damage
        //} else if (Math.random() * 100 < Attack.crit_fail_chance) {
        //    multiplier = 0; // Critical failure results in no damage
        //}


        // Calculate base damage from message sum with random variance
        //const randomComponent = Math.floor(Math.random() * Attack.max_random_dmg);
        //const baseDamage = sum + randomComponent;

        //console.log(`Base Damage: ${baseDamage}, randomComponent: ${randomComponent}, multiplier: ${multiplier}`);
        
        // Apply damage range constraints
        //const cappedDamage = Math.max(Attack.min_dmg, baseDamage % Attack.max_dmg) + 1;
        //
        //console.log(`Capped Damage: ${cappedDamage}`);

        // Ensure absolute minimum damage and apply multiplier
        
        //this.dmg = Math.max(Attack.abs_min_dmg, cappedDamage * multiplier);

        //console.log(`Final Damage: ${this.dmg}`);


        //this.dmg = Math.max(1, Math.min(Attack.max_dmg, (sum + Math.floor(Math.random() * Attack.max_random_dmg))));


        
    } 
    
}