import AdmZip from "adm-zip";
import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const fileArg = args.find((arg) => arg.startsWith("-file="));

if (!fileArg) {
  console.error(
    '❌ Error: Please provide a file path using -file="path_to_file".'
  );
  // eslint-disable-next-line no-undef
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DICTIONARY_NAME = fileArg.split("=")[1];
const SOURCE_DIR = path.join(__dirname, `../src/shared/data/dictionaries`);
const ZIP_FILE = path.join(SOURCE_DIR, `${DICTIONARY_NAME}.zip`);
const OUTPUT_FILE = path.join(
  SOURCE_DIR,
  `combined_terms_${DICTIONARY_NAME}.json`
);

const zip = new AdmZip(ZIP_FILE);
const zipEntries = zip.getEntries();

let combined = [];

zipEntries.forEach((entry) => {
  if (
    entry.entryName.startsWith("term_bank_") &&
    entry.entryName.endsWith(".json")
  ) {
    console.log(`Processing: ${entry.entryName}`);
    const content = entry.getData().toString("utf-8");
    const data = JSON.parse(content);
    combined = combined.concat(data);
  }
});

writeFileSync(OUTPUT_FILE, JSON.stringify(combined, null, 2));
console.log(`✅ Combined JSON created! Total entries: ${combined.length}`);
