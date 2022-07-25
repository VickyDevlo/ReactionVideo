import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Router from "./Route";
import Content from "./Content";
import Navbar from "./Components/SideMenu";
import PopUpMenu from "./PopUpMenu";
import Main from "./Main";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Main />
      <Router />
      <PopUpMenu />
      <Content />
    </div>
  );
}
