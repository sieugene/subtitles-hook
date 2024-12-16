import { FC, useEffect } from "react";
import { Button } from "../../../shared/ui/Button";
import styles from "./index.module.scss";
import { useMouseEvent } from "../../../shared/context/MouseEventContext/useMouseEvent";

type Props = {
  fullScreen: boolean;
  setFullScreen: (value: boolean) => void;
};

export const MediaControls: FC<Props> = ({ fullScreen, setFullScreen }) => {
  const { isActive: showButton } = useMouseEvent();

  const goFullScreen = (type: "fullscreen" | "notFullscreen") => {
    if (type === "fullscreen") document.documentElement.requestFullscreen();
    if (type === "notFullscreen") document.exitFullscreen();
  };

  const keyFPress = ({ code }: KeyboardEvent) => {
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
  }, [setFullScreen]);

  const handleClickFullscreenButton = () => {
    goFullScreen(!fullScreen ? "fullscreen" : "notFullscreen");
  };
  if (!showButton) return;
  return (
    <div className={styles.mediaControls}>
      <Button
        className={styles.mediaControlsButton}
        onClick={(event) => {
          event.currentTarget.blur();
          handleClickFullscreenButton();
        }}
      >
        FullScreen
      </Button>
    </div>
  );
};
