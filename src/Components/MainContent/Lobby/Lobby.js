import React from "react";
import "./Lobby.css";
import { useAuth } from "../../../context/AuthProvider";

export default function Lobby() {
  const { name, functions } = useAuth();

  return (
    <div className="lobby_wrap">
      <h1>Hey, {name} 👋! </h1>
      <p>Please chose what you're going to do:</p>
      <ul>
        <li>Fill in the form for a new business offer</li>
        <li>Find an existing business offer</li>
      </ul>
    </div>
  );
}
