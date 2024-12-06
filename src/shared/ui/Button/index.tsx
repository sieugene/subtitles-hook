import { FC } from "react";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;
export const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
