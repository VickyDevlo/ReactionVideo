import React, { useState } from "react";
import "./App.css";

const Menu = ({ setLineColor }) => {
  return (
    <div className="Menu PenDrow">
      <input
        id="ColorChanger"
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
    </div>
  );
};

export default Menu;
