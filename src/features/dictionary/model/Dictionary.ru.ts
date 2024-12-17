import { DictionaryEntry, DictionaryLookup } from "./DictionaryLookup";
import dictionary from "../../../shared/data/dictionaries/combined_terms_JMdict_russian.json";

type EntryData = [
  string,
  string,
  string,
  string,
  number,
  string[],
  number,
  string
];

class DictionaryRu extends DictionaryLookup<EntryData> {
  parse(entry: EntryData) {
    const data: DictionaryEntry = {
      word: entry[0],
      reading: entry[1],
      type: entry[2],
      meanings: entry[5],
    };
    return data;
  }
}

export const RuDictionaryLookup = new DictionaryRu(dictionary as any);
