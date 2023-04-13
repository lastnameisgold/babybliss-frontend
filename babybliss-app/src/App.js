import "./App.css";
import React, { useState, useEffect } from "react";
import Client from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Logout } from "./components/Logout";
import AddDiaper from "./components/AddDiaper";

function App() {
  const [affirmations, setAffirmations] = useState([]); // State to handle affirmations
  const [baby, setBaby] = useState([]); // State to handle baby
  const [diaper, setDiaper] = useState([]); //
  const [feeding, setFeeding] = useState([]); // State to handle feeding
  const [error, setError] = useState(null); // State to handle error

  const [diaperContent, setDiaperContent] = useState([]);

  // Fetch affirmations from API
  useEffect(() => {
    const getAffirmations = async () => {
      try {
        const res = await Client.get("/affirmations/");
        setAffirmations(res.data);
      } catch (error) {
        console.error("Failed to get affirmations", error);
        setError("Failed to get affirmations. Please try again."); // Set error state
      }
    };
    getAffirmations();
  }, []);

  // Fetch baby from API
  useEffect(() => {
    const getBaby = async () => {
      try {
        const res = await Client.get("/babies/");
        setBaby(res.data);
      } catch (error) {
        console.error("Failed to get baby", error);
        setError("Failed to get baby. Please try again."); // Set error state
      }
    };
    getBaby();
  }, []);

  // Fetch diaper from API
  useEffect(() => {
    const getDiaper = async () => {
      try {
        const res = await Client.get("/diapers/");
        setDiaper(res.data);
      } catch (error) {
        console.error("Failed to get diaper", error);
        setError("Failed to get diaper. Please try again."); // Set error state
      }
    };
    getDiaper();
  }, []);

  // Fetch feeding from API
  useEffect(() => {
    const getFeeding = async () => {
      try {
        const res = await Client.get("/feedings/");
        setFeeding(res.data);
      } catch (error) {
        console.error("Failed to get feeding", error);
        setError("Failed to get feeding. Please try again."); // Set error state
      }
    };
    getFeeding();
  }, []);

  const getDiaperContent = () => {
    Client.get(`/diapers`).then((getDiaperContent) => {
      setDiaperContent(getDiaperContent.data);
    });
  };

  useEffect(() => {
    getDiaperContent();
  }, []);

  // const getContent = () => {
  //   Client.get(`/events`).then((getContent) => {
  //     setEventContent(getContent.data);
  //   });
  // };

  // useEffect(() => {
  //   getContent();
  // }, []);

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
                feeding={feeding}
              />
            }
          />
          <Route
            path="/diaper"
            element={<AddDiaper diaperContent={diaperContent} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
