import { useEffect } from "react";

export const useMouseEvent = (
  onMove: () => void,
  onTimeout: () => void,
  timeout = 2000
) => {
  useEffect(() => {
    const onMouseMove = () => {
      onMove();
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => onTimeout(), timeout);
    };

    let mouseMoveTimeout: NodeJS.Timeout;

    addEventListener("mousemove", onMouseMove);
    return () => {
      removeEventListener("mousemove", onMouseMove);
      clearTimeout(mouseMoveTimeout);
    };
  }, []);
};
