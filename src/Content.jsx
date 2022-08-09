import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useReactMediaRecorder } from "react-media-recorder";
export default function Video() {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
  const videoEl = useRef(null);
  let [value, setValue] = useState(true);

  const drawOnOff = () => {
    switch (value) {
      case "on":
        value = "off";
        document.getElementById("can").style.pointerEvents = "none";
        document.getElementById("can").style.zIndex = "-1";
        break;
      default:
        value = "on";
        document.getElementById("can").style.pointerEvents = "unset";
        document.getElementById("can").style.zIndex = "1";

        break;
    }
  };
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div>
      <div className="VideoContainer">
        <div className="Loop_one">
          <iframe
            width="560"
            id="can"
            height="315"
            src="https://www.youtube.com/embed/hXQxSi34GWY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <button className="ToggleBtn" onClick={drawOnOff}>
          Click Here
        </button>
      </div>
        
    </div>
  );
}
