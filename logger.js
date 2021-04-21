const chalk = require("chalk");

function log(msg) {
  console.log("\n" + chalk.yellowBright(msg));
}

function logSuccess(msg) {
  console.log("\n" + chalk.greenBright(msg));
}

function logFileDeleted(msg) {
  console.log(chalk.magentaBright(msg));
}

function logFolderDeleted(msg) {
  console.log(chalk.magentaBright(msg));
}

function logError(msg) {
  console.log(new Error(msg));
}

module.exports = {
  log,
  logError,
  logSuccess,
  logFileDeleted,
  logFolderDeleted,
};
