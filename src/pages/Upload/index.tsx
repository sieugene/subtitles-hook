import { useState } from "react";
import { usePopup } from "../../entities/popup/hooks/usePopup";
import { Upload } from "../../entities/upload/ui";
import { useVideoStore } from "../../features/videoList/store/video.store";
import { BaseLayout } from "../../layouts/BaseLayout";
import { MediaFile } from "../../shared/types";

export const UploadPage = () => {
  const { addMedia } = useVideoStore();
  const { showPopup, PopupComponent } = usePopup();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [subtitleTranslateFile, setSubtitleTranslateFile] =
    useState<File | null>(null);

  const onUpload = (media: MediaFile) => {
    addMedia(media);
    showPopup("File was uploaded", 2000);
  };

  return (
    <BaseLayout>
      {PopupComponent}
      <Upload
        videoFile={videoFile}
        setSubtitleFile={setSubtitleFile}
        setVideoFile={setVideoFile}
        subtitleFile={subtitleFile}
        subtitleTranslateFile={subtitleTranslateFile}
        setSubtitleTranslateFile={setSubtitleTranslateFile}
        upload={onUpload}
      />
    </BaseLayout>
  );
};
