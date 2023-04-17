import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Data from "../Data";

export default function FeedingDetails(props) {
  const sharedData = useContext(Data);
  const [feeding, setFeeding] = useState([]);

  let { id } = useParams();

  console.log(id);

  let navigate = useNavigate();

  // Update formData using setFormData
  const setFormData = useContext(Data)[1];

  // Get the setter function
  const showFeeding = (e) => {
    const formDataString = JSON.stringify(sharedData);
    localStorage.setItem("formData", formDataString);
    navigate(`/editfeeding/${e.id}`);
  };

  useEffect(() => {
    const getFeedingContent = async () => {
      const response = await fetch(`http://localhost:8000/feedings/${id}`);
      const data = await response.json();
      console.log(data);
      setFeeding(data);
    };

    getFeedingContent();
  }, [id]);

  console.log(feeding);

  const logDate = new Date(feeding.log);
  const logDateString = logDate.toLocaleString();

  return (
    <div key={feeding.id} className="p-5">
      {props.showAlert && (
        <div className="alert alert-danger">Diaper log deleted</div>
      )}
      <div className="text-bg-dark rounded-4 p-4 d-flex align-items-start">
        <div className="me-auto">
          <h2>🍼</h2>
          <p>
            <small className="text-uppercase fw-semibold">Amount</small>
            <br />
            {feeding.amount} oz
          </p>

          <p>
            <small className="text-uppercase fw-semibold">Method</small>
            <br />
            {feeding.method === 1 ? "Bottle" : "Breast"}
          </p>

          {feeding.notes !== "" && (
            <p>
              <small className="text-uppercase fw-semibold">Note</small>
              <br />
              {feeding.notes}
            </p>
          )}

          <small>
            <p>{logDateString}</p>
          </small>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => showFeeding(feeding)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.handleDeleteFeeding(feeding.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
