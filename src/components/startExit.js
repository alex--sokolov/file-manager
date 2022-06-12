import {stdout} from "process";

export const parseArgs = () => {
  const args = [];
  process.argv.slice(2).join(' ').split('=').forEach(arg => {
    if (arg.includes('--') && arg.slice(0, 2) !== '--') {
      const newSplitted = arg.split('--');
      newSplitted.forEach((arg, index) => {
        if (index === 0) args.push(arg)
        else args.push(`--${arg}`);
      })
    }
    else args.push(arg);
  }
)

  const settings = [];
  let i = 0;
  while (i < args.length) {
    if ( args[i].slice(0, 2) === '--' ) {
        const param = args[i].slice(2).trim();
        if (param.includes('--')) throw new Error('incorrect parameter entered!')
        let value = (args[i + 1] && args[i + 1].slice(0, 2) !== '--')
            ? args[i + 1].trim()
            : null;
        const setting = {}
        setting[param] = value;
        settings.push(setting);
      }
    i++;
  }
  return settings;
};

export const getUserName = (args) => {
  return args.reduce((user, currentParam) => {
    user = Object.keys(currentParam)[0] === 'username'
    ? currentParam.username
    : user;
    return user;
  },[]);
}

export const startFileManager = async () => {
  const userName = getUserName(parseArgs());
  stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  return userName;
}

export const exitFileManager = (userName) => {
  stdout.write(`\n${userName}, good bye and have a nice day!\n`);
  process.exit(0);
}
