import { useEffect } from "react";

import { MediaFile } from "../../../shared/types";
import { useVideoStore } from "../store/video.store";

export const useVideoList = () => {
  const { list, loading, setLoading, setList } = useVideoStore();

  useEffect(() => {
    if (list.length) return;
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${location.origin}/data/files.json`);
        const data = (await response.json()) as MediaFile[];
        setList(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { list, loading };
};
