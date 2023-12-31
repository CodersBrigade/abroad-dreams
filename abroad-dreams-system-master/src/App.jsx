import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navi from "./components/Header.jsx";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Welcome!</h1>
        <p>Login as </p>
        <a href="/login/">
          <button className="btn btn-danger">Student</button>
        </a>
        <a href="/login/">
          <button className="btn btn-danger">Administrator</button>
        </a>
      </div>
    </div>
  );
}

export default App;
