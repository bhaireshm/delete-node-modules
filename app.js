const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const readline = require("readline");
const {
  log,
  logError,
  logSuccess,
  logStatus,
  logFileDeleted,
  logFolderDeleted,
  chalk,
} = require("./logger");

var completePathName = "";
var deleteFolderName = "node_modules";
var currentNodeModulePath = path.join(__dirname, "");
var rl;
var logDataArr = [];
var logData = {};

// Start the process
readLine();

function readLine() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\nEnter Complete path (Enter zero to exit): ",
    (userEnteredPaths) => {
      if (!isEmpty(userEnteredPaths) && userEnteredPaths == "0") {
        log("Application stopped.");
        exit(0);
      } else {
        logSuccess("Process started...");
        var startedAt = Date.now();

        if (!isEmpty(userEnteredPaths)) {
          userEnteredPaths = userEnteredPaths.split(",");

          if (!isEmpty(userEnteredPaths)) {
            userEnteredPaths.forEach((uep) => {
              startedAt = Date.now();
              completePathName = uep;
              logData["path"] = uep;

              log("Checking path: " + completePathName + "\n");

              try {
                if (!isEmpty(completePathName)) {
                  completePathName = completePathName.replace(
                    "\\node_modules",
                    ""
                  );
                  completePathName = completePathName.replace(/"/g, "");

                  if (completePathName === currentNodeModulePath) {
                    // if (completePathName === "") {
                    log("You cannot delete current project's node_modules");
                  } else {
                    const folders = fs.readdirSync(completePathName);

                    if (folders && folders.length > 0) {
                      if (folders.some((f) => f == deleteFolderName)) {
                        // Check for the node_modules folder
                        checkFolderForNodeModules(folders, completePathName);
                      } else {
                        log("node_modules folder not found!!");
                        return;
                      }
                    } else {
                      log("No folders found in the path.");
                      return;
                    }
                  }
                } else {
                  log("Path not found / Empty Path.");
                }
              } catch (err) {
                logError(err);
                // logError(err.message);
              } finally {
                exitApp(startedAt, "");
              }
            });
          } else {
            log("Path not found");
            exitApp(startedAt, "invalid");
          }
        } else {
          log("Path cannot be empty");
          exitApp(startedAt, "invalid");
        }
      }
    }
  );
}

function exitApp(startedAt, status) {
  rl.close();
  rl = null;
  completePathName = "";
  const elapsedTime = Math.floor((Date.now() - startedAt) / 1000) + "s";
  logData["elapsedtime"] = elapsedTime;
  logData["status"] = status ? status : "completed";
  logDataArr.push(logData);
  logData = {};
  logStatus(logDataArr);
  // logSuccess("Process completed. Elapsed time: " + elapsedTime + "s");
  readLine();
}

// check all the folders, if node_modules folder present delete it.
function checkFolderForNodeModules(fldrs) {
  fldrs.forEach((packageFolderName, i) => {
    let packageFolderPath = path.join(
      completePathName,
      packageFolderName,
      "\\"
    );

    if (packageFolderName == deleteFolderName) {
      // Read the node_modules for installed packages
      readPackageFoldersAndDelete(packageFolderPath, packageFolderName);
    }
  });
}

function readPackageFoldersAndDelete(packageFolderPath, packageFolderName) {
  let packageChildFolders = fs.readdirSync(packageFolderPath);
  if (packageChildFolders.length > 0) {
    packageChildFolders.forEach((packageChildFolder) => {
      const p = path.join(packageFolderPath, packageChildFolder);

      if (fs.lstatSync(p).isDirectory()) {
        // recurse folder
        readPackageFoldersAndDelete(p);
      } else {
        // delete file
        deleteFile(p, packageFolderPath);
      }
    });

    deleteFolder(packageFolderPath);
  } else {
    deleteFolder(packageFolderPath);
    log("node_modules folder is empty");
  }
}

function deleteFolder(path) {
  try {
    fs.rmdirSync(path, { recursive: true, retryDelay: 5 });
    logFolderDeleted(path);
  } catch (err) {
    logError(err.message);
  }
}

function deleteFile(file, path) {
  try {
    fs.unlinkSync(file);
    logFileDeleted(file);
  } catch (err) {
    logError(err.message);
  }
}

function isEmpty(data) {
  if (typeof data == "number" || typeof data == "boolean") return false;
  if (typeof data == "undefined" || data === null) return true;
  if (typeof data.length != "undefined") return data.length == 0;
  let count = 0;
  for (let i in data) if (data.hasOwnProperty(i)) count++;
  return count == 0;
}
