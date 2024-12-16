import React, { FC, useMemo } from "react";
import { useMouseEvent } from "../../../shared/context/MouseEventContext/useMouseEvent";
import { useDraggable } from "../../../shared/hooks/useDraggable";
import { useFontSizeControl } from "../hooks/useFontSizeControl";
import { useSubtitles } from "../hooks/useSubtitles";
import styles from "./index.module.scss";
import { usePlaceControl } from "../hooks/usePlaceControl";

type Props = {
  children: React.ReactNode;
  fullScreen: boolean;
};

const DEFAULT_POSITION = 3;

export const Subtitles: FC<Props> = ({ children }) => {
  const { placement, setPlacement } = usePlaceControl();
  const isFixedPlacement = useMemo(() => placement === "fixed", [placement]);

  const { elementRef, handleMouseDown } = useDraggable(
    "subtitles-placement",
    { x: 0, y: 0 },
    !isFixedPlacement
  );
  const { isActive: showControls } = useMouseEvent();

  const position = useMemo(() => {
    return showControls ? 20 : DEFAULT_POSITION;
  }, [showControls]);

  const { subtitles: primarySubtitles } = useSubtitles();
  const { subtitles: translatedSubtitles } = useSubtitles(true);
  const { fontSize, onHandleSetFontSize } = useFontSizeControl();
  const translateFZ = useMemo(() => fontSize * 0.65, [fontSize]);

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
      <div
        className={`${styles.placeControl} ${showControls ? "" : styles.hide}`}
      >
        <div
          className={styles.placeControlBtn}
          onClick={() => setPlacement(isFixedPlacement ? "draggable" : "fixed")}
        >
          {placement}
        </div>
      </div>

      {children}
      <div
        key={placement}
        onMouseDown={handleMouseDown}
        className={styles.subtitleDisplay}
        style={{
          bottom: `${position}%`,
          transition: isFixedPlacement ? "0.3s all ease" : undefined,
        }}
        ref={isFixedPlacement ? null : elementRef}
      >
        <p style={{ fontSize: `${fontSize}px`, paddingBottom: 14 }}>
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
