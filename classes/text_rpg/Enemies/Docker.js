import Enemy from "./enemy.js"

export default class Docker extends Enemy {
    constructor(encounter) {
        super("Docker Container", 200, 10, encounter, "A containerized enemy that can deploy various attacks.");
    }   
}