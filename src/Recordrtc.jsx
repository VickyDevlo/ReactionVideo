import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

function Recordrtc() {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  const StartRec = async () => {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1920,
        height: 1080,
        frameRate: 30,
      },
      audio: false,
    });

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, { type: "video" });
    recorderRef.current.startRecording();
  };

  const StopRec = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
  };

  const SaveRec = () => {
    invokeSaveAsDialog(blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
  }, [stream, refVideo]);

  return (
    <div className="Rtc_app">
      <header className="App-header">
        <button onClick={StartRec}>Start Recording</button>
        <button onClick={StopRec}>Stop Recording</button>
        <button onClick={SaveRec}>Save Recording</button>
      </header>
      {blob && (
        <video
          src={URL.createObjectURL(blob)}
          controls
          autoPlay
          controlsList
          ref={refVideo}
          style={{ width: "700px", margin: "1em" }}
        />
      )}
    </div>
  );
}

export default Recordrtc;
