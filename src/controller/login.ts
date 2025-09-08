import puppeteer, { executablePath, Page } from "puppeteer";

export class loginUser{
    username:string;
    password:string;
    browserPath:string;

    myclassPage:Page;

    constructor(username:string, password:string , browserPath:string){
        this.username = username;
        this.password = password;
        this.browserPath = browserPath;
    }


    async redirectToWebsite(){
        const browser = await puppeteer.launch({
            headless:false,
            executablePath:this.browserPath
        })

        const page  = await browser.newPage();

        await page.goto("https://myclass.lpu.in");

        await page.type("input[name='i']" , this.username);
        await page.type("input[name='p']" , this.password);

        await page.locator('button').filter((log)=>log.type == 'submit').click();

        await page.waitForSelector('a[aria-label="View Classes and Meetings"]');
        await page.locator('a[aria-label="View Classes and Meetings"]').click();

        await page.waitForSelector('div.fc-content');
        const meetings:(string[] | null) = await page.$$eval('div.fc-content' , meet => meet.map((ele)=>ele.innerHTML));
        console.log("meetings: ", meetings)

        if(meetings){
            this.myclassPage = page;
        }
        console.log("myclass",this.myclassPage)
        return meetings  ;

    }
}