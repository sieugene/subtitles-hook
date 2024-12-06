import { VideoList } from "../../features/videoList/ui";
import { BaseLayout } from "../../layouts/BaseLayout";

export const VideosPage = () => {
  return (
    <BaseLayout>
      <VideoList />
    </BaseLayout>
  );
};
