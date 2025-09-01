export class meetActions{
    meetings:(string[] | undefined);


    constructor(meetings:(string[] | undefined)){
        this.meetings = meetings;
    }

    extractTime(){ //In this i need a array of times only which will be extracted through the meetings array
        
    }

    async checkWhetherDateIsValid():Promise<boolean>{
        const currTime = new Date().getHours();
        console.log("currTime: " , currTime);

        return true;
    }
}