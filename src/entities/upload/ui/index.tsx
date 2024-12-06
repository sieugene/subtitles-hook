import { FC, useState } from "react";
import { MediaFile } from "../../../shared/types";
import styles from "./index.module.scss";

type Props = {
  videoFile: File | null;
  subtitleFile: File | null;
  subtitleTranslateFile: File | null;
  setVideoFile: (file: File | null) => void;
  setSubtitleFile: (file: File | null) => void;
  setSubtitleTranslateFile: (file: File | null) => void;
  upload: (media: MediaFile) => void;
};

export const Upload: FC<Props> = ({
  setSubtitleFile,
  setVideoFile,
  subtitleFile,
  setSubtitleTranslateFile,
  subtitleTranslateFile,
  videoFile,
  upload,
}) => {
  const [refresh, setRefresh] = useState(false);
  const onHandleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (file: File) => void
  ) => {
    const file = e.target.files?.[0] || null;
    file && cb(file);
  };

  const handleLoadMedia = () => {
    if (videoFile && subtitleFile) {
      upload({
        video: URL.createObjectURL(videoFile),
        subtitles: URL.createObjectURL(subtitleFile),
        translate: subtitleTranslateFile
          ? URL.createObjectURL(subtitleTranslateFile)
          : "",
        id: Date.now().toString(),
      });
      clearFiles();
    }
  };
  const clearFiles = () => {
    setRefresh(true);
    setVideoFile(null);
    setSubtitleFile(null);
    setSubtitleTranslateFile(null);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  return (
    <div className={styles.upload}>
      {!refresh ? (
        <>
          <div>
            <label>
              Select video:
              <input
                type="file"
                accept="video/*"
                onChange={(e) => onHandleUpload(e, setVideoFile)}
              />
            </label>
          </div>
          <div>
            <label>
              Select subtitles:
              <input
                type="file"
                accept=".vtt"
                onChange={(e) => onHandleUpload(e, setSubtitleFile)}
              />
            </label>
          </div>
          <div>
            <label>
              Select translate:
              <input
                type="file"
                accept=".vtt-tr"
                onChange={(e) => onHandleUpload(e, setSubtitleTranslateFile)}
              />
            </label>
          </div>
          <button
            onClick={handleLoadMedia}
            disabled={!videoFile || !subtitleFile}
            className={styles.uploadBtn}
          >
            Upload
          </button>
        </>
      ) : <h2 className={styles.loading}>Loading...</h2>}
    </div>
  );
};
