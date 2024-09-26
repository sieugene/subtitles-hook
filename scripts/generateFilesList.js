import { readdirSync, writeFileSync } from "fs";
import { extname, basename } from "path";

const videoType = '.mp4'

export const generateFilesList = () => {
  const directoryPath = "./public";

  const files = readdirSync(directoryPath);

  const fileMap = {};
  files.forEach((file) => {
    const ext = extname(file);
    const nameWithoutExt = basename(file, ext).replace(/\s/g, "_");

    if (ext === videoType || ext === ".vtt") {
      if (!fileMap[nameWithoutExt]) {
        fileMap[nameWithoutExt] = {};
      }
      if (ext === videoType) {
        fileMap[nameWithoutExt].video = file;
      } else if (ext === ".vtt") {
        fileMap[nameWithoutExt].vtt = file;
      }
    }
  });

  const pairedFiles = Object.keys(fileMap)
    .filter((key) => {
      return fileMap[key].video && fileMap[key].vtt;
    })
    .map((key) => ({
      video: fileMap[key].video,
      vtt: fileMap[key].vtt,
    }));

  const outputFilePath = `./src/data/files.json`;
  writeFileSync(outputFilePath, JSON.stringify(pairedFiles, null, 2), "utf-8");

  console.log(`Data has been written to ${outputFilePath}`);
  return pairedFiles;
};

generateFilesList();
