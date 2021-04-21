const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const readline = require("readline");
const {
  log,
  logError,
  logSuccess,
  logFileDeleted,
  logFolderDeleted,
} = require("./logger");

var completePathName = "";
var deleteFolderName = "node_modules";
var currentNodeModulePath = path.join(__dirname, "");

// Start the process
readLine();

function readLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nEnter Complete path (Enter zero to stop): ", (ans) => {
    if (ans == "0") {
      log("Application stopped.");
      exit(0);
    } else {
      completePathName = ans;
      try {
        if (completePathName != null || completePathName != undefined) {
          logSuccess("Process started...");

          completePathName = completePathName.replace("\\node_modules", "");
          completePathName = completePathName.replace(/"/g, "");

          if (completePathName === currentNodeModulePath) {
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
          log("Path not found");
        }
      } catch (err) {
        logError(err);
      } finally {
        rl.close();
        completePathName = "";
        logSuccess("Process completed.");
        readLine();
      }
    }
  });
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
    fs.rmdirSync(path, {
      recursive: true,
      retryDelay: 10,
    }); // removes folder and its content
    logFolderDeleted("[Deleted Path] " + path);
  } catch (err) {
    logError(err);
  }
}

function deleteFile(file, path) {
  try {
    fs.unlinkSync(file);
    logFileDeleted("[Deleted File] " + file);
  } catch (err) {
    logError(err);
  }
}
