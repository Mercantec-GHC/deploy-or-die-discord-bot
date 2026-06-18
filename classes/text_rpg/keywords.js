import EncounterKeywords from "./encounter_keywords.js";
export default class Keyword {

    constructor(message){
        //this.keywords = message.trim().toLowerCase().split(" ").filter((k)=>k.length > 0);

        this.message = message.trim().toLowerCase();
    }

    // An encounter keyword found in the message, or null if none are found.
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

}