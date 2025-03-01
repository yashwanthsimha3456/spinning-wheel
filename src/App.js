import React from "react";
import SpinningWheel from "./SpinningWheel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="app-container d-flex align-items-center justify-content-center vh-100">
      <ToastContainer />
      <SpinningWheel />
    </div>
  );
}

export default App;
