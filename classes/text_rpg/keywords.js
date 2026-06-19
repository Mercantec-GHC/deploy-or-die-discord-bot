import EncounterKeywords from "./encounter_keywords.js";
import BuffKeywords from "./buff_keywords.js";
import DebuffKeywords from "./debuff_keywords.js";
export default class Keyword {

    constructor(message) {
        this.message = message.trim().toLowerCase().replaceAll("-", " ").replaceAll("_", " ");
    }

    // An encounter keyword found in the message, or null if none are found.
    /** @returns {string|null} */
    get encounter() {
        let keywords = [...EncounterKeywords].sort((a, b) => Math.random() - 0.5);

        for (const keyword of keywords) {
            
            if (this.message.includes(keyword)) {
                console.log(keyword);

                return keyword;
            }
        }

        //return [
        //    ...EncounterKeywords
        //] 
        //.filter((k)=>{
        //    if(this.keywords.sort((a, b) => Math.random() - 0.5).includes(k)){
        //        return k;
        //    }
        //})[0];

        return null;
    }

    get buff() {
        let keywords = [...BuffKeywords].sort((a, b) => Math.random() - 0.5);

        for (const keyword of keywords) {
            
            if (this.message.includes(keyword)) {
                console.log(keyword);

                return keyword;
            }
        }

        return null;
    }

    get debuff() {
        let keywords = [...DebuffKeywords].sort((a, b) => Math.random() - 0.5);

        for (const keyword of keywords) {
            
            if (this.message.includes(keyword)) {
                console.log(keyword);

                return keyword;
            }
        }

        return null;
    }
}