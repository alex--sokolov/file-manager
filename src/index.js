import {startFileManager, exitFileManager} from "./components/startExit.js";
import readline from "readline";
import {
  changeDirectory, copyFileToAnotherDir, createFile, deleteFile,
  getHomeDir,
  goUp,
  listDir, logCurrentPath, moveFileToAnotherDir, readFromFile, renameFile
} from "./components/fileSystem.js";
import {stdin, stdout} from "process";
import {showListOfCommands} from "./components/commands.js";
import {throwArgsError, throwFsError} from "./components/errors.js";

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
        if (inputArray.length < 2) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        currentPath = changeDirectory(currentPath, inputArray[1]);
        break;
      case 'ls' :
        listDir(currentPath);
        logCurrentPath(currentPath);
        break;
      case 'cat' :
        if (inputArray.length < 2) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await readFromFile(currentPath, inputArray[1]);
        break;
      case 'add' :
        if (inputArray.length < 2) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await createFile(currentPath, inputArray[1]);
        break;
      case 'rn' :
        if (inputArray.length < 3) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await renameFile(currentPath, inputArray[1], inputArray[2]);
        break;
      case 'cp' :
        if (inputArray.length < 3) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await copyFileToAnotherDir(currentPath, inputArray[1], inputArray[2]);
        logCurrentPath(currentPath);
        break;
      case 'mv' :
        if (inputArray.length < 3) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await moveFileToAnotherDir(currentPath, inputArray[1], inputArray[2]);
        logCurrentPath(currentPath);
        break;
      case 'rm' :
        if (inputArray.length < 2) {
          throwArgsError();
          logCurrentPath(currentPath);
          break;
        }
        await deleteFile(currentPath, inputArray[1]);
        logCurrentPath(currentPath);
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
