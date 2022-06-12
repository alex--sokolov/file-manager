import {startFileManager, exitFileManager} from "./components/startExit.js";
import readline from "readline";
import {getCurrentPathName, getHomeDir} from "./components/fileSystem.js";
import {stdin, stdout} from "process";
import {showListOfCommands} from "./components/commands.js";

export const fileManager = async () => {
  const userName = await startFileManager();
  const currentPath = getCurrentPathName();
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  })
  rl.setPrompt(`You are currently in ${getHomeDir()}\n`);
  rl.prompt();
  rl.on('SIGINT', () => exitFileManager(userName));
  rl.on('line', (input) => {
    const command = input.split(' ')[0];

    switch (command) {
      case '?' :
        showListOfCommands();
        break;
      case '.exit' :
        exitFileManager(userName);
        break;
      default :
        stdout.write(`There is no command "${command}". To see available commands type "?". Go ahead and try again\n`);
    }
  })
};

await fileManager();
