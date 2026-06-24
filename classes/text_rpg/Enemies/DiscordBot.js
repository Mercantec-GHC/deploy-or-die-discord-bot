import Enemy from "./enemy.js";

export default class DiscordBot extends Enemy {
    constructor(encounter) {
        super(
            "Discord Bot", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "A helpful assistant that can perform various tasks and provide information within the Discord platform. roll for initiative!" // Description
        )
    }
}