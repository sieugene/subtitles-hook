import { useState } from "react";

const FONT_SIZE_LOCALSTORAGE = "font-size-settings";

export const useFontSizeControl = () => {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem(FONT_SIZE_LOCALSTORAGE) || 24)
  );

  const onHandleSetFontSize = (type: "down" | "up") => {
    setFontSize((state) => {
      const next = type === "up" ? state + 1 : state - 1;
      localStorage.setItem(FONT_SIZE_LOCALSTORAGE, next.toString());
      return next;
    });
  };

  return { fontSize, onHandleSetFontSize };
};
