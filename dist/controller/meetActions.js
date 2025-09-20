import { execSync } from "child_process";
export class meetActions {
    constructor(meetings) {
        if (meetings == null) {
            process.exit(1);
        }
        this.meetings = meetings;
    }
    extractTime(meetdata, currTime) {
        const regex = /data-start="(\d{1,2}):\d{2}"/;
        console.log("meet data", meetdata);
        const match = meetdata.match(regex);
        if (match) {
            const matchTimeInHour = parseInt(this.timeSynchronizer(parseInt(match[1])));
            if (matchTimeInHour >= currTime) {
                console.log("meet found: ", matchTimeInHour);
                this.fullTime = match[0];
                this.meetTime = this.timeSynchronizer(parseInt(match[1]));
                return true;
            }
        }
        return false; // No meet available
    }
    timeSynchronizer(time) {
        console.log("time at time Synchronizer: ", time);
        if (time >= 1 && time < 10) {
            console.log("Time is being changed", time + 12);
            return (time + 12).toString();
        }
        return time.toString(); //Damn pretty easy , i dont think i even need a function but its fine , it just looks cool enough
    }
    checkWhetherDateIsValid() {
        const currTime = new Date().getHours();
        console.log("currTime:", currTime);
        let numberOfMeetings = 0;
        const len = this.meetings?.length;
        console.log("meet len:", len);
        if (len && this.meetings) {
            console.log("Meetings at actions: \n", this.meetings);
            while (numberOfMeetings < len && !this.extractTime(this.meetings[numberOfMeetings], currTime)) {
                numberOfMeetings++;
            }
            console.log("meetTime: ", this.meetTime);
        }
        if (this.meetTime == undefined) {
            console.log("No meet Available to schedule");
            execSync("sleep 10");
            process.exit(1);
        }
        if (parseInt(this.meetTime) - currTime >= 1) {
            return false;
        }
        return true;
    }
    async attendClass(myClassPage) {
        try {
            const divAttr = `${this.fullTime}`;
            console.log("div attr", divAttr);
            await myClassPage.waitForSelector(`div.fc-time[${divAttr}]`, { timeout: 200000 });
            await myClassPage.locator(`div.fc-time[${divAttr}]`).click();
            console.log("Redirected to class page successfully , url: ", myClassPage.url());
            //We will attend the class according the status field!! 
            await myClassPage.waitForSelector('#meetingStatusPlaceholder');
            const meetStatus = await myClassPage.$eval('#meetingStatusPlaceholder', el => el.textContent?.trim()); //Dang the bug's fixed ! 
            console.log("meet Status", meetStatus);
            if (meetStatus == "Not started yet") {
                console.log("Meeting is yet to be started");
                execSync("sleep 10");
                process.exit(0);
            }
            else if (meetStatus == "Started") { //This is the part where the meeting would be started , need to do it tomorrow asap!! also need to fix the time thing .
                await myClassPage.waitForSelector('a[role="button"]');
                await myClassPage.locator('a[role="button"]').click();
                // await myClassPage.waitForSelector('button[aria-label="Microphone"]', { timeout: 10000000 }) //Timeout has been increased as it takes time to load the meet 
                // const buttonVal = await myClassPage.$$eval(`button`, el => el.map((textContent) => textContent.innerText))
                // console.log("Button Val", buttonVal);
                console.log("Meet Joined Successfully");
            }
            else {
                console.log("Your meet has ended ");
                process.exit(0);
            }
        }
        catch (error) {
            console.log("Some error occured while attending meet ", error);
        }
    }
}
