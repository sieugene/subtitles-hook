import { useEffect, useState } from "react";

import { MediaFile } from "../../../shared/types";

export const useVideoList = () => {
  const [list, setList] = useState<MediaFile[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("data/files.json");
      const data = (await response.json()) as MediaFile[];
      setList(data || []);
    })();
  }, []);

  const add = (media: MediaFile) => {
    setList((prev) => [...prev, media]);
  };

  return { list, add };
};
