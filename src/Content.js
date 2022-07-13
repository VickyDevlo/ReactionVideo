// https://www.youtube.com/watch?v=ANzPM5-lwXc
import React, { useEffect, useRef } from "react";
// import "./App.css" 
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
    <div className="App">
      <div className='VideoLoop'>
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
  );
}
