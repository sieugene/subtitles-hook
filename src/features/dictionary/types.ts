export interface DictionaryEntry {
  word: string;
  reading: string;
  type: string;
  meanings: string[];
}

export type LookupResponse = {
  data: {
    dictionaryResult: DictionaryEntry[];
    words: string[];
    tokens: { basic_form: string; word_id: number; surface_form: string }[];
  };
};
