

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const EmployeeModel=require('./models/Employee')
// const app = express();
// const mongoUri = "mongodb+srv://rohithindupalli_db_user:Indup%402414@cluster0.dz5p1be.mongodb.net/e-certificate?retryWrites=true&w=majority&appName=Cluster0";



// app.use(express.json({ limit: "50mb" })); 
// app.use(cors());





// mongoose.connect(mongoUri);

// // Configure the email transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "r1020ohith@gmail.com",
//         pass: "fdybfczhifuwyznt", // Use App Password for Gmail
//     },
// });

// // Function to send email with an attached certificate
// const sendCertificateEmail = (recipient, name, eventTitle, imageData, res) => {
//     const mailOptions = {
//         from: "r1020ohith@gmail.com",
//         to: recipient,
//         subject: `Certificate of Participation - ${eventTitle}`,
//         text: `Dear ${name},\n\nCongratulations! Please find your participation certificate for "${eventTitle}".\n\nBest Regards,\nEvent Team`,
//         attachments: [
//             {
//                 filename: `Certificate_${name}.png`,
//                 content: imageData.split(";base64,").pop(),
//                 encoding: "base64",
//             },
//         ],
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending email:", error);
//             res.status(500).json({ message: "Failed to send email" });
//         } else {
//             console.log("Email sent:", info.response);
//             res.json({ message: "Email sent successfully" });
//         }
//     });
// };

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     EmployeeModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json("Success");
//                 } else {
//                     res.json("The password is incorrect");
//                 }
//             } else {
//                 res.json("No record existed");
//             }
//         })
//         .catch(err => res.json(err));
// });


// app.post('/register',(req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees=>res.json(employees))
//     .catch(err=>res.json(err))
// })

// // API to send email with certificate
// app.post("/send-email", (req, res) => {
//     const { email, name, eventTitle, imageData } = req.body;

//     if (!email || !imageData) {
//         return res.status(400).json({ message: "Email or certificate data is missing" });
//     }

//     sendCertificateEmail(email, name, eventTitle, imageData, res);
// });




// // Start Server
// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json({ limit: "50mb" }));
// 🟢 Enable CORS here
app.use(cors({
  origin: "https://certificate-1-x3tb.onrender.com", // OR replace with "https://your-frontend-url.com"
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send email with a certificate
const sendCertificateEmail = (recipient, name, eventTitle, imageData, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: `Certificate of Participation - ${eventTitle}`,
    text: `Dear ${name},\n\nCongratulations! Please find your participation certificate for "${eventTitle}".\n\nBest Regards,\nEvent Team`,
    attachments: [
      {
        filename: `Certificate_${name}.png`,
        content: imageData.split(";base64,").pop(),
        encoding: "base64"
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    console.log("📧 Email sent:", info.response);
    res.json({ message: "Email sent successfully" });
  });
};

// Routes
app.post("/register", (req, res) => {
  console.log("📥 Incoming register request:", req.body);
  EmployeeModel.create(req.body)
    .then(employee => {
      console.log("✅ Saved to MongoDB:", employee);
      res.json(employee);
    })
    .catch(err => {
      console.error("❌ Error saving to MongoDB:", err);
      res.status(500).json({ error: err.message });
    });
});




app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (!user) return res.json("No record existed");
      if (user.password !== password) return res.json("The password is incorrect");
      res.json("Success");
    })
    .catch(err => {
      console.error("❌ Error finding user:", err);
      res.status(500).json({ error: err.message });
    });
});

app.post("/send-email", (req, res) => {
  const { email, name, eventTitle, imageData } = req.body;
  if (!email || !imageData) {
    return res.status(400).json({ message: "Email or certificate data is missing" });
  }
  sendCertificateEmail(email, name, eventTitle, imageData, res);
});

// Start server
app.listen(3001, () => console.log("🚀 Server running on port 3001"));
