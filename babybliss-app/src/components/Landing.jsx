import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-container p-5 d-flex row gap-5 h-100">
      <div className="landing-content text-center bg-danger p-5">
        <h1 className="landing-title">BabyBliss</h1>
        <p className="landing-text">
          BabyBliss is a web application that allows parents to keep track of
          their baby's diaper and feeding habits.
        </p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>

      <div className="section-container d-flex align-items-center bg-dark">
        <div className="section-content w-50 text-bg-dark">
          <h2>Section</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            iure velit. Soluta ratione unde deserunt? Hic, dolorem blanditiis.
            Optio aliquid enim perspiciatis iste saepe maxime, molestiae tempore
            ipsam laboriosam modi!
          </p>
        </div>
        <img
          className="w-50"
          src="https://via.placeholder.com/600x400"
          alt=""
        />
      </div>
    </div>
  );
}
