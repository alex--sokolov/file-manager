import {fileURLToPath} from "url";
import path from "path";
import os from 'os';

export const getHomeDir = () => os.homedir();
export const getCurrentPathName = () => path.dirname(fileURLToPath(import.meta.url));