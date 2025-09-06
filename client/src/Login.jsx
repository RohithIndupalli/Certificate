// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const result = await axios.post("http://localhost:3001/login", {
//         email,
//         password,
//       });
//       console.log(result);
//       navigate("/Home");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center min-vh-100"
//       style={{
//         // background: "linear-gradient(to right, #0072ff, #00c6ff)", // Gradient background
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <div
//         className="bg-white p-5 rounded shadow-lg"
//         style={{
//           width: "400px",
//           borderRadius: "12px",
//         }}
//       >
//         <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>

//         {error && <div className="alert alert-danger text-center">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div className="mb-3 input-group">
//             <span className="input-group-text bg-primary text-white">
//               <FaUser />
//             </span>
//             <input
//               type="email"
//               id="email"
//               className="form-control border-0 shadow-sm"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password Input with Toggle */}
//           <div className="mb-3 input-group">
//             <span className="input-group-text bg-primary text-white">
//               <FaLock />
//             </span>
//             <input
//               type={showPassword ? "text" : "password"} // Toggle input type
//               id="password"
//               className="form-control border-0 shadow-sm"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="input-group-text bg-light text-dark cursor-pointer"
//               style={{ cursor: "pointer" }}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle Icons */}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100 rounded-pill shadow-sm"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-3 text-center">
//           <p className="text-muted">Don't have an account?</p>
//           <Link to="/register" className="btn btn-outline-primary w-100 rounded-pill">
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("https://certificate-0a2g.onrender.com/login", {
        email,
        password,
      });
      
      // Check if the response indicates success
      if (response.data && response.data.success) {
        console.log("Login successful:", response.data);
        
        // Store user details in localStorage for use across the app
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Redirect to Home page
        navigate("/Home");
      } else {
        // Handle case where server returns a 200 status but with error message
        console.error("Login failed:", response.data);
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      // Handle HTTP errors (401, 500, etc.)
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.error || "Invalid email or password. Please try again.";
      setError(errorMessage);
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
          Welcome Back
        </h2>
        
        <p className="text-center text-muted mb-4">
          Please enter your credentials to login
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
                <FaUser style={{ color: "#3a6ea5" }} />
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

          {/* Password Input with Toggle */}
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
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  border: "1px solid #eaeaea",
                  borderLeft: "none",
                  borderRight: "none",
                  padding: "12px",
                }}
              />
              <span
                className="input-group-text"
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #eaeaea",
                  borderLeft: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash style={{ color: "#6c757d" }} /> : <FaEye style={{ color: "#6c757d" }} />}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-4">
            <Link 
              to="/forgot-password" 
              style={{ 
                color: "#3a6ea5", 
                textDecoration: "none", 
                fontSize: "0.9rem",
                fontWeight: 500
              }}
            >
              Forgot password?
            </Link>
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
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <Link 
              to="/register" 
              style={{ 
                color: "#3a6ea5", 
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;