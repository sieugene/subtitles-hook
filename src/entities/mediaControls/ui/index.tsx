import { useEffect, useState } from "react";

export const MediaControls = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const goFullScreen = () => {
    document.documentElement.requestFullscreen();
  };
  useEffect(() => {
    const onFullscreenchange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    addEventListener("fullscreenchange", onFullscreenchange);
    return () => {
      removeEventListener("fullscreenchange", onFullscreenchange);
    };
  }, []);
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
          onClick={goFullScreen}
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
