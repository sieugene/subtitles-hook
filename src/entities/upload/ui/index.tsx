import { FC } from "react";
import { MediaFile } from "../../../shared/types";
import './index.css'

type Props = {
  videoFile: File | null;
  subtitleFile: File | null;
  setVideoFile: (file: File) => void;
  setSubtitleFile: (file: File) => void;
  upload: (media: MediaFile) => void;
};

export const Upload: FC<Props> = ({
  setSubtitleFile,
  setVideoFile,
  subtitleFile,
  videoFile,
  upload,
}) => {
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    file && setVideoFile(file);
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    file && setSubtitleFile(file);
  };

  const handleLoadMedia = () => {
    if (videoFile && subtitleFile) {
      const videoURL = URL.createObjectURL(videoFile);
      const subtitleURL = URL.createObjectURL(subtitleFile);
      upload({ video: videoURL, vtt: subtitleURL });
    }
  };
  return (
    <div className='upload'>
      <div>
        <label>
          Select video:
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>
      </div>
      <div>
        <label>
          Select subtitles:
          <input type="file" accept=".vtt" onChange={handleSubtitleChange} />
        </label>
      </div>
      <button onClick={handleLoadMedia} disabled={!videoFile || !subtitleFile} className='upload-btn'>
        Upload
      </button>
    </div>
  );
};
