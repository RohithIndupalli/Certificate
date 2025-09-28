# E-Certificate Generation System

## Aim

To generate **E-Certificates** from a provided CSV file and send them directly to participant emails.

## Description

The **E-Certificate Generation System** is a **MERN-based web application** that allows users to:

* Create an account and log in securely
* Upload a CSV file containing participant details (**Name, Email Address**)
* Provide a certificate **title** and upload a **certificate template**
* Preview all generated certificates before sending
* Send personalized **PDF certificates via email** to each participant automatically

The app also includes a **user dashboard** that maintains all generated certificate records, with filters for quick searching and tracking.

## Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Others**: Nodemailer (for emails), CSV Parser, PDF Generator

## Features

* User authentication (Register/Login)
* Upload CSV with participant details
* Upload certificate template & set title
* Generate certificate previews
* Send PDF certificates via email
* Dashboard to track & filter generated certificates

## Installation & Setup

**1. Clone the Repository**

```bash
git clone https://github.com/RohithIndupalli/e-certificate-generation.git
cd e-certificate-generation
```

**2. Install Dependencies**

* Install backend dependencies

```bash
cd backend
npm install
```

* Install frontend dependencies

```bash
cd frontend
npm install
```

**3. Setup Environment Variables**
Create a `.env` file in the `backend` folder with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**4. Run the Project**

* Start backend server

```bash
cd backend
npm start
```

* Start frontend

```bash
cd frontend
npm start
```

The app should now be running at:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)

## Author

**Rohith Indupalli**

* GitHub: [RohithIndupalli](https://github.com/RohithIndupalli)
  
