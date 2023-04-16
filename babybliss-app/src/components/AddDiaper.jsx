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
    setTimeout(() => {
      navigate("/");
      // Navigate to /diapers
      window.location.reload();
      // Refresh the page
    }, 1500);
    // After 2 seconds, navigate to /diapers
  };

  return (
    <div className="p-4">
      <form>
        {showAlert && <div className="alert alert-success">Diaper logged</div>}
        <div className="form-group p-4">
          <label htmlFor="log">Date and time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="log"
            name="log"
            value={formData.log}
            onChange={handleChange}
          />

          <label htmlFor="diaper">Diaper</label>
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

          <label htmlFor="rash">Rash</label>
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

          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            className="form-control"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

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
