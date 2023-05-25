import React from "react";
import "../sass/style.css";

export default function Loader() {
  return (
    <div className="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
