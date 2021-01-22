import React from "react";
// import logo from "../../../assets/logo.png";
import "./Menu.css";
import Button from "../../Button";
import { useAuth } from "../../../context/AuthProvider";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Menu() {
  const { functions } = useAuth();

  return (
    <div className="menu_wrap">
      {/* <img alt="Sparkmate logo" className="menu_img" /> */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="menu_title">SPARKMATE</h1>
      </Link>
      <Link to="/fill" style={{ textDecoration: "none" }}>
        <div className="menu_option">Fill the form</div>
      </Link>
      <Link to="/get" style={{ textDecoration: "none" }}>
        <div className="menu_option">Show what you got</div>
      </Link>
      <div className="menu_logout_button">
        <Button action={() => functions.logOut()} text="Log Out" />
      </div>
    </div>
  );
}
