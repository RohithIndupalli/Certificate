
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileCsv, FaImage, FaFileSignature, FaArrowRight } from "react-icons/fa";

function Home() {
  const [participants, setParticipants] = useState([]);
  const [template, setTemplate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        const rows = fileContent.split("\n").filter(row => row.trim() !== "");
        const data = rows.slice(1).map((row) => row.split(",").map(item => item.trim()));
        setParticipants(data);
      };
      reader.readAsText(file);
    }
  };

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTemplate(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCertificates = () => {
    navigate("/certificates", { state: { participants, template, eventTitle } });
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        background: "#f8f9fa", // Light gray background
        width: "100%",
        height: "100vh",
        padding: "20px"
      }}
    >
      {/* Title Section */}
      <h2 className="fw-bold text-center mb-4" style={{ color: "#333" }}>
        <FaFileSignature className="me-2" /> Online Certificate Generator
      </h2>

      {/* Input Fields Container */}
      <div className="p-4 shadow rounded" style={{ width: "90%", maxWidth: "500px", backgroundColor: "#fff" }}>
        {/* CSV Upload */}
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: "#333" }}>
            <FaFileCsv className="me-2 text-success" /> Upload CSV File
          </label>
          <input 
            type="file" 
            className="form-control shadow-sm" 
            accept=".csv" 
            onChange={handleCSVUpload} 
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* Template Upload */}
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: "#333" }}>
            <FaImage className="me-2 text-danger" /> Upload Certificate Template (JPG/PNG)
          </label>
          <input 
            type="file" 
            className="form-control shadow-sm" 
            accept="image/*" 
            onChange={handleTemplateUpload} 
            style={{ borderRadius: "10px" }}
          />
          {template && (
            <div className="mt-3 text-center">
              <img 
                src={template} 
                alt="Template Preview" 
                className="img-fluid rounded shadow" 
                style={{ maxWidth: "100%", height: "180px", objectFit: "contain", borderRadius: "10px" }} 
              />
            </div>
          )}
        </div>

        {/* Event Title Input */}
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: "#333" }}>
            <FaFileSignature className="me-2 text-primary" /> Enter Event Title
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* Generate Certificates Button */}
        <button 
          className="btn btn-primary w-100 fw-bold d-flex align-items-center justify-content-center shadow-sm"
          style={{ borderRadius: "10px", fontSize: "18px" }}
          onClick={generateCertificates}
        >
          Generate Certificates <FaArrowRight className="ms-2" />
        </button>
      </div>
    </div>
  );
}

export default Home;
