// Loader.js
import React from "react";
import "../App.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;
