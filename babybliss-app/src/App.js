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
import Landing from "./components/Landing";

function App() {
  // Add state variable for alert
  const [showAlert, setShowAlert] = useState(false);

  // State to handle affirmations
  const [affirmations, setAffirmations] = useState([]);

  // State to handle baby
  const [baby, setBaby] = useState([]);

  // State to handle diaper
  const [diaper, setDiaper] = useState([]);

  // State to handle feeding
  const [feeding, setFeeding] = useState([]);

  // State to handle error
  const [error, setError] = useState(null);

  // State to handle diaper content
  const [diaperContent, setDiaperContent] = useState([]);

  // State to handle feeding content
  const [feedingContent, setFeedingContent] = useState([]);

  // State to handle form data
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

  useEffect(() => {
    console.log(formData);
    // localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Fetch affirmations from API
  useEffect(() => {
    const getAffirmations = async () => {
      try {
        const res = await Client.get("/affirmations/");
        setAffirmations(res.data);
      } catch (error) {
        console.error("Failed to get affirmations", error);
        // Set error state
        setError("Failed to get affirmations. Please try again.");
      }
    };
    getAffirmations();
  }, []);

  // Fetch baby from API
  useEffect(() => {
    const getBaby = async () => {
      try {
        const res = await Client.get("/babies");
        setBaby(res.data);
      } catch (error) {
        console.error("Failed to get baby", error);
        // Set error state
        setError("Failed to get baby. Please try again.");
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
        // Set error state
        setError("Failed to get diaper. Please try again.");
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
        // Set error state
        setError("Failed to get feeding. Please try again.");
      }
    };
    getFeeding();
  }, []);

  // Fetch diaper content from API
  const getDiaperContent = () => {
    Client.get(`/diapers/`).then((getDiaperContent) => {
      setDiaperContent(getDiaperContent.data);
    });
  };

  useEffect(() => {
    getDiaperContent();
  }, []);

  // Fetch feeding content from API
  const getFeedingContent = () => {
    Client.get(`/feedings/`).then((getFeedingContent) => {
      setFeedingContent(getFeedingContent.data);
    });
  };

  useEffect(() => {
    getFeedingContent();
  }, []);

  // Navigate to different pages
  let navigate = useNavigate();

  // Show diaper
  const showDiaper = (diaper) => {
    navigate(`${diaper.id}`);
  };

  // Show feeding
  const showFeeding = (feeding) => {
    navigate(`${feeding.id}`);
  };

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle submit diaper
  const handleSubmitDiaper = async (e, id) => {
    console.log("id:", id);
    e.preventDefault();
    console.log(formData);
    Client.put(`/diapers/${id}`, formData).then(() => {
      // Update showAlert state to true to show alert
      setShowAlert(true);

      // Timeout to navigate to home and refresh page
      setTimeout(() => {
        // Navigate to home page
        navigate("/");
        // Refresh the page
        window.location.reload();
        // After 1.5 seconds, navigate to /diapers
      }, 1500);
      getDiaperContent();
    });
  };

  // Handle submit feeding
  const handleSubmitFeeding = async (e, id) => {
    console.log("id", id);
    e.preventDefault();
    console.log(formData);
    Client.put(`/feedings/${id}`, formData).then(() => {
      // Update showAlert state to true to show alert
      setShowAlert(true);

      // Timeout to navigate to home and refresh page
      setTimeout(() => {
        // Navigate to home page
        navigate("/");
        // Refresh the page
        window.location.reload();
        // After 1.5 seconds, navigate to /diapers
      }, 1500);
      getFeedingContent();
    });
  };

  // Handle delete diaper
  const handleDeleteDiaper = (id) => {
    Client.delete(`/diapers/${id}`).then(() => {
      // Update showAlert state to true to show alert
      setShowAlert(true);

      // Timeout to navigate to home and refresh page
      setTimeout(() => {
        // Navigate to home page
        navigate("/");
        // Refresh the page
        window.location.reload();
        // After 1.5 seconds, navigate to /diapers
      }, 1500);
      getDiaperContent();
    });
  };

  // Handle delete feeding
  const handleDeleteFeeding = (id) => {
    Client.delete(`/feedings/${id}`).then(() => {
      // Update showAlert state to true to show alert
      setShowAlert(true);

      // Timeout to navigate to home and refresh page
      setTimeout(() => {
        // Navigate to home page
        navigate("/");
        // Refresh the page
        window.location.reload();
        // After 1.5 seconds, navigate to /diapers
      }, 1500);
      getFeedingContent();
    });
  };

  return (
    <div className="App">
      <Data.Provider value={{ formData, setFormData }}>
        <Navigation />
        <Routes>
          <Route path="/landing" element={<Landing />} />

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
                showAlert={showAlert}
              />
            }
          />

          <Route
            path="/editdiaper/:id"
            element={
              <EditDiaper
                diaper={diaper}
                diaperContent={diaperContent}
                handleChange={handleChange}
                handleSubmitDiaper={handleSubmitDiaper}
                formData={formData}
                showAlert={showAlert}
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
                showAlert={showAlert}
              />
            }
          />

          <Route
            path="/editfeeding/:id"
            element={
              <EditFeeding
                feeding={feeding}
                feedingContent={feedingContent}
                handleChange={handleChange}
                handleSubmitFeeding={handleSubmitFeeding}
                formData={formData}
                showAlert={showAlert}
              />
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
