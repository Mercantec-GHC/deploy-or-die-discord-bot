import Enemy from "./enemy.js";

export default class DNS extends Enemy {
    constructor(encounter) {
        super(
            "DNS", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "A sleek black obelisk looms before you, humming faintly with power. as you approach, it begins to pulse with an otherworldly energy. roll for initiative!" // Description
        )
    }
}