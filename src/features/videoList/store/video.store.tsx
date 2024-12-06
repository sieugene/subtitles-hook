import { createContext, FC, useContext, useState } from "react";
import { MediaFile } from "../../../shared/types";

type State = {
  list: MediaFile[];
  setList: (files: MediaFile[]) => void;
  loading: boolean;
  setLoading: (toggle: boolean) => void;
  addMedia: (media: MediaFile) => void;
};

export const VideoStoreContext = createContext<State>({
  addMedia: () => {},
  list: [],
  setList: () => {},
  loading: false,
  setLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};
export const VideoStoreProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<MediaFile[]>([]);

  return (
    <VideoStoreContext.Provider
      value={{
        addMedia: (media) => {
          setList((prev) => [...prev, media]);
        },
        setList,
        list,
        loading,
        setLoading,
      }}
    >
      {children}
    </VideoStoreContext.Provider>
  );
};

export const useVideoStore = () => {
  return useContext(VideoStoreContext);
};
