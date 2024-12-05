import { useCallback, useEffect, useState } from "react";

export const useSubtitles = (trackSelector: string) => {
  const [subtitles, setSubtitles] = useState("");

  const subscribe = useCallback(() => {
    const video = document.getElementsByTagName("video")?.[0];
    if (!video) return;

    const trackElement = document.querySelector(trackSelector) as HTMLTrackElement;

    if (trackElement && trackElement.track) {
      trackElement.track.mode = "showing";
    }

    video.addEventListener("timeupdate", function () {
      updateSubtitlesForCurrentTime();
    });

    function updateSubtitlesForCurrentTime() {
      if (!video) return;
      const track = trackElement?.track;

      if (track && track.mode === "showing") {
        const currentTime = video.currentTime;
        const cues = track.cues;
        const currentCue = getCueForTime(cues, currentTime);

        if (currentCue?.text) {
          setSubtitles(currentCue.text);
        } else {
          // setSubtitles("");
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
  }, [trackSelector]);

  useEffect(() => {
    setTimeout(() => {
      subscribe();
    }, 1000);
  }, [subscribe]);

  return { subtitles };
};

