// Import the react JS packages
import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Data from "../Data";

// Define the Login function.
export const Home = (props) => {
  // Randomly select an affirmation from the affirmations array.
  const rand = Math.floor(Math.random() * props.affirmations.length);

  const { formData, setFormData } = useContext(Data);

  let navigate = useNavigate();

  // Update formData using setFormData
  const showDetails = (event) => {
    setFormData({ ...formData, diaper_id: event.id });

    // Check if it's a diaper card or a feeding card
    if (event.diaper !== undefined) {
      // Diaper card clicked, navigate to diaper details
      navigate(`/diaperdetails/${event.id}`);
    } else {
      // Feeding card clicked, navigate to feeding details
      navigate(`/feedingdetails/${event.id}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(data);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);
  return (
    <div className="home-container bg-light d-grid gap-3">
      <div className="affirmation-container">
        <div className="affirmation-content text-center d-flex justify-content-center align-items-center">
          <h2 className="affirmation-title">
            {props.affirmations[rand]?.message}
          </h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex-wrap d-grid gap-3">
          {props.diaper &&
            props.feeding &&
            // Merge diaper and feeding arrays
            [...props.diaper, ...props.feeding]
              // Sort combined array in descending order based on log property
              .sort((a, b) => new Date(b.log) - new Date(a.log))
              .map((event) => {
                // Convert log to Date object
                const logDate = new Date(event.log);
                // Extract date and time components
                const logDateString = logDate.toLocaleDateString();
                const logTimeString = logDate.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  // Render diaper and feeding events
                  <div
                    className="diaper-and-feeding-container text-bg-primary w-100 p-4 rounded-4 text-left justify-content-left align-items-left"
                    onClick={() => showDetails(event)}
                    key={event.id}
                  >
                    {event.diaper ? (
                      <>
                        <h2>{event.diaper === 1 ? "💦" : "💩"}</h2>
                        <p>
                          <small className="text-uppercase fw-semibold">
                            Diaper
                          </small>
                          <br />
                          {event.diaper === 1 ? "Wet" : "Dirty"}
                        </p>

                        <p>
                          <small className="text-uppercase fw-semibold">
                            Skin Rash
                          </small>
                          <br />
                          {event.rash === 1 ? "Yes" : "No"}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2>🍼</h2>
                        <p>
                          <small className="text-uppercase fw-semibold">
                            Amount
                          </small>
                          <br />
                          {event.amount} oz
                        </p>

                        <p>
                          <small className="text-uppercase fw-semibold ">
                            Feeding Method
                          </small>
                          <br />
                          {event.method === 1 ? "Bottle" : "Breast"}
                        </p>
                      </>
                    )}

                    {event.notes && event.notes !== "" && (
                      <p>
                        <small className="text-uppercase">Note</small>
                        <br />
                        {event.notes}
                      </p>
                    )}

                    <p>
                      <small>
                        {logDateString} at {logTimeString}
                      </small>
                    </p>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
