import {startFileManager, exitFileManager} from "./components/startExit.js";
import readline from "readline";
import {getCurrentPathName, getHomeDir, goUp} from "./components/fileSystem.js";
import {stdin, stdout} from "process";
import {showListOfCommands} from "./components/commands.js";

export const fileManager = async () => {
  const userName = await startFileManager();
  let currentPath = getHomeDir();
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  })
  rl.setPrompt(`You are currently in ${currentPath}\n`);
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

      case 'up' :
        currentPath = goUp(currentPath);
        break;
      case 'cd' :
        break;
      case 'add' :
        break;
      case 'rn' :
        break;
      case 'cp' :
        break;
      case 'mv' :
        break;
      case 'rm' :
        break;
      case 'os' :
        break;
      case 'hash' :
        break;
      case 'compress' :
        break;
      case 'decompress' :
        break;

      default :
        stdout.write(`There is no command "${command}". To see available commands type "?". Go ahead and try again\n`);
    }
  })
};

await fileManager();
