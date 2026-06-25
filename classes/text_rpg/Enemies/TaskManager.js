import Enemy from "./enemy.js";

export default class TaskManager extends Enemy {
    constructor(encounter) {
        super(
            "Unresponsive Task Manager", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "On the wall before you is craved strange symbols and diagrams, as you attempt to decipher them a sharp pain shoots through your head, a cold voice whispers in your mind overwhelming you senses and thoughts with the sound of static. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.end_task, this.not_responding]);
    }

    end_task(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.25);
        this.say("selects your process and clicks End Task.");
        this.attack(player, dmg);
    }

    not_responding() {
        let dmg = Math.floor(this.damage_calculator() * 0.65);
        this.say("freezes the interface and everyone takes lag damage.");
        this.attack_all(dmg);
    }
}