const readline = require("readline");
const fileName = "deleteAll.js";
var directory, startedAt;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "\nEnter Complete path (Enter to select currentpath): ",
  (userEnterdPath) => {
    userEnterdPath = userEnterdPath.replace(/"/g, "");
    console.log("Path: ", userEnterdPath);
    directory = userEnterdPath || process.cwd();
    startedAt = Date.now();
    console.info("Note: Don't close the the terminal.");
    console.info("Process started please wait...");

    // readFolderAndDelete(directory); // with logs
    deleteAllData(directory);
  }
);

function deleteAllData() {
  const rimraf = require("rimraf");
  rimraf(directory, function (err) {
    if (err) console.error(err);
    completedLog();
  });
}

function readFolderAndDelete(dir) {
  const fs = require("fs");
  const path = require("path");
  const folders = fs.readdirSync(dir);
  folders.forEach((f) => {
    try {
      f = path.join(dir, f);
      if (fs.lstatSync(f).isDirectory()) readFolderAndDelete(f);
      else {
        if (!f.includes(fileName)) fs.unlinkSync(f);
      }
      fs.rmdirSync(f, { recursive: true, retryDelay: 5 });
      console.info("[Deleted] ", f);
    } catch (error) {
      console.error(error);
    }
  });
  completedLog();
}

function completedLog() {
  console.info(`\nAll data deleted in "${directory}" path.`);
  const elapsedTime = Math.floor((Date.now() - startedAt) / 1000) + "s";
  console.log("Elapsed time", elapsedTime);
  process.exit(-1);
}
