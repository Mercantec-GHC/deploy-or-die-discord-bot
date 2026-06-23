import Enemy from "./enemy.js";

export default class TaskManager extends Enemy {
    constructor(encounter) {
        super(
            "Unresponsive Task Manager", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "on the wall before you is craved strange symbols and diagrams, as you attempt to decipher them a sharp pain shoots through your head, a cold voice whispers in your mind overwhelming you senses and thoughts with the sound of static. roll for initiative!" // Description
        )
    }
}