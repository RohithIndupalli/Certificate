// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const result = await axios.post("http://localhost:3001/register", {
//         name,
//         email,
//         password,
//       });
//       console.log(result);
//       navigate("/login"); // Redirect to login page after successful signup
//     } catch (err) {
//       console.error(err);
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center min-vh-100"
//       style={{
//         background: "white", // Keep background clean
//         animation: "fadein 1s ease-in",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <div
//         className="bg-white p-5 rounded shadow-lg"
//         style={{
//           width: "400px",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h2 className="text-center mb-4 text-dark">Register</h2>

//         {error && <div className="alert alert-danger text-center">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label fw-bold">
//               <FaUser className="me-2 text-primary" /> Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="form-control border-0 shadow-sm"
//               placeholder="Enter Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={{ borderRadius: "8px", padding: "10px" }}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label fw-bold">
//               <FaEnvelope className="me-2 text-primary" /> Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="form-control border-0 shadow-sm"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{ borderRadius: "8px", padding: "10px" }}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label fw-bold">
//               <FaLock className="me-2 text-primary" /> Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="form-control border-0 shadow-sm"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ borderRadius: "8px", padding: "10px" }}
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100 rounded-pill shadow-sm"
//             style={{ transition: "0.3s ease-in-out" }}
//             onMouseOver={(e) => (e.target.style.opacity = 0.9)}
//             onMouseOut={(e) => (e.target.style.opacity = 1)}
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-3 text-center">
//           <p className="text-muted">Already have an account?</p>
//           <Link
//             to="/login"
//             className="btn btn-outline-dark w-100 rounded-pill"
//             style={{ transition: "0.3s ease-in-out" }}
//             onMouseOver={(e) => (e.target.style.opacity = 0.8)}
//             onMouseOut={(e) => (e.target.style.opacity = 1)}
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await axios.post("https://certificate-0a2g.onrender.com/register", {
        name,
        email,
        password,
      });
      console.log(result);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="p-4 p-md-5"
        style={{
          width: "430px",
          borderRadius: "16px",
          backgroundColor: "white",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 
          className="text-center mb-4 fw-bold"
          style={{ color: "#3a6ea5" }}
        >
          Create Account
        </h2>
        
        <p className="text-center text-muted mb-4">
          Please fill in your details to register
        </p>

        {error && (
          <div 
            className="mb-4 p-3 text-center" 
            style={{
              backgroundColor: "#ffe5e5",
              color: "#d63031",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="form-label text-muted mb-2"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Full Name
            </label>
            <div className="input-group">
              <span 
                className="input-group-text" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #eaeaea",
                  borderRight: "none" 
                }}
              >
                <FaUser style={{ color: "#3a6ea5" }} />
              </span>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ 
                  border: "1px solid #eaeaea",
                  borderLeft: "none",
                  padding: "12px",
                }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="form-label text-muted mb-2"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Email Address
            </label>
            <div className="input-group">
              <span 
                className="input-group-text" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #eaeaea",
                  borderRight: "none" 
                }}
              >
                <FaEnvelope style={{ color: "#3a6ea5" }} />
              </span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  border: "1px solid #eaeaea",
                  borderLeft: "none",
                  padding: "12px",
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="form-label text-muted mb-2"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Password
            </label>
            <div className="input-group">
              <span 
                className="input-group-text" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #eaeaea",
                  borderRight: "none" 
                }}
              >
                <FaLock style={{ color: "#3a6ea5" }} />
              </span>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  border: "1px solid #eaeaea",
                  borderLeft: "none",
                  padding: "12px",
                }}
              />
            </div>
            <small className="text-muted mt-2" style={{ fontSize: "0.8rem", display: "block" }}>
              Password must be at least 8 characters long
            </small>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#3a6ea5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              width: "100%",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(58, 110, 165, 0.2)",
              transition: "all 0.3s ease"
            }}
            className="mb-4"
            onMouseOver={(e) => e.target.style.backgroundColor = "#2c5282"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3a6ea5"}
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: "#3a6ea5", 
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;