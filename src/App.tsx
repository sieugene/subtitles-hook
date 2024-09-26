import { useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import data from "./data/files.json";
import { Subtitles } from "./entities/subtitles/ui";
import { MediaControls } from "./entities/mediaControls/ui";

// 26
function App() {
  const [current, setCurrent] = useState<{ video: string; vtt: string } | null>(
    null
  );

  if (!current) {
    return (
      <div className="files_selector">
        <ul>
          {data.map((e) => (
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
      </div>
    );
  }

  return (
    <>
      <div className="file-name" style={{ textAlign: "center" }}>
        {current.video}
      </div>
      <Subtitles>
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
                  label: "subtitles ja",
                  default: true,
                },
              ],
            },
          }}
        />
        <MediaControls />
      </Subtitles>
    </>
  );
}

export default App;
