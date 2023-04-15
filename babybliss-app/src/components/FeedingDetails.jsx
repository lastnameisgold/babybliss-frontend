// export default function FeedingDetails() {
//   return <h1>Feeding Details</h1>;
// }

import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Data } from "../Data";

export default function FeedingDetails(props) {
  // const [formData, setFormData] = useContext(Data);
  const [feeding, setFeeding] = useState([]);

  let { id } = useParams();

  console.log(id);

  // let navigate = useNavigate();

  useEffect(() => {
    const getFeedingContent = async () => {
      const response = await fetch(`http://localhost:8000/feedings/${id}`);
      const data = await response.json();
      console.log(data);
      setFeeding(data);
    };

    getFeedingContent();
  }, [id]);

  console.log(feeding);

  return (
    <div key={feeding.id} className="p-5">
      <div className="text-bg-dark rounded-4 p-4">
        <div>
          <h2>🍼</h2>
          <p>{feeding.log}</p>
          <p>{feeding.amount}</p>
          <p>{feeding.method}</p>
          <p>{feeding.notes}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">Edit</button>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.handleDeleteFeeding(feeding.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
