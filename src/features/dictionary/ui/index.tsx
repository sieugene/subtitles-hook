import React from "react";
import { useLocation } from "react-router";
import { useDictionaryLookup } from "../hooks/useDictionaryLookup";
import styles from "./index.module.scss";

const DictionaryLookupExample: React.FC = () => {
  const params = useLocation();
  const sentence = decodeURIComponent(
    params.search.split("?sentence=")?.[1] || ""
  );
  const { data: results, loading } = useDictionaryLookup(sentence);

  return (
    <div className={styles.dictionaryContainer}>
      <div className={styles.sentenceBlock}>
        <h3>Suggestion for a search:</h3>
        <p className={styles.sentence}>{sentence}</p>
      </div>

      <h2 className={styles.title}>Search results</h2>
      {loading && <h2>loading...</h2>}
      {results?.length > 0 ? (
        <ul className={styles.resultsList}>
          {results?.map((entry, index) => (
            <li key={index}>
              <strong>
                {entry.word} ({entry.reading})
              </strong>
              <div className={styles.meanings}>
                {entry.meanings.map((meaning: string, i: number) => (
                  <span key={i}>{meaning}</span>
                ))}
              </div>
              <small>Type: {entry.type}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>No matches were found.</p>
      )}
    </div>
  );
};

export default DictionaryLookupExample;
