import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../services/api";

export default function AddDiaper(props) {
  // Define state variables
  const [addDiaper, setAddDiaper] = useState([]);

  // Add state variable for alert
  const [showAlert, setShowAlert] = useState(false);

  // Add state variable for navigate
  const navigate = useNavigate();

  // Define form data state variable
  const [formData, setFormData] = useState({
    log: "",
    diaper: "",
    rash: "",
    notes: "",
  });

  // Load form data from localStorage
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // Save form data to localStorage
    const formDataString = JSON.stringify(formData);
    localStorage.setItem("formData", formDataString);

    // Prevent page refresh
    e.preventDefault();
    console.log(formData);

    // Send form data to API
    const res = await Client.post("/diapers/", formData);
    console.log(res.data);
    setAddDiaper(res.data);

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
  };

  return (
    <div className="form-container p-4 d-flex justify-content-center align-items-center">
      <form className="w-50">
        <div className="form-group p-4 d-grid gap-3">
          {showAlert && (
            <div className="alert alert-success">Diaper logged</div>
          )}

          <h3>Add diaper</h3>

          <div>
            <label htmlFor="log" className="mb-1">
              <small className="fw-semibold text-muted">Date and time</small>
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="log"
              name="log"
              value={formData.log}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="diaper" className="mb-1">
              <small className="fw-semibold text-muted">Diaper</small>
            </label>
            <select
              className="form-control"
              id="diaper"
              name="diaper"
              value={formData.diaper}
              onChange={handleChange}
            >
              <option value="">-- Select an option --</option>
              <option value="1">Wet</option>
              <option value="2">Dirty</option>
            </select>
          </div>

          <div>
            <label htmlFor="rash" className="mb-1">
              <small className="fw-semibold text-muted">Rash</small>
            </label>
            <select
              className="form-control"
              id="rash"
              name="rash"
              value={formData.rash}
              onChange={handleChange}
            >
              <option value="">-- Select an option --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="mb-1">
              <small className=" fw-semibold text-muted">Notes</small>
            </label>
            <textarea
              type="text"
              className="form-control"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
