import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditDiaper(props) {
  const [diaper, setDiaper] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const getSelectedDiaper = async () => {
      console.log(props.diaperContent);
      if (props.diaperContent && props.diaperContent[id]) {
        let selectedDiaper = props.diaperContent.find(
          (diaper) => diaper.id === parseInt(id)
        );
        setDiaper(selectedDiaper);
        console.log(getSelectedDiaper);
      }
    };
    getSelectedDiaper();
  }, [props.diaperContent, id]);

  return (
    <div>
      <h2>Edit diaper</h2>
      <form onSubmit={(e) => props.handleSubmitDiaper(e, id)}>
        {/* {showAlert && <div className="alert alert-success">Diaper logged</div>} */}
        <div className="form-group p-4">
          <label htmlFor="log">Date and time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="log"
            name="log"
            value={props.formData.log}
            onChange={props.handleChange}
          />

          <label htmlFor="diaper">Diaper</label>
          <select
            className="form-control"
            id="diaper"
            name="diaper"
            value={props.formData.diaper}
            onChange={props.handleChange}
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
            value={props.formData.rash}
            onChange={props.handleChange}
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
            value={props.formData.notes}
            onChange={props.handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
