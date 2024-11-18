import { useEffect, useState } from "react";

import { MediaFile } from "../../../shared/types";

const STORAGE_KEY = "file-list";

export const useVideoList = () => {
  const [list, setList] = useState<MediaFile[]>([]);
  const fetchLocal = useLocalFiles();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLocal();
        setList(data || []);
      } finally {
        sync();
      }
    })();
  }, []);

  const sync = () => {
    setList((prevList) => {
      const combinedList = [...prevList, ...getStorageData()].filter(
        (d) => !!d
      );
      const uniqueList = Array.from(
        new Map(combinedList.map((item) => [item.video, item])).values()
      );
      return uniqueList;
    });
  };

  const getStorageData = () => {
    return JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "[]"
    ) as MediaFile[];
  };
  const add = (media: MediaFile) => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...getStorageData(), media].filter((d) => !!d))
    );
    sync();
  };

  return { list, add };
};

const useLocalFiles = () => {
  return async () => {
    const response = await fetch("data/files.json");
    const data = (await response.json()) as MediaFile[];
    return data;
  };
};
