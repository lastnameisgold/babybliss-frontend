// Import the react JS packages
import { useEffect } from "react";
import axios from "axios";

// Define the Login function.
export const Home = (props) => {
  console.log(props);
  // Randomly select an affirmation from the affirmations array.
  const rand = Math.floor(Math.random() * props.affirmations.length);

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
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);
  return (
    <div className="home-container p-5 d-grid gap-3">
      <div
        className="affirmation-container w-100 p-5 rounded-3 text-center text-bg-primary d-flex justify-content-center align-items-center"
        style={{ height: "40vh" }}
      >
        <h2 className="affirmation-title">
          {props.affirmations[rand]?.message}
        </h2>
      </div>

      <div className="flex-wrap d-grid gap-3">
        {props.diaper &&
          props.feeding &&
          [...props.diaper, ...props.feeding] // Merge diaper and feeding arrays
            .sort((a, b) => new Date(b.log) - new Date(a.log)) // Sort combined array in descending order based on log property
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
                  className="diaper-feeding-container text-bg-primary w-100 p-4 rounded-3 text-left justify-content-left align-items-left"
                  key={event.id}
                >
                  {event.diaper ? (
                    <>
                      <h2>{event.diaper === 1 ? "💦" : "💩"}</h2>
                      <p>Diaper: {event.diaper === 1 ? "Wet" : "Dirty"}</p>
                    </>
                  ) : (
                    <>
                      <h2>🍼</h2>
                      <p>Amount: {event.amount} oz</p>
                      <p>
                        Breastfed: {event.breastFed === true ? "Yes" : "No"}
                      </p>
                    </>
                  )}
                  <p>
                    Date: {logDateString} at {logTimeString}
                  </p>
                  <p>Name: {event.baby.name}</p>
                  {event.notes && event.notes !== "" && (
                    <p>Note: {event.notes}</p>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};
