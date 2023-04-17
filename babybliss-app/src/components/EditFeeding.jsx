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
    <div className="p-4">
      <form onSubmit={(e) => props.handleSubmitFeeding(e, id)}>
        {props.showAlert && (
          <div className="alert alert-success">Feeding updated</div>
        )}
        <div className="form-group p-4">
          <h3>Edit feeding</h3>
          <label htmlFor="log">Date and time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="log"
            name="log"
            value={props.formData.log}
            onChange={props.handleChange}
          />

          <label htmlFor="amount">Amount</label>
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

          <label htmlFor="method">Feeding Method</label>
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
