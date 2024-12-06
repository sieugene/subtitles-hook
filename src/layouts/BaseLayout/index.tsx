import { FC } from "react";
import { Container } from "../../shared/ui/Container";
import styles from "./index.module.scss";
import { NavLink } from "react-router";
import { ROUTES } from "../../shared/routes";
type Props = {
  children: React.ReactNode;
  isHome?: boolean;
};
export const BaseLayout: FC<Props> = ({ children, isHome = false }) => {
  return (
    <Container>
      {!isHome && (
        <NavLink to={ROUTES.home} className={styles.link}>
          Home
        </NavLink>
      )}
      <div className={styles.layout}>{children}</div>
    </Container>
  );
};
