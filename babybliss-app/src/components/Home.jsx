// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";

// Define the Login function.
export const Home = (props) => {
  // const [message, setMessage] = useState("Welcome to BabyBliss!");

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
          // setMessage(data.message);
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
          {/* {message} */}
        </h2>
      </div>

      <div className="flex-wrap d-grid gap-3">
        {props.diaper &&
          props.diaper.map((event) => (
            <div className="diaper-container w-100 p-4 rounded-3 text-left text-bg-primary justify-content-left align-items-left">
              <p>Date: {event.log}</p>
              <p>Name: {event.baby}</p>
              <p>Note: {event.notes}</p>
            </div>
          ))}
        {props.feeding &&
          props.feeding.map((event) => (
            <div className="diaper-container w-100 p-4 rounded-3 text-left text-bg-dark justify-content-left align-items-left">
              <p>Date: {event.log}</p>
              <p>Name: {event.baby}</p>
              <p>Amount: {event.amount} oz</p>
              <p>Breastfed: {event.breastFed}</p>
              <p>Note: {event.notes}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
