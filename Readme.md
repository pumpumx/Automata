# MyClass 🎓  
Automate your LPU online classes with ease.  

`Proxy-Bot` is a Node.js + TypeScript project that uses **Puppeteer** to automatically attend online classes on your behalf. With the power of **cron jobs** and **bash scripts**, you can schedule and run the automation reliably without lifting a finger.  

---

## 🚀 Features  
- ✅ **Automated Class Attendance** – Join your online class automatically using Puppeteer.  
- ✅ **Cross-Platform Setup** – Works on Linux/macOS (tested with Bash scripts).  
- ✅ **Scheduled Runs** – Cron jobs handle starting/stopping the script at exact times.  
- ✅ **Headless Mode** – Option to run without a visible browser. 
- ✅ **Customizable** – Update schedule, class links, or login credentials easily.  

---

## 🛠️ Tech Stack  
- **Node.js + TypeScript** – Core logic and Puppeteer automation.  
- **Puppeteer** – Browser automation (Chrome/Chromium).  
- **Cron** – Job scheduling.  
- **Bash** – Script automation for smooth execution.  

---

## ⚙️ Installation & Setup  
1. Clone this repository:  
   ```bash
   git clone https://github.com/pumpumx/ProxyBot.git
   cd ProxyBot

## Install dependencies:
    pnpm install or npm install {whatever you prefer or whatever works for you}

## Setting up credentials
    script usage : node dist/index.js Lpu-userId Lpu-Password ChromeBinaryPath , This will create a credentials.txt file
            file data -> lpu-userId,Lpu-Password,BinaryExecutablePath 
            You may even create this manually , if you are facing few errors!
        ChromeBinaryPath -> It is the path where your chrome binary is located!!! check your /usr/bin 
        there'll be something like -> /usr/bin/chrome || /usr/bin/google-chrome-stable 

## ⏰ Automating with Cron
    The most important part , to automate the script you need to be familiar with cronJobs , please do your homework with cronjobs if you are not familiar with it
        0 11 * * * /usr/bin/node /path/to/Proxy-Bot/dist/index.js >> /home/username/cronLog.log 2>&1 //This will run the script everyday at exactly 11 AM
            Recommendations Important: 
                If you are using linux , then you need to set the DISPLAY environmental variable , as the cronjobs don't have the authority to run a gui display ,
                 in order to fix this , check your DISPLAY enviromental variable with : ~echo $DISPLAY` ,
                    You'll get a value either 0 or 1 or whatever it is!!  
                Then you need to add the authorization for the current user to gui via cronjobs
                xhost +SI:localuser:`yourUsername`

                check with the following command -> xhost
            So the cron command would look something like this
                0 11 * * * DISPLAY=:1 /usr/bin/node /path/to/Proxy-Bot/dist/index.js >> /home/hostUsername/cronLog.log 2>&1 //Don't worry the later part is just logging our any errors
            Change the cronjobs according to your own time table!!
            Tip -> Suppose if your class is at 11:00AM , then always schedule your cronjob of 11:07 or 11:10 , don't worry the script will work anyways , and slight modificaton by professrors will be adjusted accordinglly.

## 📅 Roadmap / Future Versions

    🤖 Bot Chat Reply – Auto-reply in the chat if the teacher asks something.
    🎤 Voice Detection – Detect keywords like your name being called.
    📊 Attendance Tracker – Log attendance in a local file or Google Sheets.
    📱 Mobile App Integration – Trigger or monitor from your phone.
    ☁️ Cloud Deployment – Run on a server 24/7 (no need to keep PC on). //This option is also feasible but i would recommened running it in your local computer , as the error's can always be caught
    🍓 Raspberry Pi Support – Configure MyClass to run on a Raspberry Pi for a low-cost, always-on class automation setup.

## 🧾 License
    This project is licensed under the MIT License.

## 🙌 Contributing
    Contributions are welcome! Feel free to open issues and PRs for new ideas, bug fixes, or feature requests.