import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Client from "./services/api";
import Data from "./Data";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Logout } from "./components/Logout";
import AddDiaper from "./components/AddDiaper";
import AddFeeding from "./components/AddFeeding";
import DiaperDetails from "./components/DiaperDetails";
import FeedingDetails from "./components/FeedingDetails";
import EditDiaper from "./components/EditDiaper";
import EditFeeding from "./components/EditFeeding";

function App() {
  const [affirmations, setAffirmations] = useState([]);
  // State to handle affirmations

  const [baby, setBaby] = useState([]);
  // State to handle baby

  const [diaper, setDiaper] = useState([]);
  // State to handle diaper

  const [feeding, setFeeding] = useState([]);
  // State to handle feeding

  const [error, setError] = useState(null);
  // State to handle error

  const [diaperContent, setDiaperContent] = useState([]);
  // State to handle diaper content

  const [feedingContent, setFeedingContent] = useState([]);
  // State to handle feeding content

  const [formData, setFormData] = useState({
    log: "",
    diaper: "",
    rash: "",
    amount: "",
    method: "",
    notes: "",
    diaper_id: JSON.parse(localStorage.getItem("formData"))?.diaper_id,
    feeding_id: JSON.parse(localStorage.getItem("formData"))?.feeding_id,
  });
  // State to handle form data

  useEffect(() => {
    // localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

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
  // Fetch affirmations from API

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
  // Fetch baby from API

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
  // Fetch diaper from API

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
  // Fetch feeding from API

  const getDiaperContent = () => {
    Client.get(`/diapers`).then((getDiaperContent) => {
      setDiaperContent(getDiaperContent.data);
    });
  };

  useEffect(() => {
    getDiaperContent();
  }, []);
  // Fetch diaper content from API

  const getFeedingContent = () => {
    Client.get(`/feedings`).then((getFeedingContent) => {
      setFeedingContent(getFeedingContent.data);
    });
  };

  useEffect(() => {
    getFeedingContent();
  }, []);
  // Fetch feeding content from API

  let navigate = useNavigate();
  // Navigate to different pages

  const showDiaper = (diaper) => {
    navigate(`${diaper.id}`);
  };
  // Show diaper

  const showFeeding = (feeding) => {
    navigate(`${feeding.id}`);
  };
  // Show feeding

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // Handle change

  const handleSubmitDiaper = async (e, id) => {
    console.log("id:", id);
    e.preventDefault();
    console.log(formData);
    Client.put(`/diapers/${id}`, formData).then(() => {
      navigate("/");
      getDiaperContent();
    });
  };
  // Handle submit diaper

  const handleSubmitFeeding = async (e, id) => {
    console.log("id", id);
    e.preventDefault();
    console.log(formData);
    Client.put(`/feedings/${id}`, formData).then(() => {
      navigate("/");
      getFeedingContent();
    });
  };
  // Handle submit feeding

  // Handle delete diaper
  const handleDeleteDiaper = (id) => {
    Client.delete(`/diapers/${id}`).then(() => {
      navigate("/");
      getDiaperContent();
      window.location.reload(); // Refresh the page
    });
  };

  const handleDeleteFeeding = (id) => {
    Client.delete(`/feedings/${id}`).then(() => {
      navigate("/");
      getFeedingContent();
      window.location.reload(); // Refresh the page
    });
  };
  // Handle delete feeding

  return (
    <div className="App">
      <Data.Provider value={{ formData, setFormData }}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                affirmations={affirmations}
                error={error}
                baby={baby}
                diaper={diaper}
                feeding={feeding}
                showDiaper={showDiaper}
                showFeeding={showFeeding}
              />
            }
          />

          <Route
            path="/adddiaper"
            element={
              <AddDiaper
                diaper={diaper}
                diaperContent={diaperContent}
                showDiaper={showDiaper}
              />
            }
          />

          <Route
            path="/diaperdetails/:id"
            element={
              <DiaperDetails
                diaper={diaper}
                diaperContent={diaperContent}
                handleChange={handleChange}
                handleSubmitDiaper={handleSubmitDiaper}
                handleDeleteDiaper={handleDeleteDiaper}
                formData={formData}
              />
            }
          />

          <Route
            path="/addfeeding"
            element={
              <AddFeeding
                feeding={feeding}
                feedingContent={feedingContent}
                showFeeding={showFeeding}
              />
            }
          />

          <Route
            path="/feedingdetails/:id"
            element={
              <FeedingDetails
                feeding={feeding}
                feedingContent={feedingContent}
                handleChange={handleChange}
                handleSubmitFeeding={handleSubmitFeeding}
                handleDeleteFeeding={handleDeleteFeeding}
                formData={formData}
              />
            }
          />

          <Route
            path="/editdiaper/:id"
            element={<EditDiaper />}
            diaper={diaper}
            diaperContent={diaperContent}
            handleChange={handleChange}
            handleSubmitDiaper={handleSubmitDiaper}
            formData={formData}
          />

          <Route
            path="/editfeeding/:id"
            element={<EditFeeding />}
            feeding={feeding}
            feedingContent={feedingContent}
            handleChange={handleChange}
            handleSubmitFeeding={handleSubmitFeeding}
            formData={formData}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
