import Enemy from "./enemy.js";

export default class Canonicalization extends Enemy {
    constructor(encounter) {
        super(
            "Canonicalization", // Name
            420, // HP
            69, // Attack
            encounter, // Encounter
            "A twisting mass of tangled paths, aliases, and rewritten names. Every route seems different, yet all inevitably lead back to the same destination. It delights in turning certainty into confusion, stripping away disguises and forcing all things into their true form. Beware - what enters as one thing may emerge as another. roll for initiative!" // Description
        )
    }
}