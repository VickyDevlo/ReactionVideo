import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ScreenRecording from "./ScreenRecording";
import Content from "./Content";
import PopUpMenu from "./PopUpMenu";
import Main from "./Main";
import "./App.css"; 
import Video from "./Video"; 

export default function App() {
  return (
    <div className="App">
      <ScreenRecording />
      <PopUpMenu />
      <Content />
      <Main />  
      {/* <Video /> */}
       
   
    </div>
  );
}
