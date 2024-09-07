import ReactPlayer from "react-player";
import "./App.css";
import { Subtitles } from "./entities/subtitles/ui";

function App() {
  return (
    <>
      <Subtitles>
        <ReactPlayer
          width={"100%"}
          height={"100vh"}
          controls
          url="video.mkv"
          config={{
            file: {
              tracks: [
                {
                  kind: "subtitles",
                  src: "./video.vtt",
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
