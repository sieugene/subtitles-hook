import { IpadicFeatures } from "kuromoji";
import { DictionaryEntry } from "../../services/Dictionary/model/DictionaryLookup";

export type LookupResponse =
  | {
      data: {
        dictionaryResult: DictionaryEntry[];
        words: string[];
        tokens: IpadicFeatures[];
      };
    }
  | { error: string };
