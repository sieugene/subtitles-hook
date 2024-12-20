import React, { createContext, useEffect, useRef, useState } from "react";
import { MouseEventContextType } from "./types";

export const MouseEventContext = createContext<MouseEventContextType | null>(
  null
);

type MouseEventProviderProps = {
  timeout?: number;
  children: React.ReactNode;
};

export const MouseEventProvider: React.FC<MouseEventProviderProps> = ({
  timeout = 2000,
  children,
}) => {
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsActive(true);
    timeoutRef.current = setTimeout(() => setIsActive(false), timeout);
  };

  useEffect(() => {
    const handleActivity = () => resetTimeout();

    document.body.addEventListener("mousemove", handleActivity);
    document.body.addEventListener("click", handleActivity);
    document.body.addEventListener("wheel", handleActivity);

    resetTimeout();

    return () => {
      document.body.removeEventListener("mousemove", handleActivity);
      document.body.removeEventListener("click", handleActivity);
      document.body.removeEventListener("wheel", handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeout]);

  return (
    <MouseEventContext.Provider value={{ isActive, resetTimeout }}>
      {children}
    </MouseEventContext.Provider>
  );
};
