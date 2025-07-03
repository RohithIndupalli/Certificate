

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const EmployeeModel=require('./models/Employee')
const app = express();
const mongoUri = "mongodb+srv://anuragbabaojha:Anurag%409262@cluster0.61tqh.mongodb.net/employee";



app.use(express.json({ limit: "50mb" })); 
app.use(cors());





mongoose.connect(mongoUri);

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "r1020ohith@gmail.com",
        pass: "fdybfczhifuwyznt", // Use App Password for Gmail
    },
});

// Function to send email with an attached certificate
const sendCertificateEmail = (recipient, name, eventTitle, imageData, res) => {
    const mailOptions = {
        from: "r1020ohith@gmail.com",
        to: recipient,
        subject: `Certificate of Participation - ${eventTitle}`,
        text: `Dear ${name},\n\nCongratulations! Please find your participation certificate for "${eventTitle}".\n\nBest Regards,\nEvent Team`,
        attachments: [
            {
                filename: `Certificate_${name}.png`,
                content: imageData.split(";base64,").pop(),
                encoding: "base64",
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Failed to send email" });
        } else {
            console.log("Email sent:", info.response);
            res.json({ message: "Email sent successfully" });
        }
    });
};

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json(err));
});


app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
})

// API to send email with certificate
app.post("/send-email", (req, res) => {
    const { email, name, eventTitle, imageData } = req.body;

    if (!email || !imageData) {
        return res.status(400).json({ message: "Email or certificate data is missing" });
    }

    sendCertificateEmail(email, name, eventTitle, imageData, res);
});

// Start Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
