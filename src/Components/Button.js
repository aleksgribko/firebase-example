import React from "react";
import "./Button.css";
export default function Button({ variant, text, action }) {
  return (
    <div onClick={() => action()} className={variant || "default"}>
      <span>{text || "OK"}</span>
    </div>
  );
}
