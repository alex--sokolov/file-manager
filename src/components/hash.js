import crypto from 'crypto';
import path from 'path';
import {exist, logCurrentPath} from "./fileSystem.js";
import {readFile} from "fs/promises";
import {stdout} from "process";
import {throwFsError} from "./errors.js";

export const calculateHash = async (currentPath, fileName) => {
  const filePath = path.isAbsolute(fileName)
      ? fileName
      : path.join(currentPath, fileName);
  try {
    if (await exist(filePath)) {
      const content = await readFile(filePath, 'utf8');

      const hex = crypto
          .createHash('sha256')
          .update(content)
          .digest('hex');
      process.stdout.write(`${hex}\n`);
    } else {
      stdout.write(`Operation failed: There is no file ${fileName}\n`);
    }
  } catch (error) {
    throwFsError();
  }
};