import { NavLink, useParams } from "react-router";
import { useVideoById } from "../../features/videoList/hooks/useVideoById";
import { TrackProps } from "react-player/file";
import { useMemo, useState } from "react";
import { Subtitles } from "../../entities/subtitles/ui";
import ReactPlayer from "react-player";
import { MediaControls } from "../../entities/mediaControls/ui";
import { Container } from "../../shared/ui/Container";
import styles from "./index.module.scss";
import { Button } from "../../shared/ui/Button";
import { ROUTES } from "../../shared/routes";

type Params = {
  id: string;
};

export const VideoPage = () => {
  const params = useParams<Params>();
  const [fullScreen, setFullScreen] = useState(false);
  const { media, loading } = useVideoById(params.id || "");

  const tracks = useMemo<TrackProps[]>(() => {
    if (!media) return [];
    const data: TrackProps[] = [
      {
        kind: "subtitles",
        src: media.subtitles,
        srcLang: "ja",
        label: "Primary Subtitles",
        default: true,
      },
    ];
    if (media.translate) {
      data.push({
        kind: "subtitles",
        src: media.translate,
        srcLang: "en",
        label: "Translated Subtitles",
        default: false,
      });
    }
    return data;
  }, [media]);

  if (loading) {
    return (
      <Container>
        <div className={styles.container}>
          <h2 className={styles.status}>loading...</h2>
        </div>
      </Container>
    );
  }

  if (!media) {
    return (
      <Container>
        <div className={styles.container}>
          <h2 className={styles.status}>Media file not found</h2>
          <NavLink to={ROUTES.videos}>
            <Button>go back</Button>
          </NavLink>
        </div>
      </Container>
    );
  }

  return (
    <>
      <div className={styles.fileName} style={{ textAlign: "center" }}>
        {media.video}
      </div>
      <Subtitles fullScreen={fullScreen}>
        <ReactPlayer
          style={{ overflow: "hidden" }}
          width={"100%"}
          height={"100vh"}
          controls
          url={`${media.video}`}
          config={{
            file: {
              tracks,
            },
          }}
        />

        <MediaControls setFullScreen={setFullScreen} fullScreen={fullScreen} />
      </Subtitles>
    </>
  );
};
