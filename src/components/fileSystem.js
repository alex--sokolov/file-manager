import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import os from 'os';
import {stdout} from "process";

export const getHomeDir = () => os.homedir();
export const logCurrentPath = (path) => {
  stdout.write(`You are currently in ${path}\n`);
}
export const getCurrentPathName = () => path.dirname(fileURLToPath(import.meta.url));
export const goUp = (currentPath) => {
  let newPath = currentPath.split(path.sep);
  if (newPath.length > 1) {
    newPath.pop();
    newPath = newPath.join(path.sep);
  } else newPath = currentPath;
  logCurrentPath(newPath);
  return newPath;
}

export const listDir = (currentPath) => {
  fs.readdir(currentPath, (err, files) => {
    files.forEach(file => {
      stdout.write(`${file}\n`);
    });
  });
}

export const changeDirectory = (currentPath, dir) => {
  let newPath = path.isAbsolute(dir)
      ? dir
      : path.join(currentPath, dir);
  try {
    fs.accessSync(newPath, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    stdout.write(`Operation failed: Directory does not exists ${err}\n`);
    newPath = currentPath;
  }
  logCurrentPath(newPath);
  return newPath;
}