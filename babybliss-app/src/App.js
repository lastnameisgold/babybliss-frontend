import React, { useState, useEffect } from "react";
import Client from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Logout } from "./components/Logout";

function App() {
  const [affirmations, setAffirmations] = useState([]);
  const [baby, setBaby] = useState([]);
  const [diaper, setDiaper] = useState([]);
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    const getAffirmations = async () => {
      try {
        const res = await Client.get("/affirmations/");
        setAffirmations(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to get affirmations", error);
        setError("Failed to get affirmations. Please try again."); // Set error state
      }
    };
    getAffirmations();
  }, []);

  useEffect(() => {
    const getBaby = async () => {
      try {
        const res = await Client.get("/babies/");
        setBaby(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to get baby", error);
        setError("Failed to get baby. Please try again."); // Set error state
      }
    };
    getBaby();
  }, []);

  useEffect(() => {
    const getDiaper = async () => {
      try {
        const res = await Client.get("/diapers/");
        setDiaper(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to get diaper", error);
        setError("Failed to get diaper. Please try again."); // Set error state
      }
    };
    getDiaper();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                affirmations={affirmations}
                error={error} // Pass error prop to Home component
                baby={baby}
                diaper={diaper}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
