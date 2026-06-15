export default class Encounter {
        static encounter_chance = 20; // percentage
    constructor(keyword){
        this.keyword = keyword;
        this.is_encountered = Math.random() * 100 < Encounter.encounter_chance;
    }

}