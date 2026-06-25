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
            
            this.open_the_gates();
            return;
        }

        super.counter_attack(attacker);
    }

    open_the_gates() {
        this.say("OPENS ITS GATE");
        this.attack_counter = 0;

        let encounter_index = Dice.roll(EncounterKeywords.length) -1;
        
        let new_encounters = [...getEnemyEncounter(EncounterKeywords[encounter_index], this.encounter) ?? []];

        if (new_encounters.length == 0) {
            this.say("But nothing came out of the gate.");
            return;
        }

        if(new_encounters.length >= 2){
            for(let enemy of new_encounters) {
                this.say(`${enemy.desc}`);
                
            }
            for(let enemy of new_encounters) {
                this.say(`You have encountered a [ ${enemy.name} ]! ( ${enemy.atk} )MB Bandwidth ( ${enemy.hp} )MB Available Memory.`);
            }
        }
        else{
            this.say(`${new_encounters[0].desc}`);
            this.say(`You have encountered a [ ${new_encounters[0].name} ]! ( ${new_encounters[0].atk} )MB Bandwidth ( ${new_encounters[0].hp} )MB Available Memory.`);
        }

        // Add each spawned enemy instance to the encounter roster.
        this.encounter.enemy.push(...new_encounters);
    }
    
}