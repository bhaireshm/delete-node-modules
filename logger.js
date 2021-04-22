const chalk = require("chalk");
var logName = "";
function log(msg) {
  console.log("\n" + chalk.yellowBright(logName + msg));
}

function logSuccess(msg) {
  console.log("\n" + chalk.green(logName + msg));
}

function logFileDeleted(msg) {
  console.log("[Deleted] " + chalk.red(msg));
}

function logFolderDeleted(msg) {
  console.log("[Deleted] " + chalk.red(msg));
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
