import { FC, useState } from "react";
import { Upload } from "../../../entities/upload/ui";
import { MediaFile } from "../../../shared/types";
import { useVideoList } from "../hooks/useVideoList";

type Props = {
  current: MediaFile | null;
  setCurrent: (media: MediaFile) => void;
};
export const VideoList: FC<Props> = ({ setCurrent }) => {
  const { add, list } = useVideoList();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  return (
    <>
      <div className="files_selector">
        <ul>
          {list.map((e) => (
            <li
              key={e.video}
              onClick={() => {
                setCurrent(e);
              }}
            >
              {e.video}
            </li>
          ))}
        </ul>
        <Upload
          videoFile={videoFile}
          setSubtitleFile={setSubtitleFile}
          setVideoFile={setVideoFile}
          subtitleFile={subtitleFile}
          upload={add}
        />
      </div>
    </>
  );
};
