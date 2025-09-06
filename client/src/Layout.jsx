// import { Outlet, Link } from "react-router-dom";

// function Layout() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Header */}
//       <header className="bg-dark text-white py-3">
//         <div className="container d-flex justify-content-between">
//           <h2>CERTIFICATE GENERATOR</h2>
//           <nav className="d-flex gap-3">
//             <Link to="/" className="text-white fw-bold text-decoration-none px-3 py-2 rounded" style={{ transition: "0.3s" }}>Home</Link>
//             <Link to="/register" className="text-white fw-bold text-decoration-none px-3 py-2 rounded" style={{ transition: "0.3s" }}>Signup</Link>
//             <Link to="/login" className="text-white fw-bold text-decoration-none px-3 py-2 rounded" style={{ transition: "0.3s" }}>Login</Link>
//           </nav>
//         </div>
//       </header>
      
//      {/* Main Content */}
// <main className="flex-grow-1 container-fluid py-4 d-flex justify-content-center align-items-center" style={{ background: 'white' }}>
//   <Outlet />
// </main>


      
//       {/* Footer */}
//       <footer className="bg-dark text-white text-center py-3 mt-auto">
//         <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Layout;


import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, clearUserSession } from "./utils/authUtils";
import { FaSignOutAlt, FaHome, FaAward } from "react-icons/fa";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check authentication status on component mount and route changes
    setAuthenticated(isAuthenticated());
  }, [location.pathname]);
  
  const handleLogout = () => {
    clearUserSession();
    setAuthenticated(false);
    navigate('/login');
  };
  
  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header style={{ 
        background: "linear-gradient(to right, #2c5282, #3a6ea5)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <h2 className="m-0" style={{ color: "#ffffff", fontWeight: "600" }}>
              CERTIFICATE GENERATOR
            </h2>
          </div>
          
          <nav className="d-flex gap-2">
            {authenticated ? (
              // Navigation for authenticated users
              <>
                <Link 
                  to="/home" 
                  className="text-decoration-none px-3 py-2 rounded d-flex align-items-center" 
                  style={{ 
                    color: isActive("/home") ? "#ffffff" : "#e0e7ff",
                    fontWeight: "500",
                    backgroundColor: isActive("/home") ? "rgba(255, 255, 255, 0.15)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    if (!isActive("/home")) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive("/home")) e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <FaHome className="me-1" /> Home
                </Link>
                
                <Link 
                  to="/certificates" 
                  className="text-decoration-none px-3 py-2 rounded d-flex align-items-center" 
                  style={{ 
                    color: isActive("/certificates") ? "#ffffff" : "#e0e7ff",
                    fontWeight: "500",
                    backgroundColor: isActive("/certificates") ? "rgba(255, 255, 255, 0.15)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    if (!isActive("/certificates")) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive("/certificates")) e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <FaAward className="me-1" /> Certificates
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="text-decoration-none px-3 py-2 rounded-pill border-0 d-flex align-items-center" 
                  style={{ 
                    color: "#3a6ea5",
                    backgroundColor: "#ffffff",
                    fontWeight: "600",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                  }}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </>
            ) : (
              // Navigation for non-authenticated users
              <>
                <Link 
                  to="/" 
                  className="text-decoration-none px-3 py-2 rounded" 
                  style={{ 
                    color: isActive("/") ? "#ffffff" : "#e0e7ff",
                    fontWeight: "500",
                    backgroundColor: isActive("/") ? "rgba(255, 255, 255, 0.15)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    if (!isActive("/")) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive("/")) e.target.style.backgroundColor = "transparent";
                  }}
                >
                  Home
                </Link>
                
                <Link 
                  to="/register" 
                  className="text-decoration-none px-3 py-2 rounded" 
                  style={{ 
                    color: isActive("/register") ? "#ffffff" : "#e0e7ff",
                    fontWeight: "500",
                    backgroundColor: isActive("/register") ? "rgba(255, 255, 255, 0.15)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    if (!isActive("/register")) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive("/register")) e.target.style.backgroundColor = "transparent";
                  }}
                >
                  Sign Up
                </Link>
                
                <Link 
                  to="/login" 
                  className="text-decoration-none px-3 py-2 rounded-pill" 
                  style={{ 
                    color: "#3a6ea5",
                    backgroundColor: "#ffffff",
                    fontWeight: "600",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                  }}
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main 
        className="flex-grow-1 py-4 d-flex justify-content-center align-items-center" 
        style={{ 
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "calc(100vh - 132px)" // Adjust based on header and footer height
        }}
      >
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer style={{ 
        background: "#2c5282",
        color: "#e0e7ff",
        padding: "20px 0",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                &copy; {new Date().getFullYear()} Certificate Generator. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a 
                href="#" 
                className="text-decoration-none me-3" 
                style={{ color: "#e0e7ff", fontSize: "0.9rem" }}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-decoration-none" 
                style={{ color: "#e0e7ff", fontSize: "0.9rem" }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;