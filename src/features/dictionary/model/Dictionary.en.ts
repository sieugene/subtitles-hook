import { DictionaryEntry, DictionaryLookup } from "./DictionaryLookup";
import dictionary from "../../../shared/data/dictionaries/combined_terms_JMdict_english.json";

type GlossaryEntry = [
  string,
  string,
  string,
  string,
  number,
  any,
  number,
  string
];

class DictionaryEn extends DictionaryLookup<GlossaryEntry> {
  parse(entry: GlossaryEntry) {
    let meanings: string[] = [];
    const meaningsEntry = entry[5][0];
    if (typeof meaningsEntry?.content?.content?.[0]?.content === "string") {
      meanings = meaningsEntry?.content?.content.map((a) => {
        const meaning = a?.content;
        if (typeof meaning === "string") {
          return meaning;
        } else {
          return "";
        }
      });
    }

    const data: DictionaryEntry = {
      word: entry[0],
      reading: entry[1],
      type: entry[2],
      meanings: meanings,
    };
    return data;
  }
}

export const EnDictionaryLookup = new DictionaryEn(dictionary as any);
