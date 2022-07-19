import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button"; 
import "bootstrap/dist/css/bootstrap.min.css";
// import Video from "../components/Video";
import Video from "./Video"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "react-bootstrap/Navbar";

export default function InCall({ roomDetails }) {
  let [cameras, setCameras] = useState([]);
  let [microphones, setMicrophones] = useState([]);
  let [speakers, setSpeakers] = useState([]);
  let [layouts, setLayouts] = useState([]);
  let [curLayout, setCurLayout] = useState();

  let [room, setRoom] = useState({});

  let logEvent = useCallback((msg, title, variant) => {
    // a simple event logger that we will later replace
    // for a bootstrap toast
    console.log(msg, title, variant);
  }, []);

  let onRoomInit = useCallback(
    (room, layouts, cameras, microphones, speakers) => {
      setCameras(cameras);
      setMicrophones(microphones);
      setSpeakers(speakers);
      setRoom(room);
      setLayouts(layouts);
    },
    []
  );

  let onRoomUpdate = useCallback((updatedValues) => {
    if (updatedValues.cameras !== undefined) setCameras(updatedValues.cameras);
    if (updatedValues.speakers !== undefined)
      setSpeakers(updatedValues.speakers);
    if (updatedValues.microphones !== undefined)
      setMicrophones(updatedValues.microphones);
    if (updatedValues.layout !== undefined)
      setCurLayout(updatedValues.layout);
  }, []);

  function DeviceSelect({
    devices = [],
    onChange = (value) => {},
    deviceName = "device",
  }) {
    return (
      <select
        onChange={async (e) => {
          if (e.target.value !== "") onChange(e.target.value);
        }}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Change {deviceName}
        </option>
        {devices.map((device) => ( 
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col
            style={{ backgroundColor: "black" }}
            className="justify-content-md-center"
          >
            {/* {roomDetails.room ? "Moderator" : "normal uwer"}   */}
            <Video
              onRoomInit={onRoomInit}
              onRoomUpdate={onRoomUpdate}
              joinDetails={roomDetails}
              width={800}
              eventLogger={logEvent}
            />
           
          </Col>
        </Row>
      </Container>

      <NavBar fixed="bottom">
        <Container fluid className="justify-content-md-center">
          <Row>
          
           <Col md="auto">
              <select
                value={curLayout}
                onChange={(e) => room.setLayout({ name: e.target.value })}
              >
                <option value="" disabled hidden>
                  Select Layout
                </option>
                {layouts !== undefined &&
                  layouts.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
              </select>
            </Col>

            <Col md="auto">
              <DeviceSelect
                onChange={(id) => {
                  room.updateCamera({ deviceId: id });
                }}
                deviceName="Camera"
                devices={cameras}
              />
            </Col>

            <Col md="auto">
              <DeviceSelect
                onChange={(id) => {
                  room.updateMicrophone({ deviceId: id });
                }}
                deviceName="Microphone"
                devices={microphones}
              />
            </Col>

            <Col md="auto">
              <DeviceSelect
                onChange={(id) => {
                  room.updateSpeaker({ deviceId: id }); 
                }}
                deviceName="Speaker"
                devices={speakers}
              />
            </Col>

            <Col md="auto">
              <Button
                onClick={async () => {
                  await room.leave();
                }}
                variant="danger"
              >
                Leave
              </Button>
            </Col>
          </Row>
        </Container>
      </NavBar>
    </>
  );
}
//    <nav className="Top-Nav"> 
//       {/* <div className="SearchBax"> 
//         <div className="SerchInput">
//           <input
//             type="text"
//             placeholder="Search for people, tags,folders,and Looms"
//             onChange={searchHandle}
//           />
//           <button className="SearchBtn">
//             <SearchOutlined style={{ fontSize: "midium" }} />  
//           </button>
//         </div>
//        </div>      */}
//    <div className="img">
//     <img src="https://cdn.loom.com/assets/[1]/library-empty-state-099b9b7945d18abb085b9a4da88ba3b3.png"/> 
//    </div>
//    <div className="heading">
//     <h2>Record your first Loom</h2>
//     <p>Try making a test video and share it. <br/> (No pressure, we're all friends here.)</p>
//    </div>
//    </nav>
//   ) 
// }

// export default Nav