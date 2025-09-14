import puppeteer, { executablePath, Page } from "puppeteer";

export class loginUser {
    username: string | undefined;
    password: string | undefined;
    browserPath: string | undefined;

    myclassPage: Page;

    constructor(username: string | undefined, password: string | undefined, browserPath: string | undefined) {
        if(!username || !password || !browserPath){
            console.log("Required fields are missing!!!!");
            process.exit(1);
        }
        this.username = username;
        this.password = password;
        this.browserPath = browserPath;
    }


    async redirectToWebsite() {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                executablePath: this.browserPath
            })

            const page = await browser.newPage();

            await page.goto("https://myclass.lpu.in");

            await page.type("input[name='i']", this.username as string);
            await page.type("input[name='p']", this.password as string);

            await page.locator('button').filter((log) => log.type == 'submit').click();

            await page.waitForSelector('a[aria-label="View Classes and Meetings"]', { timeout: 100000 });
            await page.locator('a[aria-label="View Classes and Meetings"]').click();

            await page.waitForSelector('div.fc-content');
            const meetings: (string[] | null) = await page.$$eval('div.fc-content', meet => meet.map((ele) => ele.innerHTML));
            console.log("meetings: ", meetings)

            if (meetings) {
                this.myclassPage = page;
            }
            else {
                console.log("No meetings available for today!!");
                process.exit(1);
            }
            return meetings;
        } catch (error) {
            if (error.name == "TimeoutError") {
                console.log("No avaiable meeting found ");
            }
            else {
                console.log("Error occured while getting today's meetings", error)
            }
            return null;
        }
    }
}