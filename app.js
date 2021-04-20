const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var pathName = "";
var deleteFolderName = "node_modules";

readLine();

function readLine() {
  rl.question("Enter Complete path: ", (ans) => {
    pathName = ans;
    try {
      if (pathName != null || pathName != undefined) {
        console.log("\nprocessing please wait...\n");
        pathName = pathName.replace("\\node_modules", "");
        pathName = pathName.replace(`"`, "");

        const folders = fs.readdirSync(pathName);
        checkFolder(folders);
      } else {
        console.log("Path not found");
      }
    } catch (err) {
      print(err);
    } finally {
      rl.close();
      readLine();
    }
  });
}

// check all the folders for node_modules folder if present delete it.
function checkFolder(fldrs) {
  fldrs.forEach((fldr) => {
    // const stats = fs.statSync(fldr);
    // console.log(fldr);

    if (fldr == deleteFolderName) {
      let name = path.join(pathName, fldr, "\\");

      let packageFolders = fs.readdirSync(name);
      if (packageFolders.length > 0) {
        packageFolders.forEach((pf) => {
          const p = path.join(name, pf);
          deleteFolder(p);
        });
      } else {
        console.log(new Error("node_modules folder is empty"));
        deleteFolder(fldr);
      }
    } else {
      //   console.log(new Error("node_modules folder is empty / not found"));
      // check for the inner folders
      //   if (stats.isDirectory())
      //     console.log("node_modules not found in " + fldr + " folder");
      //   return;
    }
  });
}

function checkChildFolder(foldrName) {
  let packageFolders = fs.readdirSync(foldrName);
  packageFolders.forEach((pf) => {
    checkChildFolder(pf);
    deleteFolder(`${foldrName}\\${pf}`);
  });
}

function deleteFolder(path) {
  try {
    fs.rmdirSync(path, {
      recursive: true,
      retryDelay: 100,
    }); // removes folder and its content
    console.log("Deleted Path : " + path);
  } catch (err) {
    print(err);
  }
}

function print(err) {
  console.log("----------------------------------------------");
  console.log(err);
  console.error(err.message);
  console.log("----------------------------------------------");
  return;
}
