const chalk = require("chalk");
var logName = "";
function log(msg) {
  console.log("\n" + chalk.yellowBright(logName + msg));
}

function logSuccess(msg) {
  console.log("\n" + chalk.greenBright(logName + msg));
}

function logFileDeleted(msg) {
  console.log(chalk.magentaBright(msg));
}

function logFolderDeleted(msg) {
  console.log(chalk.magentaBright(msg));
}

function logError(msg) {
  console.log(
    chalk.red("---------------------------------------------------\n"),
    chalk.red(msg),
    chalk.red("\n---------------------------------------------------")
  );
}

module.exports = {
  log,
  logError,
  logSuccess,
  logFileDeleted,
  logFolderDeleted,
  chalk,
};
