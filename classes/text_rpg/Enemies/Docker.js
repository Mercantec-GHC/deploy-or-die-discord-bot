import Enemy from "./enemy.js"

export default class Docker extends Enemy {
    constructor(encounter) {
        super("Docker Container", 1000, 10, encounter, "");
    }
}