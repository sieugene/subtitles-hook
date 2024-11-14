import { useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import { MediaControls } from "./entities/mediaControls/ui";
import { Subtitles } from "./entities/subtitles/ui";
import { VideoList } from "./features/videoList/ui";

interface MediaFile {
  video: string;
  vtt: string;
}

function App() {
  const [fullScreen, setFullScreen] = useState(false);
  const [current, setCurrent] = useState<MediaFile | null>(null);


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
              tracks: [
                {
                  kind: "subtitles",
                  src: `./${current.vtt}`,
                  srcLang: "ja",
                  label: "subtitles",
                  default: true,
                },
              ],
            },
          }}
        />
        <MediaControls setFullScreen={setFullScreen} fullScreen={fullScreen} />
      </Subtitles>
    </>
  );
}

export default App;
