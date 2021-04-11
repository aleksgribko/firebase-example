import React from "react";
import "./MainContent.css";
import Menu from "./Menu/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Lobby from "./Lobby/Lobby";
import Form from "./Form/Form";
import AllPosts from "./AllPosts/AllPosts";

export default function MainContent() {
  return (
    <div className="main_content_wrap">
      <div className="main_content_menu">
        <Menu />
      </div>
      <div className="main_content_body">
        <Switch>
          <Route path="/fill">
            <Form />
          </Route>
          <Route path="/get">
            <AllPosts />
          </Route>
          <Route path="/">
            <Lobby />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
