import {startFileManager, exitFileManager} from "./components/startExit.js";
import readline from "readline";
import {
  changeDirectory, createFile,
  getHomeDir,
  goUp,
  listDir, logCurrentPath, readFromFile
} from "./components/fileSystem.js";
import {stdin, stdout} from "process";
import {showListOfCommands} from "./components/commands.js";
import path from "path";
import fs from "fs";

export const fileManager = async () => {
  const userName = await startFileManager();
  let currentPath = getHomeDir();
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  })
  logCurrentPath(currentPath);
  rl.prompt();
  rl.on('SIGINT', () => exitFileManager(userName));
  rl.on('line', async (input) => {
    const inputArray = input.split(' ')
    const command = inputArray[0];

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
        currentPath = changeDirectory(currentPath, inputArray[1]);
        break;
      case 'ls' :
        listDir(currentPath);
        break;
      case 'cat' :
        await readFromFile(currentPath, inputArray[1]);
        break;
      case 'add' :
        await createFile(currentPath, inputArray[1]);
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
