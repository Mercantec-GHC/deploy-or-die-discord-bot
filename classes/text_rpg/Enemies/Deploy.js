import Enemy from "./enemy.js";

export default class Deploy extends Enemy {
    constructor(encounter) {
        super(
            "The Great Deployer", // Name
            1500, // HP
            50, // Attack
            encounter, // Encounter
            "In the middle of a horde of shambling creatures made of code, stands a cloaked figure, face hidden by a weird texture error as you look upon the creature, you are strangely drawn towards him almost as if you are being compelled by MAGS. roll for initiative!" // Description
        )
    }
}