import puppeteer, { executablePath } from "puppeteer";

export class loginUser{
    username:string;
    password:string;
    browserPath:string
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

        
    }
}