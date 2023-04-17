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
    <div className="p-4">
      <form onSubmit={(e) => props.handleSubmitDiaper(e, id)}>
        <div className="form-group p-4 d-grid gap-3">
          {props.showAlert && (
            <div className="alert alert-success">Diaper updated</div>
          )}

          <h3>Edit diaper</h3>

          <div>
            <label htmlFor="log">Date and time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="log"
              name="log"
              value={props.formData.log}
              onChange={props.handleChange}
            />
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              type="text"
              className="form-control"
              id="notes"
              name="notes"
              value={props.formData.notes}
              onChange={props.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
