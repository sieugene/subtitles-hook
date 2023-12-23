import { useCallback, useEffect, useState } from "react";

export const useSubtitles = () => {
  const [subtitles, setSubtitles] = useState("");
  const subcribe = useCallback(() => {
    const video = document.getElementsByTagName("video")?.[0];
    if (!video) return;

    video.addEventListener("timeupdate", function () {
      updateSubtitlesForCurrentTime();
    });
    function updateSubtitlesForCurrentTime() {
      if (!video) return;
      const trackElement = document.querySelector("track");

      if (
        trackElement &&
        trackElement.track &&
        trackElement.track.mode !== "disabled"
      ) {
        const currentTime = video.currentTime;
        const cues = trackElement.track.cues;
        const currentCue = getCueForTime(cues, currentTime);

        if (currentCue?.text) {
          setSubtitles(currentCue.text);
        } else {
          setSubtitles("");
        }
      }
    }

    function getCueForTime(cues: TextTrackCueList | null, currentTime: number) {
      if (!cues) return null;
      for (let i = 0; i < cues.length; i++) {
        const cue = cues[i];
        if (cue.startTime <= currentTime && currentTime < cue.endTime) {
          return cue as unknown as VTTCue;
        }
      }
      return null;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      subcribe();
    }, 1000);
  }, []);

  return { subtitles, subcribe };
};
