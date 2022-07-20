import React from "react";
import RecordRTC from "recordrtc";
import ScreenRecordPreviewModal from "./ScreenRecordPreviewModal ";
import { Button, Col, Container } from "reactstrap";
import "./App.css";
import PopUpMenu from "./PopUpMenu";
let recorder;

class ScreenRecording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedVideoUrl: null,
      isOpenVideoModal: false,
      screen: null,
      camera: null,
      recorder: null,
      startDisable: false,
      stopDisable: true,
      loadModal: false,
      playing: false,
    };
  }

  //to enable audio and video pass true to disable pass false
  captureCamera = (cb) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false, //make it true for video
      })
      .then(cb);
  };
  //access your screen width and height  using window object adjusting camera position ,height and width  //after that pass screen and camera to recordrtc/and call startrecording method using recorder object to //start screen recording
  startScreenRecord = async () => {
    await this.setState({ stopDisable: false, startDisable: true });
    this.captureScreen((screen) => {
      navigator.getUserMedia(
        {
          video: true,
        },
        (stream) => {
          let video = document.getElementsByClassName("app__videoFeed")[0];
          if (video) {
            video.srcObject = stream;
          }
        },
        (err) => console.error(err)
      );
      this.captureCamera(async (camera) => {
        screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
        camera.width = 320;
        camera.height = 240;
        camera.top = screen.height - camera.height;
        camera.left = screen.width - camera.width;
        this.setState({
          screen: screen,
          camera: camera,
        });
        recorder = RecordRTC([screen, camera], {
          type: "video",
        });
        recorder.startRecording();
        recorder.screen = screen;
      });
    });
  };
  //to capture screen  we need to make sure that which media devices are captured and add listeners to // start and stop stream
  captureScreen = (callback) => {
    this.invokeGetDisplayMedia(
      (screen) => {
        this.addStreamStopListener(screen, () => {});
        callback(screen);
      },
      (error) => {
        console.error(error);
        alert(
          "Unable to capture your screen. Please check console logs.\n" + error
        );
        this.setState({ stopDisable: true, startDisable: false });
      }
    );
  };
  //tracks stop
  stopLocalVideo = async (screen, camera) => {
    [screen, camera].forEach(async (stream) => {
      stream.getTracks().forEach(async (track) => {
        track.stop();
      });
    });
  };
  //getting media items
  invokeGetDisplayMedia = (success, error) => {
    var displaymediastreamconstraints = {
      video: {
        displaySurface: "monitor", // monitor, window, application, browser
        logicalSurface: true,
        cursor: "always", // never, always, motion
      },
    };
    // above constraints are NOT supported YET
    // that's why overridnig them
    displaymediastreamconstraints = {
      video: true,
      audio: true,
    };
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    } else {
      navigator
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    }
  };
  //adding event listener
  addStreamStopListener = (stream, callback) => {
    stream.addEventListener(
      "ended",
      () => {
        callback();
        callback = () => {};
      },
      false
    );
    stream.addEventListener(
      "inactive",
      () => {
        callback();
        callback = () => {};
      },
      false
    );
    stream.getTracks().forEach((track) => {
      track.addEventListener(
        "ended",
        () => {
          callback();
          callback = () => {};
        },
        false
      );
      track.addEventListener(
        "inactive",
        () => {
          callback();
          callback = () => {};
        },
        false
      );
    });
    stream.getVideoTracks()[0].onended = () => {
      this.stop();
    };
  };
  // stop screen recording
  stop = async () => {
    await this.setState({ startDisable: true });
    recorder.stopRecording(this.stopRecordingCallback);
  };
  stopVideo = () => {
    // setPlaying(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };
  //destory screen recording
  stopRecordingCallback = async () => {
    await this.stopLocalVideo(this.state.screen, this.state.camera);
    let recordedVideoUrl;
    if (recorder.getBlob()) {
      this.setState({
        recordPreview: recorder.getBlob(),
      });
      recordedVideoUrl = URL.createObjectURL(recorder.getBlob());
    }
    this.setState({
      recordedVideoUrl: recordedVideoUrl,
      screen: null,
      isOpenVideoModal: true,
      startDisable: false,
      stopDisable: true,
      camera: null,
      active: false,
    });
    recorder.screen.stop();
    recorder.destroy();
    recorder = null;

    //camera off
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };
  // stop audio recording
  stopLocalVideos = async (screen, camera) => {
    [screen, camera].forEach(async (stream) => {
      stream.getTracks().forEach(async (track) => {
        track.stop();
      });
    });
  };
  //close video modal
  videoModalClose = () => {
    this.setState({
      isOpenVideoModal: false,
    });
  };
  //open load alert
  openModal = async () => {
    await this.setState({ loadModal: false });
  };
  // Show Popup Menu
  // handleToggleVisibility() {
  //   this.setState((prevState) => {
  //     return {
  //       visibility: !prevState.visibility
  //     };
  //   });

  // }
  AlertMsg = () => {
    console.log();
  };
  render() {
    window.onbeforeunload = this.openModal;
    return (
      <div>
        <Container className="pt-3">
          <div className="centerCard">
            <Col sm={12} className="text-center">
              {/* <Button
                  className="m-2"
                  color="primary"
              >
                  {this.state.visibility ? "Stop Recording" : "Start Recording"} 
                </Button> */}

              <Button
                color="primary"
                outline
                onClick={() => this.startScreenRecord()}
                disabled={this.state.startDisable}
              >
                Start Recording 
              </Button>
              <Button
                color="primary"
                outline
                onClick={() => this.stop()}
                disabled={this.state.stopDisable}
              >
                Stop Recording
              </Button>
            </Col>
          </div>
          <div></div>
          <ScreenRecordPreviewModal
            isOpenVideoModal={this.state.isOpenVideoModal}
            videoModalClose={this.videoModalClose}
            recordedVideoUrl={this.state.recordedVideoUrl}
            downloadScreenRecordVideo={this.downloadScreenRecordVideo}
            recorder={this.state.recordPreview}
          />
        </Container>
        <div className="video_Cam">
          <video muted autoPlay className="app__videoFeed" />
        </div>

        <PopUpMenu/>
      </div>
    );
  }
}
export default ScreenRecording;
