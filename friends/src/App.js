import React from "react";
import "./App.css";
import { Link, Route, Redirect } from "react-router-dom";
import Login from './components/Login'
import Profile from "./components/Profile";

function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="App">
      <div>
        <Link to="/">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <Route exact path="/" render={props => {
        if (token) {
          return <Redirect to="/profile" />
        }
        return <Login {...props} />
      }} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );

}

export default App;
