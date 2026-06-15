import EncounterKeywords from "./encounter_keywords.js";
export default class Keywords {

    constructor(message){
        this.keywords = message.trim().toLowerCase().split(" ").filter((k)=>k.length > 0);



    }
    get encounter(){
        return EncounterKeywords 
        .filter((k)=>{
            if(this.keywords.sort((a, b) => Math.random() - 0.5).includes(k)){
                return k;
            }
        })[0];
        return null;
    }


}