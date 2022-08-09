import { useState } from "react";
import { HomeRounded } from "@material-ui/icons";
import GetDevices from "./GetDevices";
import { ReactMediaRecorder } from "react-media-recorder";
import "./App.css";

const PopUpMenu = () => {
  const [initialState, setInitialState] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //ScreenOnly
  const StartRecOnlyScreen = () => {
    setDisabled(true);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    document.getElementById("OnlyCam").style.display = "none";
    document.getElementById("StartRecBtn").style.visibility = "visible";
    document.getElementById("videoRec").style.visibility = "hidden";
    document.getElementById("StartCameraBtn").style.visibility = "hidden";
    document.getElementById("StopCameraBtn").style.visibility = "hidden";
    video.srcObject.getTracks()[0].stop();
    document.getElementById("video_Cam").style.display = "none";
    document.getElementById("StartRecBtn").style.visibility = "visible";  
  };

  //Both
  const StartRecWithBoth = () => {
    setDisabled(false);
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        document.getElementById("OnlyCam").style.display = "none";

        document.getElementById("StartRecBtn").style.visibility = "visible";
        document.getElementById("StopCameraBtn").style.visibility = "hidden";
        document.getElementById("StartCameraBtn").style.visibility = "hidden";
        document.getElementById("videoRec").style.visibility = "hidden";
        document.getElementById("video_Cam").style.display = "inline";
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  //CamreaOnly
  const StartRecCameraOnly = () => {
    setDisabled(false);
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        let video = document.getElementsByClassName("CameraRec")[0];
        document.getElementById("StartCameraBtn").style.visibility = "visible";
        document.getElementById("OnlyCam").style.display = "inline";
        document.getElementById("video_Cam").style.display = "none";
        document.getElementById("StartRecBtn").style.visibility = "hidden";
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const devices = GetDevices();
  const defaultAudioDevice =
    devices.audio.find((x) => x.deviceId === "default") || {};
  const defaultVideoDevice =
    devices.video.find((x) => x.deviceId === "default") || {};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let json = {
      audioDevice: defaultAudioDevice.deviceId,
      videoDevice: defaultVideoDevice.deviceId,
    };
    formData.forEach((value, key) => {
      json[key] = value;
    });
    setInitialState(json);
  };
  const StartBtn = () => {
    document.getElementById("StopCameraBtn").style.visibility = "visible";
    document.getElementById("StartCameraBtn").style.visibility = "hidden";
    document.getElementById("videoRec").style.visibility = "hidden";
  };
  const StopBtn = () => {
    document.getElementById("StopCameraBtn").style.visibility = "hidden";
    document.getElementById("StartCameraBtn").style.visibility = "visible";
    document.getElementById("videoRec").style.visibility = "visible";
  };

  let Svg = document.querySelectorAll('svg');

  Svg.forEach(button => {
      button.addEventListener('click', function () {
          Svg.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');        
      });
  });
  
  
  return (
    <div id="Container">
      <form onSubmit={handleFormSubmit}>
        <>
          <div className="TopNav">
            <div className="Logo">
              <span>Logo</span>
            </div>
            <div className="HomeIcon">
              <HomeRounded />
            </div>
          </div>
          <div id="Icons">
            <svg
               className="active"
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 48"
              onClick={StartRecOnlyScreen}
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6H60C61.1046 6 62 5.10457 62 4C62 2.89543 61.1046 2 60 2H16ZM62 8H2V44C2 45.1046 2.89543 46 4 46H60C61.1046 46 62 45.1046 62 44V8ZM0 8V4C0 1.79086 1.79086 0 4 0H60C62.2091 0 64 1.79086 64 4V8V44C64 46.2091 62.2091 48 60 48H4C1.79086 48 0 46.2091 0 44V8ZM10 2C8.89543 2 8 2.89543 8 4C8 5.10457 8.89543 6 10 6C11.1046 6 12 5.10457 12 4C12 2.89543 11.1046 2 10 2ZM2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4Z"
              />
            </svg>
            &nbsp;&nbsp;&nbsp;
            <br />
            <span className="ScreenTag">Screen</span>
            <svg
              
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 48"
              onClick={StartRecCameraOnly}
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M60 2H4C2.89543 2 2 2.89543 2 4V44C2 45.1046 2.89543 46 4 46H14V40C14 33.3726 19.3726 28 26 28H38C44.6274 28 50 33.3726 50 40V46H60C61.1046 46 62 45.1046 62 44V4C62 2.89543 61.1046 2 60 2ZM50 48H14H4C1.79086 48 0 46.2091 0 44V4C0 1.79086 1.79086 0 4 0H60C62.2091 0 64 1.79086 64 4V44C64 46.2091 62.2091 48 60 48H50ZM42 16C42 21.5228 37.5228 26 32 26C26.4772 26 22 21.5228 22 16C22 10.4772 26.4772 6 32 6C37.5228 6 42 10.4772 42 16Z"
              />
            </svg>
            &nbsp;&nbsp;&nbsp;
            <span className="CameraTag">Camera</span>
            <svg
             
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 48"
              onClick={StartRecWithBoth}
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fillule="evenodd"
                clipRule="evenodd"
                d="M16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6H60C61.1046 6 62 5.10457 62 4C62 2.89543 61.1046 2 60 2H16ZM62 8H2V44C2 45.1046 2.89543 46 4 46H6V42C6 37.5817 9.58172 34 14 34H22C26.4183 34 30 37.5817 30 42V46H60C61.1046 46 62 45.1046 62 44V8ZM0 8V4C0 1.79086 1.79086 0 4 0H60C62.2091 0 64 1.79086 64 4V8V44C64 46.2091 62.2091 48 60 48H4C1.79086 48 0 46.2091 0 44V8ZM10 2C8.89543 2 8 2.89543 8 4C8 5.10457 8.89543 6 10 6C11.1046 6 12 5.10457 12 4C12 2.89543 11.1046 2 10 2ZM2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4ZM24 26C24 29.3137 21.3137 32 18 32C14.6863 32 12 29.3137 12 26C12 22.6863 14.6863 20 18 20C21.3137 20 24 22.6863 24 26Z"
              />
            </svg>
            &nbsp;&nbsp;&nbsp;
            <br />
            <span className="BothTag">Both</span>
          </div>

          <div className="flex flex-col mb-2 AudioLabel">
            <label className="w-full font-semibold" htmlFor="audioDevice">
              Audio Setting
            </label>
            <div className="relative inline-flex items-center">
              <select
                name="audioDevice"
                id="audioDevice"
                defaultValue={defaultAudioDevice.deviceId}
                className="section_two"
              >
                {devices.audio.map((audioDevice) => (
                  <option
                    key={audioDevice.deviceId}
                    value={audioDevice.deviceId}
                  >
                    {audioDevice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>

        <>
          <div className="flex flex-col mb-2 VideoLabel">
            <label className="w-full font-semibold" htmlFor="videoDevice">
              Video Setting
            </label>
            <div className="relative inline-flex items-center">
              <select
                name="videoDevice"
                id="videoDevice"
                defaultValue={defaultVideoDevice.deviceId}
                className="section_one"
                onChange={StartRecWithBoth}
                disabled={disabled}
              >
                {devices.video.map((videoDevice) => (
                  <option
                    key={videoDevice.deviceId}
                    value={videoDevice.deviceId}
                  >
                    {videoDevice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      </form>
      <span id="OnlyCam">
        <video muted autoPlay className="CameraRec" />
      </span>
      <div>
        <ReactMediaRecorder
          video
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <>
                <div onClick={StartBtn}>
                  <button id="StartCameraBtn" onClick={startRecording}>
                    Start Capture
                  </button>
                </div>
                <div onClick={StopBtn}>
                  <button id="StopCameraBtn" onClick={stopRecording}>
                    Stop Capture
                  </button>
                </div>
              </>
              <div className="VideoDiv">
                <video id="videoRec" src={mediaBlobUrl} controls autoPlay />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PopUpMenu;
