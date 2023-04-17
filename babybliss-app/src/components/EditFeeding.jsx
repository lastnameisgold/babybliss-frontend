import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditFeeding(props) {
  const [feeding, setFeeding] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const getSelectedFeeding = async () => {
      console.log(props.feedingContent);
      if (props.feedingContent && props.feedingContent[id]) {
        let selectedFeeding = props.feedingContent.find(
          (feeding) => feeding.id === parseInt(id)
        );
        setFeeding(selectedFeeding);
        console.log(getSelectedFeeding);
      }
    };
    getSelectedFeeding();
  }, [props.feedingContent, id]);

  return (
    <div className="form-container p-4 d-flex justify-content-center align-items-center">
      <form onSubmit={(e) => props.handleSubmitFeeding(e, id)} className="w-50">
        <div className="form-group p-4 d-grid gap-3">
          {props.showAlert && (
            <div className="alert alert-success">Feeding updated</div>
          )}

          <h3>Edit feeding</h3>

          <div>
            <label htmlFor="log" className="mb-1">
              <small className=" fw-semibold text-muted">Date and time</small>
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
              value={props.formData.amount}
              onChange={props.handleChange}
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
              value={props.formData.method}
              onChange={props.handleChange}
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
