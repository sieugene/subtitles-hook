import { useEffect, useState } from "react";

export const MediaControls = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const goFullScreen = (type: "fullscreen" | "notFullscreen") => {
    if (type === "fullscreen") document.documentElement.requestFullscreen();
    if (type === "notFullscreen") document.exitFullscreen();
  };

  const keyFPress = ({ code }: KeyboardEvent) => {
    console.log("document.fullscreenEnabled"), document.fullscreenEnabled;

    if (code === "KeyF" && document.fullscreenElement === null) {
      goFullScreen("fullscreen");
    }
    if (code === "KeyF" && document.fullscreenElement !== null) {
      goFullScreen("notFullscreen");
    }
  };

  useEffect(() => {
    const onFullscreenchange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    addEventListener("fullscreenchange", onFullscreenchange);
    addEventListener("keypress", keyFPress);
    return () => {
      removeEventListener("fullscreenchange", onFullscreenchange);
      removeEventListener("keypress", keyFPress);
    };
  }, []);

  const handleClickFullscreenButton = () => {
    goFullScreen("fullscreen");
  };
  if (!fullScreen)
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: 28,
          display: "flex",
          justifyContent: "end",
          overflow: "hidden",
          height: "35px",
        }}
      >
        <button
          onClick={handleClickFullscreenButton}
          style={{
            position: "relative",
            right: "10%",
            height: "100",
            fontSize: "12px",
            width: 100,
          }}
        >
          FullScreen
        </button>
      </div>
    );
};
