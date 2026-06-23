import Enemy from "./enemy.js";

export default class GreenPig extends Enemy {
    constructor(encounter) {
        super(
            "Green Tall Pig", // Name
            500, // HP
            50, // Attack
            encounter, // Encounter
            "Before you stands a tall green creature with the face of a pig and the posture of a man. It says nothing. It merely hisses. Every instinct screams that you should be somewhere else. Roll for initiative! " // Description
        )
    }
    special_attack(player) {
        super.special_attack(player, [this.minecraft_anguish_noises]);
    }


    minecraft_anguish_noises(player) {
        this.say("shhhhhhhh...booom");

        this.attack_all();
    }

}