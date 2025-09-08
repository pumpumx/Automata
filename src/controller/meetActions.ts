import { Page } from "puppeteer";

export class meetActions { //One thing i need to do is , in my class time is something like 1-12 , i need to get currTime in regular format 
    meetings: (string[] | null  );
    fullTime: (string  | null)
    meetTime: (string | null)
    constructor(meetings: (string[] | null)) {
        this.meetings = meetings;
    }

     extractTime(meetdata: string , currTime: number): boolean { //In this i need a array of times only which will be extracted through the meetings array
        const regex = /data-start="(\d{1,2}):\d{2}"/;

        console.log("meet data" , meetdata)
        const match:RegExpMatchArray | null = meetdata.match(regex);

        if (match && parseInt(match[1]) > currTime ) {
            this.fullTime = match[0];
            console.log("match: ",match)
            console.log("meet time:" , match[1]);
            return false;
            
        }
        return true; // No meet available
    }

    checkWhetherDateIsValid(): boolean { //One is local meetTime the invalidated one , and the this.meettime the validated one.
        const currTime = 10;
        console.log("currTime:", currTime);
        let numberOfMeetings = 0;
        const len = this.meetings?.length;
        console.log("meet len:", len)
        if (len && this.meetings) {
            console.log("Meetings at actions: \n" , this.meetings)
            while (numberOfMeetings < len && this.extractTime(this.meetings[numberOfMeetings] , currTime)) { 
                numberOfMeetings++;
            }
            if(this.fullTime){
                this.meetTime = this.fullTime
            }
            console.log("meetTime: ", this.meetTime);
        }
        if (this.meetTime) return true;
        return false;
    }

    async attendClass(myClassPage: Page) {
        const time = this.meetTime?.toString();
        const divAttr = `${this.fullTime}`;

        console.log("div attr", divAttr)
        await myClassPage.locator(`div.fc-time[${this.fullTime}]`).click();
        console.log("Redirected to class page successfully")
        //We will attend the class according the status field!! 
        await myClassPage.waitForSelector('#meetingStatusPlaceholder')
        const meetStatus = await myClassPage.$eval('#meetingStatusPlaceholder' , el => el.textContent?.trim());
        console.log("meetStatus" , meetStatus)
        if(meetStatus == "Not started yet") {
            console.log("Metting is yet to be started");
        }
        else{
            console.log("Would do it tomorrow")
        }

    }
}