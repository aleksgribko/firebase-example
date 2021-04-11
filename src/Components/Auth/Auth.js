import React, {useState} from "react";
import "./Auth.scss";
import TextField from "@material-ui/core/TextField";
import Button from "../Button";
import {useAuth} from "../../context/AuthProvider";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {functions} = useAuth();

  const handleLogIn = () => {
    functions.signIn(email, password);
  };

  const handleSignUp = () => {
    functions.signUp(email, password);
  };

  return (
    <div className="auth__wrap">
      <div className="bgimg" />
      <div className="popup">
        <h1 className="popup__title">Wild Code School Firebase</h1>
        <p> 🔐 Achtung! You are entering a protected area</p>
        <div className="popup__sections_wrap">
          <div className="popup__section">
            <form noValidate autoComplete="off" className="popup__form">
              <h2>Sign In</h2>
              <TextField
                id="standard-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button action={handleLogIn} text={'OK'}/>
            </form>
          </div>
          <div className="popup__dividing_line"></div>
          <div className="popup__section">
            <form noValidate autoComplete="off" className="popup__form">
            <h2>Sign Up</h2>

              <TextField
                id="standard-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button action={handleSignUp} text={'Create'}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
