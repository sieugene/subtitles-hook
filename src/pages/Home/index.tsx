import { NavLink } from "react-router";
import { BaseLayout } from "../../layouts/BaseLayout";
import { ROUTES } from "../../shared/routes";
import styles from "./index.module.scss";

export const HomePage = () => {
  return (
    <BaseLayout>
      <div className={styles.links}>
        <NavLink to={ROUTES.videos}>Videos list</NavLink>
        <NavLink to={ROUTES.upload}>Local upload</NavLink>
      </div>
    </BaseLayout>
  );
};
