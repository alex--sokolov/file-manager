import {stdout} from "process";

export const throwFsError = () => {
  stdout.write("FS operation failed\n");
};
export const throwArgsError = () => {
  stdout.write("Not enough arguments\n");
};