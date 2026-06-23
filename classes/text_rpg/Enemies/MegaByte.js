import Enemy from "./enemy.js";

export default class MegaByte extends Enemy {
    constructor(encounter) {
        super(
            "Mecha Byte", // Name
            1000, // HP
            0, // Attack
            encounter, // Encounter
            "Suddenly you are in an abbandoned building. You see a towering yet familiar bear shaped figure. roll for initiative!" // Description
        )
    }

    special_attack(player) {
        super.special_attack(player, [this.byte_of_87]);
    }


    byte_of_87(player) {
        this.say("WAS THAT THE BYTE OF 87!!!");

        this.attack(player, 870);
    }

}