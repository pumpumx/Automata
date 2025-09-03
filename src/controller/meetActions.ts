import { Page } from "puppeteer";

export class meetActions {
    meetings: (string[] | undefined);
    attr = "data-start=";
    meetTime: (number | null)
    constructor(meetings: (string[] | undefined)) {
        this.meetings = meetings;
    }

    extractTime(meetdata: string): number { //In this i need a array of times only which will be extracted through the meetings array
        const regex = /data-start="(\d{2}):\d{2}"/;

        const match = meetdata.match(regex);
        if (match) {
            return parseInt(match[1]);
        }
        return -1;
    }

    checkWhetherDateIsValid(): boolean {
        const currTime = new Date().getHours();
        console.log("currTime:", currTime);
        let i = 0;
        const len = this.meetings?.length;
        if (len && this.meetings) {
            while (i < len && currTime > this.extractTime(this.meetings[i])) {
                i++;
            }
            this.meetTime = this.extractTime(this.meetings[i]);
            console.log("meettime: ",this.meetTime);
        }
        if (this.meetTime) return true;
        return false;
    }

    async attendClass(myClassPage:Page){
        const time = this.meetTime?.toString();
        const divAttr = `data-start"${time}:00"`;

        console.log("div attr",divAttr)
        await myClassPage.locator(`div.fc-time[data-start="${time}:00"]`).click();
        console.log("myclassPage",myClassPage)

        console.log("Redirected to class page successfully")

    }
}