import React, { useEffect, useRef } from "react";
import "./App.css"; 
export default function Video() {
  const videoEl = useRef(null);

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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/hXQxSi34GWY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        </div>
        
       </div>
    </div>
  );
}
