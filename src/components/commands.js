import {stdout} from "process";

const commands = [
  'up',
  'cd path_to_directory',
  'ls',
  'add new_file_name',
  'rn path_to_file new_filename',
  'cp path_to_file path_to_new_directory',
  'mv path_to_file path_to_new_directory',
  'rm path_to_file',
  'os --EOL',
  'os --cpus',
  'os --homedir',
  'os --username',
  'os --architecture',
  'hash path_to_file',
  'compress path_to_file path_to_destination',
  'decompress path_to_file path_to_destination'
];

export const showListOfCommands = () => {
  stdout.write('- - - - - - - - - - - - - - - - -\n');
  stdout.write('AVAILABLE COMMANDS\n');
  stdout.write('- - - - - - - - - - - - - - - - -\n');
  commands.map(command => {
    stdout.write(`${command}\n`)
  })
  stdout.write('- - - - - - - - - - - - - - - - -\n');
}

