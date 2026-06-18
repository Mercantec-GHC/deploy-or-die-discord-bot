export default class Dice {
    constructor(sides) {
        this.sides = sides;
    }

    roll() {
        return Dice.roll(this.sides);
    }

    static roll(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }
}