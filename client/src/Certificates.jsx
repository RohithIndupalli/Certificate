import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";
import { FaHome } from "react-icons/fa";

function Certificates() {
  const location = useLocation();
  const { participants, template, eventTitle } = location.state || {
    participants: [],
    template: null,
    eventTitle: "",
  };

  const [emailCount, setEmailCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadCertificate = (index) => {
    const certificateElement = document.getElementById(`certificate-${index}`);
    html2canvas(certificateElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `certificate_${index + 1}.png`;
      link.click();
    });
  };

  const sendEmail = async (index, isBulk = false) => {
    const participant = participants[index];
    const name = participant[0] || "Unknown";
    const email = participant[1] || "";

    if (!email) {
      alert(`No email found for ${name}`);
      return;
    }

    const certificateElement = document.getElementById(`certificate-${index}`);
    const canvas = await html2canvas(certificateElement);
    const imageData = canvas.toDataURL("image/png");

    try {
      await axios.post("https://certificate-0a2g.onrender.com/send-email", {
        email,
        name,
        eventTitle,
        imageData,
      });

      setEmailCount((prevCount) => prevCount + 1);

      if (!isBulk) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const sendAllEmails = async () => {
    setEmailCount(0);
    setLoading(true);

    for (let i = 0; i < participants.length; i++) {
      await sendEmail(i, true);
    }

    setLoading(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <div className={`container mt-5 ${showPopup ? "dim-background" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold mb-0">Generated Certificates</h1>
        <Link to="/home" className="btn btn-outline-primary d-flex align-items-center">
          <FaHome className="me-2" /> Back to Home
        </Link>
      </div>

      <div className="text-center mb-4">
        <button onClick={sendAllEmails} className="btn btn-warning" disabled={loading}>
          {loading ? "Sending..." : "Send All Emails"}
        </button>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Sending Emails, Please Wait...</p>
        </div>
      )}

      <div className="row">
        {participants.map((participant, index) => (
          <div key={index} className="col-md-6 d-flex flex-column align-items-center">
            <div
              id={`certificate-${index}`}
              className="certificate-container text-center"
              style={{
                position: "relative",
                width: "600px",
                height: "400px",
                border: "1px solid black",
                margin: "20px 0",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={template}
                alt="Certificate Template"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              />
              <h2
                style={{
                  position: "absolute",
                  top: "32%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "24px",
                  color: "black",
                  fontFamily: "Times New Roman",
                  fontWeight: "bold",
                }}
              >
                {eventTitle}
              </h2>
              <h3
                style={{
                  position: "absolute",
                  top: "52%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "30px",
                  color: "black",
                  fontFamily: "Times New Roman",
                  fontWeight: "bold",
                }}
              >
                {participant[0] ? participant[0] : "Unknown"}
              </h3>
              <h4
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "18px",
                  color: "black",
                  fontFamily: "calibre",
                }}
              >
                This is to certify your excellence in showing at the VIGNAN MAHOTSAV held on 6,7,8 Feb 2025.
              </h4>
            </div>

            <button
              onClick={() => downloadCertificate(index)}
              className="btn btn-success mt-3"
              disabled={loading}
            >
              Download
            </button>

            <button
              onClick={() => sendEmail(index)}
              className="btn btn-info mt-2"
              disabled={loading}
            >
              Send Email
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>Email Sent Successfully</h2>
            <p>Total Emails Sent: {emailCount}</p>
          </div>
        </div>
      )}

      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .popup-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease-in-out;
          }

          .dim-background {
            filter: blur(0.5px);
          }

          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(0, 0, 0, 0.1);
            border-top-color: #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default Certificates;
