import { loginUser } from "./controller/login.ts";





 async function main(){

    const username = "12323003"
    const password = "JojoisDead@4300"
    const binary = "/usr/bin/google-chrome-stable"
    const loginObj  = new loginUser(username , password , binary)

    await loginObj.redirectToWebsite();
}


main();