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
    <div className="form-container p-4 d-flex justify-content-center align-items-center">
      <form onSubmit={(e) => props.handleSubmitDiaper(e, id)} className="w-50">
        <div className="form-group p-4 d-grid gap-3">
          {props.showAlert && (
            <div className="alert alert-success">Diaper updated</div>
          )}

          <h3>Edit diaper</h3>

          <div>
            <label htmlFor="log" className="mb-1">
              <small className="fw-semibold text-muted">Date and time</small>
            </label>
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
            <label htmlFor="diaper" className="mb-1">
              <small className="fw-semibold text-muted">Diaper</small>
            </label>
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
            <label htmlFor="rash" className="mb-1">
              <small className="fw-semibold text-muted">Rash</small>
            </label>
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
            <label htmlFor="notes" className="mb-1">
              <small className=" fw-semibold text-muted">Notes</small>
            </label>
            <textarea
              type="text"
              className="form-control"
              id="notes"
              name="notes"
              value={props.formData.notes}
              onChange={props.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary rounded-5">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
