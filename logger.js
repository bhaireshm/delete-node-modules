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

function logStatus(logData) {
  console.table(logData, ["status", "elapsedtime", "path"]);
}

module.exports = {
  log,
  logError,
  logStatus,
  logSuccess,
  logFileDeleted,
  logFolderDeleted,
  chalk,
};
