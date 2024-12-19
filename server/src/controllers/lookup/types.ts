import { DictionaryEntry } from "../../services/Dictionary/model/DictionaryLookup";

export type LookupResponse = DictionaryEntry[] | { error: string };
