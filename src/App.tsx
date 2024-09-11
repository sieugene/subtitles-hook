import ReactPlayer from "react-player";
import "./App.css";
import { Subtitles } from "./entities/subtitles/ui";
import { useState } from "react";
import data from "./data/files.json";

function App() {
  const [current, setCurrent] = useState<{ mkv: string; vtt: string } | null>(
    null
  );

  if (!current) {
    return (
      <div className="files_selector">
        <ul>
          {data.map((e) => (
            <li
              key={e.mkv}
              onClick={() => {
                setCurrent(e);
              }}
            >
              {e.mkv}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <>
      <Subtitles>
        <ReactPlayer
          width={"100%"}
          height={"100vh"}
          controls
          url={`${current.mkv}`}
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
      </Subtitles>
    </>
  );
}

export default App;
