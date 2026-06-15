export default class Attack {
   
    constructor(message){
        this.dmg = 0
        let message_array = new Uint16Array([...message.trim().split("").map((c)=>c.charCodeAt(0))]);
        let sum = 0;
        message_array.forEach(element => {                        
            sum += element;
        });
        this.dmg = sum % Attack.max_dmg;

    } 
    static max_dmg = 20;
}