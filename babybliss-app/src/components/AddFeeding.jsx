import { useState } from "react";
import Client from "../services/api";

export default function AddFeeding(props) {
  // Define state variables
  const [addFeeding, setAddFeeding] = useState([]);

  // Add state variable for alert
  const [showAlert, setShowAlert] = useState(false);

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
  };

  return (
    <div className="p-4">
      <form>
        {showAlert && <div className="alert alert-success">Feeding logged</div>}
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

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <label htmlFor="method">Feeding Method</label>
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
