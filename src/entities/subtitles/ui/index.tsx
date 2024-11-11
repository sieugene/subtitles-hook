import React, { FC } from "react";
import { useSubtitles } from "../hooks/useSubtitles";
import "./index.css";
import { useFontSizeControl } from "../hooks/useFontSizeControl";

type Props = {
  children: React.ReactNode;
  fullScreen: boolean;
};

export const Subtitles: FC<Props> = ({ children, fullScreen }) => {
  const { subtitles } = useSubtitles();
  const { fontSize, onHandleSetFontSize } = useFontSizeControl();
  return (
    <>
      {!fullScreen && (
        <div className="fz-control">
          <button onClick={() => onHandleSetFontSize("down")}>-</button>
          <button onClick={() => onHandleSetFontSize("up")}>+</button>
        </div>
      )}

      {children}
      <div id="subtitleDisplay" style={{ fontSize: `${fontSize}px` }}>
        {subtitles}
      </div>
    </>
  );
};
