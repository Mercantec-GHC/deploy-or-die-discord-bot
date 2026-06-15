import EncounterKeywords from "./encounter_keywords.js";
export default class Keywords {

    constructor(message){
        this.keywords = message.trim().split(" ").filter((k)=>k.length > 0);



    }
    get encounter(){
        EncounterKeywords
        .forEach((k)=>{
            if(this.keywords.sort((a, b) => Math.random() - 0.5).includes(k)){
                return k;
            }
        });
        return null;
    }


}