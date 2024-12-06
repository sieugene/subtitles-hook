import { useCallback, useState } from "react";
import styles from "./index.module.scss";

export const usePopup = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showPopup = useCallback((message: string, duration = 3000) => {
    setMessage(message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  const PopupComponent = isVisible ? (
    <div className={`${styles.popup} ${!isVisible ? styles.fadeOut : ""}`}>
      {message}
    </div>
  ) : null;

  return {
    showPopup,
    PopupComponent,
  };
};
