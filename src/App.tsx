import React from "react";

// routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import Login from "./components/Login";
import Success from "./components/Success";
import Register from "./components/Register";

// styles

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginsuccess" element={<Success />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
