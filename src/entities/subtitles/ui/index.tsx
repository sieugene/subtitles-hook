import React, { FC, useState } from "react";
import { useMouseEvent } from "../../../shared/hooks/useMouseEvent";
import { useFontSizeControl } from "../hooks/useFontSizeControl";
import { useSubtitles } from "../hooks/useSubtitles";
import "./index.css";

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
      {showControls && (
        <div className="fz-control">
          <button onClick={() => onHandleSetFontSize("down")}>-</button>
          <button onClick={() => onHandleSetFontSize("up")}>+</button>
        </div>
      )}

      {children}
      <div id="subtitleDisplay" style={{ bottom: `${position}%` }}>
        <p style={{ fontSize: `${fontSize}px` }}> {primarySubtitles}</p>
        {translatedSubtitles && (
          <p className="translated" style={{ fontSize: `${fontSize - 2}px` }}>
            {translatedSubtitles}
          </p>
        )}
      </div>
    </>
  );
};
