import React, { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context/AuthProvider";
import MainContent from "./Components/MainContent/MainContent";
import Loader from "./Components/Loader";
import Auth from "./Components/Auth/Auth";
import { getAllOffers, createOffer, initizlize } from "./services/firestore";
import { BrowserRouter as Route, Switch, useLocation } from "react-router-dom";
import ShowRoom from "./Components/ShowRoom/ShowRoom";

function App() {
  let loc = useLocation();
  const { loading, isAuthorized, functions } = useAuth();

  // useEffect(() => {
  //   const res = initizlize();
  //   if (res) functions.setLoading(false);
  // }, []);

  if (loading) return <Loader />;

  if (loc.pathname === "/offer") {
    return <ShowRoom />;
  }

  return <div className="App">{isAuthorized ? <MainContent /> : <Auth />}</div>;
}

export default App;
