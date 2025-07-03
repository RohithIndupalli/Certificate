// import React from "react";
// import { useLocation } from "react-router-dom";
// import html2canvas from "html2canvas";

// function Certificates() {
//   const location = useLocation();
//   const { participants, template, eventTitle } = location.state || { participants: [], template: null, eventTitle: "" };

//   const downloadCertificate = (index) => {
//     const certificateElement = document.getElementById(`certificate-${index}`);
//     html2canvas(certificateElement).then((canvas) => {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = `certificate_${index + 1}.png`;
//       link.click();
//     });
//   };

//   const sendEmail = (index) => {
//     const participant = participants[index];
//     const name = participant[0] || "Unknown";
//     const email = participant[1] || ""; // Assuming the second column contains emails

//     if (!email) {
//       alert(`No email found for ${name}`);
//       return;
//     }

//     const subject = `Certificate of Participation - ${eventTitle}`;
//     const body = `Dear ${name},%0D%0A%0D%0ACongratulations! Please find your participation certificate for "${eventTitle}".%0D%0A%0D%0APlease download your certificate and attach it manually before sending.%0D%0A%0D%0ABest Regards,%0D%0AEvent Team`;

//     window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center text-primary fw-bold">Generated Certificates</h1>
//       <div className="row">
//         {participants.map((participant, index) => (
//           <div key={index} className="col-md-6 d-flex flex-column align-items-center">
//             <div
//               id={`certificate-${index}`}
//               className="certificate-container text-center"
//               style={{
//                 position: "relative",
//                 width: "600px",
//                 height: "400px",
//                 border: "1px solid black",
//                 margin: "20px 0",
//                 backgroundColor: "#fff",
//               }}
//             >
//               <img
//                 src={template}
//                 alt="Certificate Template"
//                 style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0" }}
//               />
//               <h2
//                 style={{
//                   position: "absolute",
//                   top: "32%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontSize: "24px",
//                   color: "gold",
//                   fontFamily: "Times New Roman",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {eventTitle}
//               </h2>
//               <h3
//                 style={{
//                   position: "absolute",
//                   top: "52%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   fontSize: "30px",
//                   color: "gold",
//                   fontFamily: "Times New Roman",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {participant[0] ? participant[0] : "Unknown"}
//               </h3>
//               <h4
//                 style={{
//                   position: "absolute",
//                   top: "70%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontSize: "18px",
//                   color: "black",
//                   fontFamily: "Times New Roman",
//                 }}
//               >
//                 This is to certify your excellence in showing at the VIGNAN MAHOTSAV.
//               </h4>
//             </div>

//             <button
//               onClick={() => downloadCertificate(index)}
//               className="btn btn-success mt-3"
//               style={{
//                 width: "150px",
//                 fontSize: "14px",
//               }}
//             >
//               Download
//             </button>

//             <button
//               onClick={() => sendEmail(index)}
//               className="btn btn-info mt-2"
//               style={{
//                 width: "150px",
//                 fontSize: "14px",
//               }}
//             >
//               Send Email
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Certificates;


// import React from "react";
// import { useLocation } from "react-router-dom";
// import html2canvas from "html2canvas";
// import axios from "axios";

// function Certificates() {
//   const location = useLocation();
//   const { participants, template, eventTitle } = location.state || { participants: [], template: null, eventTitle: "" };

//   const downloadCertificate = (index) => {
//     const certificateElement = document.getElementById(`certificate-${index}`);
//     html2canvas(certificateElement).then((canvas) => {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = `certificate_${index + 1}.png`;
//       link.click();
//     });
//   };

//   const sendEmail = async (index) => {
//     const participant = participants[index];
//     const name = participant[0] || "Unknown";
//     const email = participant[1] || "";

//     if (!email) {
//       alert(`No email found for ${name}`);
//       return;
//     }

//     // Capture certificate as an image
//     const certificateElement = document.getElementById(`certificate-${index}`);
//     html2canvas(certificateElement).then(async (canvas) => {
//       const imageData = canvas.toDataURL("image/png"); // Convert to Base64

//       try {
//         await axios.post("http://localhost:3001/send-email", {
//           email,
//           name,
//           eventTitle,
//           imageData,
//         });

//         alert(`Certificate sent to ${email}`);
//       } catch (error) {
//         console.error("Error sending email:", error);
//         alert("Failed to send email.");
//       }
//     });
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center text-primary fw-bold">Generated Certificates</h1>
//       <div className="text-center mb-4">
//         <button onClick={() => participants.forEach((_, i) => sendEmail(i))} className="btn btn-warning">
//           Send All Emails
//         </button>
//       </div>
//       <div className="row">
//         {participants.map((participant, index) => (
//           <div key={index} className="col-md-6 d-flex flex-column align-items-center">
//             <div
//               id={`certificate-${index}`}
//               className="certificate-container text-center"
//               style={{
//                 position: "relative",
//                 width: "600px",
//                 height: "400px",
//                 border: "1px solid black",
//                 margin: "20px 0",
//                 backgroundColor: "#fff",
//               }}
//             >
//               <img
//                 src={template}
//                 alt="Certificate Template"
//                 style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0" }}
//               />
//               <h2
//                 style={{
//                   position: "absolute",
//                   top: "32%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontSize: "24px",
//                   color: "gold",
//                   fontFamily: "Times New Roman",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {eventTitle}
//               </h2>
//               <h3
//                 style={{
//                   position: "absolute",
//                   top: "52%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   fontSize: "30px",
//                   color: "gold",
//                   fontFamily: "Times New Roman",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {participant[0] ? participant[0] : "Unknown"}
//               </h3>
//               <h4
//                 style={{
//                   position: "absolute",
//                   top: "70%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontSize: "18px",
//                   color: "black",
//                   fontFamily: "Times New Roman",
//                 }}
//               >
//                 This is to certify your excellence in showing at the VIGNAN MAHOTSAV held on 6,7,8 Feb 2025.
//               </h4>
//             </div>

//             <button onClick={() => downloadCertificate(index)} className="btn btn-success mt-3">
//               Download
//             </button>

//             <button onClick={() => sendEmail(index)} className="btn btn-info mt-2">
//               Send Email
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Certificates;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";

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
      await axios.post("http://localhost:3001/send-email", {
        email,
        name,
        eventTitle,
        imageData,
      });

      setEmailCount((prevCount) => prevCount + 1);

      if (!isBulk) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const sendAllEmails = async () => {
    setEmailCount(0); // Reset count before sending
    setLoading(true); // Show loading animation

    for (let i = 0; i < participants.length; i++) {
      await sendEmail(i, true); // Wait for each email to be sent
    }

    setLoading(false); // Hide loading animation
    setShowPopup(true); // Show success popup
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <div className={`container mt-5 ${showPopup ? "dim-background" : ""}`}>
      <h1 className="text-center text-primary fw-bold">Generated Certificates</h1>
      
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
                style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0" }}
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

            <button onClick={() => downloadCertificate(index)} className="btn btn-success mt-3">
              Download
            </button>

            <button onClick={() => sendEmail(index)} className="btn btn-info mt-2" disabled={loading}>
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
