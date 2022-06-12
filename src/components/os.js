import {stdout} from "process";
import os from "os";
import {showListOfOSParams} from "./commands.js";

export const osInfo = (param) => {
  switch (param) {
    case '--EOL':
      stdout.write(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}\n`);
      break;
    case '--cpus':
      const info = os.cpus();
      stdout.write(`Overall amount of CPUS: ${info.length}\n`)
      const coresInfo = info.map(({model, speed}) => ({model, speed}));
      stdout.write('CPUs model and clock rate:\n');
      console.log(coresInfo);
      break;
    case '--homedir':
      stdout.write(`Home directory: ${JSON.stringify(os.homedir())}\n`);
      break;
    case '--username':
      stdout.write(`System user name: ${JSON.stringify(os.userInfo().username)}\n`);
      break;
    case '--architecture':
      stdout.write(`CPU architecture: ${JSON.stringify(os.arch())}\n`);
      break;
    case '?':
      showListOfOSParams();
      break;
    default:
      stdout.write(`There is no parameter "${param}". To see available os parameters type "os ?". Go ahead and try again\n`);
  }
}

console.log(JSON.stringify(os.EOL));