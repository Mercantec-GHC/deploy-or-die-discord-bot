import Enemy from "./enemy.js";

export default class Virus extends Enemy {
    constructor(encounter) {
        super(
            "Virus", // Name
            500, // HP
            60, // Attack
            encounter, // Encounter
            "A malicious program that can infect and disrupt systems. Roll for initiative!" // Description
        )
    }
}