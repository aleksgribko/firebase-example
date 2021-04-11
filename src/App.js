import React from "react";
import "./App.css";
import { useAuth } from "./context/AuthProvider";
import MainContent from "./Components/MainContent/MainContent";
import Loader from "./Components/Loader";
import Auth from "./Components/Auth/Auth";
import { BrowserRouter as Route, Switch, useLocation } from "react-router-dom";

function App() {
  let loc = useLocation();
  const { loading, isAuthorized } = useAuth();

  if (loading) return <Loader />;


  return <div className="App">{isAuthorized ? <MainContent /> : <Auth />}</div>;
}

export default App;
