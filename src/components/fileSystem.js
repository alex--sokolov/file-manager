import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import os from 'os';
import {stdout} from "process";
import {access, writeFile, copyFile} from "fs/promises";
import {throwFsError} from "./errors.js";

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
    stdout.write(`Operation failed: Directory does not exists.\n`);
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

  infoStream.on('error', function (err) {
    if (err.code === 'ENOENT') {
      stdout.write(`Operation failed: File does not exists\n`);
    } else {
      stdout.write(`Operation failed: Read Operation Failed\n`);
    }
    logCurrentPath(currentPath);
  });

  infoStream.on('end', () => {
    logCurrentPath(currentPath);
  });
}

export const createFile = async (currentPath, fileName) => {
  const filePath = path.join(currentPath, fileName);
  try {
    if (await exist(filePath)) {
      stdout.write(`Operation failed: File already exists\n`);
    } else {
      await writeFile(filePath, '');
      stdout.write('File was created successfully\n');
    }
  } catch (error) {
    throwFsError();
  }
};

export const renameFile = async (currentPath, pathToFile, newFileName) => {
  const fileWithWrongName = path.resolve(currentPath, pathToFile);
  const fileWithProperName = path.resolve(currentPath, newFileName);

  await fs.access(fileWithProperName, fs.constants.F_OK, async (err) => {
    if (!err) {
      stdout.write(`${fileWithProperName} 'already exists\n`);
      logCurrentPath(currentPath);
    } else {
      await fs.rename(fileWithWrongName, fileWithProperName, function (err) {
        if (err) {
          stdout.write(`There is no file: ${fileWithWrongName}\n`);
          logCurrentPath(currentPath);
        } else {
          stdout.write('File was renamed successfully\n');
          logCurrentPath(currentPath);
        }
      });
    }
  });
}

export const copyFileToAnotherDir = async (currentPath, fileToCopy, pathToNewDirectory) => {

  const filePath = path.resolve(currentPath, fileToCopy);

  const newDirPath = path.isAbsolute(pathToNewDirectory)
      ? pathToNewDirectory
      : path.join(currentPath, pathToNewDirectory);

  const newFilePath = path.join(newDirPath, fileToCopy);

  console.log('filePath', filePath);
  console.log('newDirPath', newDirPath);
  console.log('newFilePath', newFilePath);

  try {
    if (await exist(newFilePath)) {
      stdout.write(`Operation failed: File already exists in specified directory\n`);
    } else {
      try {
        if (await exist(filePath)) {
          if (!await exist(newDirPath)) {
            fs.mkdir(newDirPath, (err) => {
              if (err) {
                throwFsError();
              }
            });
            stdout.write(`Directory ${pathToNewDirectory} was created successfully\n`);
          }
          try {
            await copyFile(filePath, newFilePath);
          } catch {
            stdout.write(`Error when copying file ${fileToCopy}\n`);
          }
          stdout.write('File was successfully copied\n');
        } else {
          stdout.write(`Operation failed: File does not exist\n`);
        }
      } catch (error) {
        throwFsError();
      }
    }
  } catch (error) {
    throwFsError();
  }
}