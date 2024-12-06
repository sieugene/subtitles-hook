import { FC } from "react";
import { useVideoList } from "../hooks/useVideoList";
import classes from "./index.module.scss";
import { NavLink } from "react-router";
import { ROUTES } from "../../../shared/routes";
import { Button } from "../../../shared/ui/Button";

export const VideoList: FC = () => {
  const { list, loading } = useVideoList();

  if (loading) {
    return (
      <div>
        <h2 className={classes.label}>Loading...</h2>
      </div>
    );
  }
  if (!list.length) {
    return (
      <div className={classes.empty}>
        <h2 className={classes.label}>Empty...</h2>
        <NavLink to={ROUTES.upload}>
          <Button>Upload</Button>
        </NavLink>
      </div>
    );
  }
  return (
    <div className={classes.list}>
      <h2 className={classes.label}>Uploaded Files:</h2>
      {list.map((e) => (
        <NavLink to={ROUTES.video(e.id)} key={e.video} className={classes.item}>
          {e.video}
        </NavLink>
      ))}
    </div>
  );
};
