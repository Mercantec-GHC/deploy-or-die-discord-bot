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

    special_attack(player) {
        super.special_attack(player, [this.normalize_paths, this.strip_aliases]);
    }

    normalize_paths(player) {
        let dmg = Math.floor(this.damage_calculator() * 1.1);
        this.say("canonicalizes every route until there is only one painful destination.");
        this.attack(player, dmg);
    }

    strip_aliases(player) {
        let dmg = Math.floor(this.damage_calculator() * 0.75);
        this.say("strips your aliases and exposes your true endpoint.");
        this.attack(player, dmg);
        this.attack_random(1, dmg);
    }
}