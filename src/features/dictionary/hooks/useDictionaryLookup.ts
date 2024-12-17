import { useEffect, useState } from "react";
import { DictionaryLookup } from "../model/DictionaryLookup";

export const useDictionaryLookup = <T extends unknown[]>(
  sentence: string,
  dictionary: DictionaryLookup<T>
) => {
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

  return dictionary.find(tokenizedWords);
};
