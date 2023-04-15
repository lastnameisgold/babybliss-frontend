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
    <div key={diaper.id}>
      <h1>Diaper Details</h1>
      <p>{diaper.log}</p>
      <p>{diaper.diaper}</p>
      <p>{diaper.rash}</p>
      <p>{diaper.notes}</p>
    </div>
  );
}
