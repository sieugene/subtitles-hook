import React, { FC, useMemo, useState } from "react";
import { useMouseEvent } from "../../../shared/hooks/useMouseEvent";
import { useFontSizeControl } from "../hooks/useFontSizeControl";
import { useSubtitles } from "../hooks/useSubtitles";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
  fullScreen: boolean;
};

const DEFAULT_POSITION = 3;

export const Subtitles: FC<Props> = ({ children }) => {
  const [showControls, setShowControls] = useState(true);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const { subtitles: primarySubtitles } = useSubtitles();
  const { subtitles: translatedSubtitles } = useSubtitles(true);
  const { fontSize, onHandleSetFontSize } = useFontSizeControl();
  const translateFZ = useMemo(() => fontSize * 0.65, [fontSize]);

  useMouseEvent(
    () => {
      setShowControls(true);
      setPosition(20);
    },
    () => {
      setShowControls(false);
      setPosition(DEFAULT_POSITION);
    }
  );

  return (
    <>
      <div className={`${styles.fzControl} ${showControls ? "" : styles.hide}`}>
        <button
          onClick={() => {
            onHandleSetFontSize("down");
          }}
        >
          -
        </button>
        <button onClick={() => onHandleSetFontSize("up")}>+</button>
      </div>

      {children}
      <div
        className={styles.subtitleDisplay}
        style={{ bottom: `${position}%` }}
      >
        <p style={{ fontSize: `${fontSize}px`, paddingBottom: 14 }}>
          {" "}
          {primarySubtitles}
        </p>
        {translatedSubtitles && (
          <p
            className={styles.translated}
            style={{ fontSize: `${translateFZ}px` }}
          >
            {translatedSubtitles}
          </p>
        )}
      </div>
    </>
  );
};
