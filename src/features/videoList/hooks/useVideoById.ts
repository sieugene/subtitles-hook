import { useVideoList } from "./useVideoList";

export const useVideoById = (id: string) => {
  const { list, loading } = useVideoList();

  return { media: list.find((l) => l.id === id), loading };
};
