import { useMemo, useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import { MediaControls } from "./entities/mediaControls/ui";
import { Subtitles } from "./entities/subtitles/ui";
import { VideoList } from "./features/videoList/ui";
import { MediaFile } from "./shared/types";
import { TrackProps } from "react-player/file";

function App() {
  const [fullScreen, setFullScreen] = useState(false);
  const [current, setCurrent] = useState<MediaFile | null>(null);

  const tracks = useMemo<TrackProps[]>(() => {
    if (!current) return [];
    const data: TrackProps[] = [
      {
        kind: "subtitles",
        src: current.subtitles,
        srcLang: "ja",
        label: "Primary Subtitles",
        default: true,
      },
    ];
    if (current.translate) {
      data.push({
        kind: "subtitles",
        src: current.translate,
        srcLang: "en",
        label: "Translated Subtitles",
        default: false,
      });
    }
    return data;
  }, [current]);

  if (!current) {
    return <VideoList current={current} setCurrent={setCurrent} />;
  }

  return (
    <>
      <div className="file-name" style={{ textAlign: "center" }}>
        {current.video}
      </div>
      <Subtitles fullScreen={fullScreen}>
        <ReactPlayer
          width={"100%"}
          height={"100vh"}
          controls
          url={`${current.video}`}
          config={{
            file: {
              tracks,
            },
          }}
        />

        <MediaControls setFullScreen={setFullScreen} fullScreen={fullScreen} />
      </Subtitles>
    </>
  );
}

export default App;
