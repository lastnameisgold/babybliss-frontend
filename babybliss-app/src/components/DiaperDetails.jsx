import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Data from "../Data";

export default function DiaperDetails(props) {
  const sharedData = useContext(Data);
  const [diaper, setDiaper] = useState([]);

  let { id } = useParams();

  let navigate = useNavigate();

  // Update formData using setFormData
  const setFormData = useContext(Data)[1];

  // Get the setter function
  const showDiaper = (e) => {
    const formDataString = JSON.stringify(sharedData);
    localStorage.setItem("formData", formDataString);
    navigate(`/editdiaper/${e.id}`);
  };

  useEffect(() => {
    const getDiaperContent = async () => {
      const response = await fetch(`http://localhost:8000/diapers/${id}`);
      const data = await response.json();
      console.log(data);
      setDiaper(data);
    };

    getDiaperContent();
  }, [id]);

  const logDate = new Date(diaper.log);
  const logDateString = logDate.toLocaleString();

  return (
    <div key={diaper.id} className="p-5">
      <div className="text-bg-dark rounded-4 p-4 d-flex align-items-start">
        <div className="me-auto">
          <h2>{diaper.diaper === 1 ? "💦" : "💩"}</h2>
          <span>
            <small className="text-uppercase"> Diaper</small>
          </span>
          <br />
          <p>{diaper.diaper === 1 ? "Wet" : "Dirty"}</p>
          <span>
            <small className="text-uppercase">Skin Rash</small>
          </span>
          <br />
          <p>{diaper.rash === 1 ? "Yes" : "No"}</p>
          <span>
            <small className="text-uppercase">Notes</small>
          </span>
          <br />
          <p>{diaper.notes}</p>
          <small>
            <p>{logDateString}</p>
          </small>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => showDiaper(diaper)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.handleDeleteDiaper(diaper.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
