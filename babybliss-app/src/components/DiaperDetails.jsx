import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Data } from "../Data";

export default function DiaperDetails(props) {
  // const [formData, setFormData] = useContext(Data);
  const [diaper, setDiaper] = useState([]);

  let { id } = useParams();

  console.log(id);

  // let navigate = useNavigate();

  useEffect(() => {
    const getDiaperContent = async () => {
      const response = await fetch(`http://localhost:8000/diapers/${id}`);
      const data = await response.json();
      console.log(data);
      setDiaper(data);
    };

    getDiaperContent();
  }, [id]);

  console.log(diaper);

  return (
    <div key={diaper.id} className="p-5">
      <div className="text-bg-light rounded-3 p-4">
        <div>
          <h2>{diaper.diaper === 1 ? "💦" : "💩"}</h2>
          <p>{diaper.log}</p>
          <p>{diaper.diaper}</p>
          <p>{diaper.rash}</p>
          <p>{diaper.notes}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">Edit</button>
          <button className="btn btn-light btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}
