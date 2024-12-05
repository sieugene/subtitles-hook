/* eslint-disable no-undef */
import "dotenv/config";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { extname, basename, dirname } from "path";

const videoType = process.env.SUPPORT_VIDEO_TYPE;
const subType = process.env.SUPPORT_SUB_TYPE;
const translateSubType = process.env.SUPPORT_TRANSLATE_SUB_TYPE;

export const generateFilesList = () => {
  const directoryPath = "./public/files";

  const files = readdirSync(directoryPath);

  const fileMap = {};
  files.forEach((file) => {
    const ext = extname(file);
    const nameWithoutExt = basename(file, ext).replace(/\s/g, "_");

    switch (ext) {
      case videoType:
        fileMap[nameWithoutExt] = { ...fileMap[nameWithoutExt], video: file };
        return;
      case subType:
        fileMap[nameWithoutExt] = {
          ...fileMap[nameWithoutExt],
          subtitles: file,
        };
        return;
      case translateSubType:
        fileMap[nameWithoutExt] = {
          ...fileMap[nameWithoutExt],
          translate: file,
        };
        return;
      default:
        break;
    }
  });

  const pairedFiles = Object.keys(fileMap)
    .filter((key) => {
      return fileMap[key].video && fileMap[key].subtitles;
    })
    .map((key) => {
      const hasTranslate = !!fileMap[key].translate;
      return {
        video: `/files/${fileMap[key].video}`,
        subtitles: `/files/${fileMap[key].subtitles}`,
        translate: hasTranslate
          ? `/files/${fileMap[key].translate}`
          : undefined,
      };
    });

  const outputFilePath = `./public/data/files.json`;
  const dir = dirname(outputFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(outputFilePath, JSON.stringify(pairedFiles, null, 2), "utf-8");

  console.log(`Data has been written to ${outputFilePath}`);
  return pairedFiles;
};

generateFilesList();
