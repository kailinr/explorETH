import React from "react";
import "./assets/App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Block from "./pages/block/Block";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar></Navbar>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/block/:blocknumber">
          <Block />
        </Route>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
