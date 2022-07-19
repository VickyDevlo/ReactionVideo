import { useState } from "react";
import { HomeRounded } from "@material-ui/icons";
import GetDevices from "./GetDevices";
import "./App.css";

const PopUpMenu = ({ onClick, props }) => {
  const [initialState, setInitialState] = useState(false);
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

  return (
    <div className="Container">
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
          <div className="StartBtn" onClick={props}>
            <button onClick={onClick}>Start Recording</button>
          </div>
        </>
      </form>
    </div>
  );
};

export default PopUpMenu;
