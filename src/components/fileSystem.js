import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import os from 'os';
import {stdout} from "process";
import {access, readFile, writeFile} from "fs/promises";

export const getHomeDir = () => os.homedir();
export const logCurrentPath = (path) => {
  stdout.write(`You are currently in ${path}\n`);
}
export const getCurrentPathName = () => path.dirname(fileURLToPath(import.meta.url));
export const exist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};


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
export const readFromFile = async (currentPath, fileName) => {
  const pathToFile = path.join(currentPath, fileName);

  const infoStream = new fs.createReadStream(pathToFile, {encoding: 'utf-8'});

  infoStream.on('data', (data) => {
    if (data !== '') {
      process.stdout.write(`${data}\n`);
    }
  });

  infoStream.on('error', function(err){
    if(err.code === 'ENOENT'){
      stdout.write(`File does not exists\n`);
    }else{
      stdout.write(`Read Operation Failed\n`);
    }
  });

  infoStream.on('end',() => {
    logCurrentPath(currentPath);
  });
}

export const createFile = async (currentPath, fileName) => {
  const filePath = path.join(currentPath, fileName);
  try {
    if (await exist(filePath)) {
      stdout.write("FS operation failed\n");
    }
    await writeFile(filePath, '');
  } catch (error) {
    stdout.write("FS operation failed\n");
  }
};

