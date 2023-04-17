import { useState } from "react";
import Client from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddFeeding(props) {
  // Define state variables
  const [addFeeding, setAddFeeding] = useState([]);

  // Add state variable for alert
  const [showAlert, setShowAlert] = useState(false);

  // Add state variable for navigate
  const navigate = useNavigate();

  // Define form data state variable
  const [formData, setFormData] = useState({
    log: "",
    amount: "",
    method: "",
    notes: "",
  });

  // Load form data from localStorage
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const res = await Client.post("/feedings/", formData);
    console.log(res.data);
    setAddFeeding(res.data);

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
            <div className="alert alert-success">Feeding logged</div>
          )}

          <h3>Add feeding</h3>

          <div>
            <label htmlFor="log" className="mb-1">
              <small className=" fw-semibold text-muted">Date and time</small>
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
            <label htmlFor="amount" className="mb-1">
              <small className=" fw-semibold text-muted">Amount</small>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="method" className="mb-1">
              <small className=" fw-semibold text-muted">Feeding method</small>
            </label>
            <select
              className="form-control"
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
            >
              <option value="">-- Select an option --</option>
              <option value="1">Bottle</option>
              <option value="2">Breast</option>
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
            className="btn btn-primary rounded-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
