import React, { FC } from "react";
import { useSubtitles } from "../hooks/useSubtitles";
import "./index.css";

type Props = {
  children: React.ReactNode;
};

export const Subtitles: FC<Props> = ({ children }) => {
  const { subtitles } = useSubtitles();
  return (
    <>
      {children}
      <div id="subtitleDisplay">{subtitles}</div>
    </>
  );
};
