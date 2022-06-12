import {fileURLToPath} from "url";
import path from "path";
import os from 'os';
import {stdout} from "process";

export const getHomeDir = () => os.homedir();
export const getCurrentPathName = () => path.dirname(fileURLToPath(import.meta.url));
export const goUp = (currentPath) => {
  let newPath = currentPath.split(path.sep);
  if (newPath.length > 1) {
    newPath.pop();
    newPath = newPath.join(path.sep);
  }
  else newPath = currentPath;
  stdout.write(`You are currently in ${newPath}\n`);
  return newPath;
}