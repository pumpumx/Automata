import { loginUser } from "./controller/login.ts";
import { meetActions } from "./controller/meetActions.ts";

 async function main(){
    const username = "12323003"
    const password = "JojoisDead@4300"
    const binary = "/usr/bin/google-chrome-stable"
    const loginObj  = new loginUser(username , password , binary)

     const meetings = await loginObj.redirectToWebsite();

    const meetObj = new meetActions(meetings);
    const meetTimeValid:boolean = meetObj.checkWhetherDateIsValid();

    if(meetTimeValid){
        await meetObj.attendClass(loginObj.myclassPage)
    }

    
}


main();