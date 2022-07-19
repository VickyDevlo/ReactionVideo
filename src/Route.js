import React from "react";
import { Route, Routes } from "react-router-dom"; 
import ScreenRecording from "./ScreenRecording"; 

const Router = () => (
 
    <Routes>
      <Route exact path="/" element={<ScreenRecording />} /> 
    </Routes>
 
);
export default Router;
