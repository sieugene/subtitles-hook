import { useEffect, useState } from "react";
import { DictionaryEntry } from "../types";

export const useDictionaryLookup = (sentence: string) => {
  const [data, setData] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const tokenizeSentence = async () => {
      if (sentence.trim() === "") {
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/v1/tokenizer/lookup?sentence=${encodeURIComponent(
            sentence
          )}`
        );
        if (response.ok) {
          const responseData = (await response.json()) as DictionaryEntry[];
          setData(responseData);
        } else {
          console.error("Tokenization error:", response.statusText);
        }
      } catch (error) {
        console.error("Error when sending a request:", error);
      } finally {
        setLoading(false);
      }
    };

    tokenizeSentence();
  }, [sentence]);

  return { data, loading };
};
