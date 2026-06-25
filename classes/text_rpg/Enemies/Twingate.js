import Dice from "../dice.js";
import getEnemyEncounter from "../encounter_enemy_classes.js";
import EncounterKeywords from "../encounter_keywords.js";
import Enemy from "./enemy.js";

export default class Twingate extends Enemy {
    constructor(encounter) {
        super(
            "Twingate", // Name
            300, // HP
            20, // Attack
            encounter, // Encounter
            "" // Description
        )
        this.attack_counter = 0;
    }

    counter_attack(attacker) {
        this.attack_counter++;

        if (this.attack_counter >= 5 && this.encounter.enemy.length == 1) {
            this.attack_counter = 0;
            this.open_the_gates();
            return;
        }

        super.counter_attack(attacker);
    }

    open_the_gates() {
        this.say("OPENS ITS GATE");

        let encounter_index = Dice.roll(EncounterKeywords.length) -1;
        
        let new_encounters = [...getEnemyEncounter(EncounterKeywords[encounter_index], this.encounter) ?? []];

        if(new_encounters.length >= 2){
            for(let enemy of new_encounters) {
                this.say(`${enemy.desc}\n`);
                
            }
            for(let enemy of new_encounters) {
                this.say(`You have encountered a [ ${enemy.name} ]! ( ${enemy.atk} )MB Bandwidth ( ${enemy.hp} )MB Available Memory.\n`);
            }
        }
        else{
            this.say(`${new_encounters[0].desc}\nYou have encountered a [ ${new_encounters[0].name} ]! ( ${new_encounters[0].atk} )MB Bandwidth ( ${new_encounters[0].hp} )MB Available Memory.`);
        }

        this.encounter.enemy.push(new_encounters);
    }
    
}