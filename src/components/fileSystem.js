import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import os from 'os';
import {stdout} from "process";
import {readFile} from "fs/promises";

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
export const readFromFile = async (currentPath, fileName) => {
  const pathToFile = path.join(currentPath, fileName);

  const infoStream = new fs.ReadStream(pathToFile, {encoding: 'utf-8'});

  infoStream.on('data', function(){
    let data = infoStream.read();
    console.log('data', data);
    if(data != null)
      process.stdout.write(`${data}\n`);
  });

  infoStream.on('error', function(err){
    if(err.code === 'ENOENT'){
      stdout.write(`File does not exists ${err}\n`);
    }else{
      stdout.write(`Read Operation Failed ${err}\n`);
    }
  });

  console.log('hhhhhhhhhhhhhhhh')

}

