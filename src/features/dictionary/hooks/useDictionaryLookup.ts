import { useEffect, useState } from "react";
import { ENV } from "../../../shared/env";
import { LookupResponse } from "../types";

export const useDictionaryLookup = (sentence: string) => {
  const [data, setData] = useState<LookupResponse["data"]>({
    dictionaryResult: [],
    words: [],
    tokens: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const tokenizeSentence = async () => {
      if (sentence.trim() === "") {
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${ENV.SERVICE_API}/v1/tokenizer/lookup?sentence=${encodeURIComponent(
            sentence
          )}`
        );
        if (response.ok) {
          const responseData = (await response.json()) as LookupResponse;
          setData(responseData.data);
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

  return {
    loading,
    ...data,
  };
};
