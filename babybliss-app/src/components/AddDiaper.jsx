import { useState } from "react";
import Client from "../services/api";

export default function AddDiaper(props) {
  // Define state variables
  const [addDiaper, setAddDiaper] = useState([]);
  // Define form data state variable
  const [formData, setFormData] = useState({
    log: "",
    diaper: "",
    rash: "",
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
    const res = await Client.post("/diapers/", formData);
    console.log(res.data);
    setAddDiaper(res.data);
  };

  return (
    <div>
      <form>
        <div className="form-group">
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
            <option value="1">Wet</option>
            <option value="2">Dirty</option>
          </select>

          {/* <label htmlFor="rash">Rash</label>
          <select
            className="form-control"
            id="rash"
            name="rash"
            value={formData.rash}
            onChange={handleChange}
          >
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select> */}

          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            className="form-control"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          {/* <label htmlFor="baby">Baby</label>
          <select
            className="form-control"
            id="baby"
            name="baby"
            value={formData.baby}
            onChange={handleChange}
          >
            <option value="1">Baby 1</option>
            <option value="2">Baby 2</option>
          </select> */}

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      {addDiaper && (
        <div>
          <h2>{addDiaper.log}</h2>
          <h2>{addDiaper.diaper}</h2>
          <h2>{addDiaper.rash}</h2>
          <h2>{addDiaper.notes}</h2>
        </div>
      )}
    </div>
  );
}
