import Enemy from "./enemy.js";

export default class DeployOrDie extends Enemy {
    constructor(encounter) {
        super(
            "Deployer of Die", // Name
            1111, // HP
            42, // Attack
            encounter, // Encounter
            "I think you might have misunderstood something. Roll for initiative!" // Description
        )
    }
}