import { loginUser } from "./controller/login.js";
import { meetActions } from "./controller/meetActions.js";
import readline from "readline"
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import {dirname} from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = dirname(__filename)

 async function main(){
    const rl = readline.createInterface({ //Might use it further for asking question , no need for the time being
        input:process.stdin, 
        output:process.stdout
    })

    let username:string | undefined 
    let password:string | undefined
    let binary:string | undefined   
    const args = process.argv.slice(2);

    if(args.length > 0 &&  args.length == 3){
        username = args[0];
        password = args[1];
        binary = args[2];
        const fileWrite = await fs.writeFile('./credentials.txt' ,`${username},${password},${binary}`)
    }
    else{
        console.log("Checking for data from credentials file")
        console.log(__dirname)
        const data = await fs.readFile(path.join(__dirname,"../src/credentials.txt"),'utf-8')
        if(data){
            console.log("data exists: ",data);
            const newData = data.split(',')
            username = newData[0];
            password = newData[1];
            binary = newData[2];
        }
        else{
            console.log("Usage: node index.ts lpu-Username lpu-Password chromeBinaryPath")
        }
        
    }
    const loginObj  = new loginUser(username  , password , binary)

    const meetings = await loginObj.redirectToWebsite();

    const meetObj = new meetActions(meetings);
    const meetTimeValid:boolean = meetObj.checkWhetherDateIsValid();

    console.log("validity of meet time: " , meetTimeValid)
    if(meetTimeValid){
        await meetObj.attendClass(loginObj.myclassPage)
    }    
}


main();