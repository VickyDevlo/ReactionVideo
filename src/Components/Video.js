import React, {
    useEffect,
    useRef,
    useState
} from "react";
import axios from "axios";
import * as SignalWire from "@signalwire/js";
let onRoomUpdate;

export default function Video({
    onRoomInit = () => {},
    width = 400,
    joinDetails: roomDetails = {
        room: "signalwire",
        name: "JohnDoe",
        mod: false,
    },
    eventLogger = (msg) => {
        console.log("Event:", msg);
    },
}) {
    let [setupDone, setSetupDone] = useState(false);
    let thisMemberId = useRef(null);

    useEffect(() => {
        if (setupDone) return;
        setup_room();
        async function setup_room() {
            setSetupDone(true);
            let token, room;
            try {
                token = await axios.post("/get_token", {
                    user_name: roomDetails.name,
                    room_name: roomDetails.room,
                    mod: roomDetails.mod,
                });
                console.log(token.data);
                token = token.data.token;

                try {
                    try {
                        room = await SignalWire.Video.createRoomObject({
                            token,
                            rootElementId: "stream",
                            video: true,
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    room.on("room.joined", async (e) => {
                        thisMemberId.current = e.member_id;
                        eventLogger("You have joined the room.");
                    });
                    room.on("room.updated", async (e) => {
                        eventLogger("Room has been updated");
                    });
                    room.on("member.joined", async (e) => {
                        eventLogger(e.member.name + " has joined the room.");
                    });
                    room.on("layout.changed", async (e) => {
                        // To change the selected layout
                                    onRoomUpdate({ layout: e.layout.name });
                            });
                    room.on("member.left", async (e) => {
                        let memberList = await room.getMembers();
                        let member = memberList.current.filter((m) => m.id === e.member.id);
                        if (member.length === 0) {
                            return;
                        }
                        eventLogger(member[0]?.name + " has left the room.");
                    });

                    await room.join();

                    let layouts = (await room.getLayouts()).layouts;
                    let cameras =
                        await SignalWire.WebRTC.getCameraDevicesWithPermissions();
                    let microphones =
                        await SignalWire.WebRTC.getMicrophoneDevicesWithPermissions();
                    let speakers =
                        await SignalWire.WebRTC.getSpeakerDevicesWithPermissions();

                    onRoomInit(room, layouts, cameras, microphones, speakers);

                    let camChangeWatcher = await SignalWire.WebRTC.createDeviceWatcher({
                        targets: ["camera"],
                    });
                    camChangeWatcher.on("changed", (changes) => {
                        eventLogger("The list of camera devices has changed");
                        onRoomUpdate({
                            cameras: changes.devices
                        });
                    });
                    let micChangeWatcher = await SignalWire.WebRTC.createDeviceWatcher({
                        targets: ["microphone"], 
                    });
                    micChangeWatcher.on("changed", (changes) => {
                        eventLogger("The list of microphone devices has changed");
                        onRoomUpdate({
                            microphones: changes.devices
                        });
                    });
                    let speakerChangeWatcher =
                        await SignalWire.WebRTC.createDeviceWatcher({
                            targets: ["speaker"],
                        });
                    speakerChangeWatcher.on("changed", (changes) => {
                        eventLogger("The list of speakers has changed");
                        onRoomUpdate({
                            speakers: changes.devices
                        });
                    })

                } catch (error) {
                    console.error("Something went wrong", error);
                }
            } catch (e) {
                console.log(e);
                alert("Error encountered. Please try again.");
            }
        }
    }, [roomDetails, eventLogger, onRoomInit, onRoomUpdate, setupDone]);
    return (<div id = "stream" style = {{width}}/>);
}