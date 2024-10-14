import chokidar from "chokidar";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "..");

const folderToWatch = path.resolve(__dirname, "public");

const watcher = chokidar.watch(folderToWatch, {
  ignored: /(^|[\\/\\])\../,
  persistent: true,
});

watcher.on("all", (event, filePath) => {
  console.log(
    `${event} detected in ${filePath}. Running generateFilesList.js...`
  );

  exec("node ./scripts/generateFilesList.js", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Script error: ${stderr}`);
      return;
    }
    console.log(`Script output: ${stdout}`);
  });
});

console.log(`Watching for changes in ${folderToWatch}...`);
