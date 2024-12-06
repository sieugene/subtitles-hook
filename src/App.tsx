import { Route, Routes } from "react-router";
import "./App.css";
import {
  VideoStoreProvider
} from "./features/videoList/store/video.store";
import { HomePage, UploadPage, VideoPage, VideosPage } from "./pages";
import { ROUTES } from "./shared/routes";

function App() {
  return (
    <VideoStoreProvider>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.videos}>
          <Route index element={<VideosPage />} />
          <Route path=":id" element={<VideoPage />} />
        </Route>
        <Route path={ROUTES.upload} element={<UploadPage />} />
      </Routes>
    </VideoStoreProvider>
  );
}

export default App;
