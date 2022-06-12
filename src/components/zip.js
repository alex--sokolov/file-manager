import fs from 'fs';
import path from 'path';
import zlib from "zlib";
import {exist, logCurrentPath} from "./fileSystem.js";
import {stdout} from "process";
import {throwFsError} from "./errors.js";

export const compress = async (currentPath, pathToFile, pathToDestination) => {

  const sourceFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(currentPath, pathToFile);

  const distFile = path.isAbsolute(pathToDestination)
      ? pathToDestination
      : path.join(currentPath, pathToDestination);

  try {
    if (await exist(sourceFile)) {
      try {
        if (await exist(distFile)) {
          stdout.write(`Dist file already exists\n`);
          logCurrentPath(currentPath);
        } else {
          const readStream = fs.createReadStream(sourceFile);
          const writeStream = fs.createWriteStream(distFile);
          const brotli = zlib.createBrotliCompress();
          const stream = readStream.pipe(brotli).pipe(writeStream);
          stream.on('finish', () => {
            process.stdout.write('File was successfully compressed\n');
            logCurrentPath(currentPath);
          });
        }
      } catch (error) {
        throwFsError();
        logCurrentPath(currentPath);
      }
    } else {
      stdout.write(`Source file does not exist\n`);
      logCurrentPath(currentPath);
    }
  } catch (error) {
    throwFsError();
    logCurrentPath(currentPath);
  }


  // const gzip = createGzip();
  // const source = fs.createReadStream(fileInitial);
  // const destination = fs.createWriteStream(fileCompressed);
  // pipeline(source, gzip, destination, (err) => {
  //   if (err) {
  //     console.error('An error occurred:', err);
  //     process.exitCode = 1;
  //   }
  // });
};