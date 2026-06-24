import Enemy from "./enemy.js";

export default class ReverseProxy extends Enemy {
    constructor(encounter) {
        super(
            "Reverse Proxy", // Name
            1700, // HP
            30, // Attack
            encounter, // Encounter
            "A towering construct of mirrors and shifting data streams manifest before you, reflecting your truest of nature back at you. what a horrifying revalation roll for initiative!" // Description
        )
    }
}