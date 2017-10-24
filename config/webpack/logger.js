import chalk from 'chalk';

const headerStyle = chalk.whiteBright.bold;

export const logBoolFlag = (flag, message) => {
  if (flag === true) {
    console.log(chalk.greenBright(message));
  } else {
    console.log(chalk.redBright(message));
  }
};

export const log = (...message) => {
  console.log(chalk.whiteBright(message));
};

export const important = (...message) => {
  message.forEach((m) => console.log(chalk.greenBright(m)));
};

export const emptyLine = (numberOfLines = 1) => {
  for (let i = 0; i < numberOfLines; i++) {
    console.log();
  }
};

export const header = (message) => {
  console.log(headerStyle(message));
};
