// https://www.youtube.com/watch?v=ANzPM5-lwXc
import React, { useEffect, useRef } from "react";
import "./App.css" 
export default function App() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error); 
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div>
      <div className='VideoLoop'>
        <div className="Loop_one">
         <video
          style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}
          playsInline
          loop
          auto
          controls
          alt="All the devices"
          src="https://www.youtube.com/watch?v=hKB-YGF14SY"
          ref={videoEl}
          />

        <video
          style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src="https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
          ref={videoEl}
          />

          </div>
          <div className="Loop_one">

        <video
          style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src="https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
          ref={videoEl}
        />
         

        <video
          style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src="https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
          ref={videoEl}
          />
          </div>
         
      </div>
    </div>
  );
}
