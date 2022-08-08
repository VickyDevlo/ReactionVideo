import React from "react";
import { Modal, ModalBody, ModalHeader, Button, Row } from "reactstrap";
import RecordRTC from "recordrtc";
import "./App.css";
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default class ScreenRecordPreviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }
  // Download option for screen record
  downloadScreenRecordVideo = () => {
    let recorderBlob = this.props.recorder;
    if (!recorderBlob) {
      return;
    }
    if (isSafari) {
      if (recorderBlob && recorderBlob.getDataURL) {
        recorderBlob.getDataURL(function (dataURL) {
          RecordRTC.SaveToDisk(dataURL, this.getFileName("webm"));
        });
        return;
      }
    }
    if (recorderBlob) {
      var blob = recorderBlob;
      var file = new File([blob], this.getFileName("webm"), {
        type: "video/webm",
      });
      RecordRTC.invokeSaveAsDialog(file);
    }
  };
  // Get file name
  getFileName = (fileExtension) => {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    return (
      "ScreenRecord-" +
      year +
      month +
      date +
      "-" +
      this.getRandomString() +
      "." +
      fileExtension
    );
  };
  // Get random string for file name
  getRandomString = () => {
    if (
      window.crypto &&
      window.crypto.getRandomValues &&
      navigator.userAgent.indexOf("Safari") === -1
    ) {
      var a = window.crypto.getRandomValues(new Uint32Array(3)),
        token = "";
      for (var i = 0, l = a.length; i < l; i++) {
        token += a[i].toString(36);
      }
      return token;
    } else {
      return (Math.random() * new Date().getTime())
        .toString(36)
        .replace(/\./g, "");
    }
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpenVideoModal} className="videoheader">
        <ModalHeader
          className="video__modal__header bg-transparent"
          toggle={this.props.videoModalClose}
        ></ModalHeader>
        <ModalBody>
          <video
            id="videorecord"
            controls
            // controlsList="nodownload"
            autoPlay={this.state.isLoaded}
            playsInline
            width={"200"}
            height={"200"}
            src={this.props.recordedVideoUrl}
          />
          <Row className="downloadButtonAlign">
            <Button
              color="primary"
              outline
              onClick={this.downloadScreenRecordVideo}
              className="button"
            >
              Download
            </Button>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}