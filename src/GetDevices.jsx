import { useState } from "react"; 

export default function GetDevices() {
  let defaultDevices = {
    audio: [],
    video: [],
  };
  const [devices, setDevices] = useState(defaultDevices);
 
    (async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return;
      }
      try {
        const cameraPermission = await navigator.permissions.query({ name: "camera" });
        const micPermission = await navigator.permissions.query({ name: "microphone" });
   
        //toggleLoader()
        if (cameraPermission.state !== "granted" || micPermission.state !== "granted") {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: false,
          });
          if (!stream) {
            return;
          }
          stream.getVideoTracks().forEach((x) => x.stop());
          stream.getAudioTracks().forEach((x) => x.stop());
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        //toggleLoader()
        defaultDevices = devices.reduce((acc, device) => {
          if (device.kind === "videoinput") {
            acc.video.push(device);
          }
          if (device.kind === "audioinput") {
            acc.audio.push(device);
          }
          return acc;
        }, defaultDevices);
        setDevices({ ...defaultDevices });
      } catch (err) {
        console.error(err);
      }
    })();
  ;
  return devices;
}