import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ScreenRecording from "./ScreenRecording"; 

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<ScreenRecording />} /> 
    </Routes>
  </BrowserRouter>
);
export default Router;
