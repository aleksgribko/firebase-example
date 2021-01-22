import React, { useState } from "react";
import "./Auth.css";
import TextField from "@material-ui/core/TextField";
import Button from "../Button";
import { useAuth } from "../../context/AuthProvider";

export default function Auth() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { functions } = useAuth();

  const handleLogIn = () => {
    const res = functions.setAuth(password, name);

    if (!res) {
      alert("Get out of here 🚷 or we call cops 👮🏼‍♂️");
    }
  };

  return (
    <div className="auth__wrap">
      <div className="popup_wrap">
        <h1 className="popup_title">SPARKMATE</h1>
        <p> 🔐 Achtung! You are entering the protected area</p>
        <form noValidate autoComplete="off" className="popup_form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button action={handleLogIn} />
        </form>
      </div>
    </div>
  );
}
