  import React from "react";
  import { useNavigate } from "react-router-dom";
  import certificateImg from "./assets/image.png";

  export default function AuthPage() {
    const navigate = useNavigate(); // Hook for navigation

    return (
      <div className="d-flex flex-column flex-md-row vh-100">
        {/* Right Side - Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-secondary">
          <img
            src={certificateImg}
            alt="E-Certificate"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Left Side - Text & Buttons */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5"
          style={{
            background: "#F8E8EE",
            color: "#5A5A5A",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}>
          <h2 className="mb-4 fw-bold text-center">Welcome to E-Certificate Portal</h2>
          <p className="text-center mb-4" style={{ maxWidth: "80%" }}>
            Easily generate, manage, and verify your certificates with our secure platform.
          </p>

          {/* Login Button */}
          <button className="btn fw-bold mb-3 w-50 py-2"
            style={{
              backgroundColor: "#6A0572", // Purple
              color: "white",
              borderRadius: "25px",
              border: "none",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#900C3F"} // Dark Red
            onMouseOut={(e) => e.target.style.backgroundColor = "#6A0572"} // Back to Purple
            onClick={() => navigate("/Login")}>
            Login
          </button>

          {/* Register Button */}
          <button className="btn fw-bold w-50 py-2"
            style={{
              backgroundColor: "#1F618D", // Blue
              color: "white",
              borderRadius: "25px",
              border: "none",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#117A65"} // Greenish
            onMouseOut={(e) => e.target.style.backgroundColor = "#1F618D"} // Back to Blue
            onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    );
  }
