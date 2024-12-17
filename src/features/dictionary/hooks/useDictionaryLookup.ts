import { useEffect, useState } from "react";

interface DictionaryEntry {
  word: string;
  reading: string;
  type: string;
  meanings: string[];
}

export const useDictionaryLookup = (
  sentence: string,
  dictionary: any
): DictionaryEntry[] => {
  const [tokenizedWords, setTokenizedWords] = useState<string[]>([]);

  useEffect(() => {
    const tokenizeSentence = async () => {
      if (sentence.trim() === "") {
        setTokenizedWords([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/tokenize?sentence=${encodeURIComponent(
            sentence
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          const words = data.map((token: any) => token.surface_form);
          setTokenizedWords(words);
        } else {
          console.error("Tokenization error:", response.statusText);
        }
      } catch (error) {
        console.error("Error when sending a request:", error);
      }
    };

    tokenizeSentence();
  }, [sentence]);

  const results = tokenizedWords.map((word) => {
    const foundEntries = dictionary.filter((entry: any) => entry[0] === word);

    return foundEntries.map((entry: any) => ({
      word: entry[0],
      reading: entry[1],
      type: entry[2],
      meanings: entry[5],
    }));
  });

  return results.flat();
};
