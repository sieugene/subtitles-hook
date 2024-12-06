import { useEffect } from "react";

export const useMouseEvent = (
  onMove: () => void,
  onTimeout: () => void,
  timeout = 2000
) => {
  useEffect(() => {
    let mouseMoveTimeout: NodeJS.Timeout;

    const onMouseMove = () => {
      onMove();
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => onTimeout(), timeout);
    };

    const onClick = () => {
      onMove();
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => onTimeout(), timeout);
    };

    addEventListener("mousemove", onMouseMove);
    addEventListener("click", onClick);

    return () => {
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("click", onClick);
      clearTimeout(mouseMoveTimeout);
    };
  }, [timeout, onMove, onTimeout]);
};
