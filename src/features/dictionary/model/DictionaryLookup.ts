export interface DictionaryEntry {
  word: string;
  reading: string;
  type: string;
  meanings: string[];
}

interface DictionaryMethods<T> {
  parse(entry: T): void;
}

export abstract class DictionaryLookup<T extends unknown[]>
  implements DictionaryMethods<T>
{
  abstract parse(entry: T): DictionaryEntry;

  constructor(private readonly dictionary: any[]) {}

  public find(tokenizedWords: string[]) {
    return tokenizedWords
      .map((word) => {
        const foundEntries = this.dictionary.filter(
          (entry: T) => entry?.[0] === word
        );
        return foundEntries.map((entry) => {
          return this.parse(entry);
        });
      })
      .flat()
      .filter((a) => a.meanings.length);
  }
}
