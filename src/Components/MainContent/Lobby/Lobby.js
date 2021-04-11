import React from "react";
import "./Lobby.css";
import { useAuth } from "../../../context/AuthProvider";

export default function Lobby() {
  const { user, functions } = useAuth();
  console.log(user)

  return (
    <div className="lobby_wrap">
      <h1>Hey, {user?.email} 👋! </h1>
      <p>Please chose what you're going to do:</p>
      <ul>
        <li>Create a post</li>
        <li>See all posts</li>
      </ul>
    </div>
  );
}
