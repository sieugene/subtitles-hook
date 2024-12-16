import { useContext } from "react";
import { MouseEventContext } from "./index";
import { MouseEventContextType } from "./types";

export const useMouseEvent = (): MouseEventContextType => {
  const context = useContext(MouseEventContext);

  if (!context) {
    throw new Error("useMouseEvent must be used within a MouseEventProvider");
  }

  return context;
};
