import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import DetailView from "./DetailView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/crypto/:id" element={<DetailView />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
