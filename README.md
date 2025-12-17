# LoanLink – Microloan Request & Approval Tracker System

LoanLink is a full-stack web application designed to simplify microloan requests, approvals, and management for borrowers, loan officers (managers), and administrators.  
The platform ensures a secure, transparent, and role-based workflow for handling loan applications efficiently.

---

## 🚀 Live Demo
🔗 Live Site: https://your-live-site-url.com

---

## 🧩 Project Purpose
Many microfinance institutions and NGOs struggle to manage loan applications, approvals, EMI plans, and repayments efficiently.  
LoanLink solves this problem by providing a centralized, role-based system where:

- Borrowers can apply for and track loans
- Managers can review, approve, or reject applications
- Admins can manage users, loans, and platform-level controls

---

## ✨ Key Features

### 🌐 Public Features
- Modern landing page with smooth animations
- View available loan categories
- Loan details page with EMI plans
- Fully responsive design (Mobile, Tablet, Desktop)
- Dark / Light theme toggle
- Custom 404 error page

---

### 🔐 Authentication & Security
- Email & Password authentication (Firebase)
- Google / GitHub social login
- JWT token stored securely in cookies
- Protected private routes (User / Manager / Admin)
- Environment variables for Firebase & MongoDB credentials

---

### 👤 Borrower (User) Dashboard
- Apply for loans
- View applied loans & application status
- Cancel pending loan applications
- Pay fixed loan application fee via Stripe
- View payment details after successful payment
- Manage personal profile

---

### 🧑‍💼 Manager (Loan Officer) Dashboard
- Add new loan products
- Manage own created loans
- View pending loan applications
- Approve or reject loan applications
- View approved loans
- Profile management

---

### 👑 Admin Dashboard
- Manage users & roles (Borrower / Manager / Admin)
- Suspend users with reason & feedback
- Manage all loans
- Control which loans appear on the home page
- View all loan applications
- Filter loan applications by status
- Pagination support for large datasets

---

## 🛠️ Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Hook Form
- Axios
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Gateway
- CORS
- Dotenv

---

## 📦 NPM Packages Used (Client)
- react-router-dom
- framer-motion
- react-hook-form
- react-hot-toast
- axios
- lucide-react
- react-icons

---

## 📦 NPM Packages Used (Server)
- express
- mongodb
- cors
- dotenv
- jsonwebtoken
- stripe
- cookie-parser

---

## 🔐 Environment Variables

### Client (.env)
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_API_URL=your_server_api_url
