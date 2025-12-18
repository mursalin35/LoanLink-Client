# LoanLink – Microloan Request & Approval Tracker System 
A modern, responsive frontend application for managing microloan requests, reviews, and approvals with role-based user experiences.

![LoanLink](/src/assets/LiveDemo.png)

---

## Project Overview

**LoanLink ** is a user-focused web application that allows borrowers to apply for microloans, managers to review applications, and admins to oversee platform activity through clean, role-based dashboards.

This frontend application:
- Provides intuitive UI flows for loan discovery, application, and tracking
- Communicates with a RESTful backend API for data operations
- Uses secure authentication and protected routing to ensure proper access control

**Target Users**
- **Borrower**: Browse loans, apply, and track application status
- **Manager**: Review, approve, or reject loan requests
- **Admin**: Monitor users and platform activities (UI-level access)

---

## Live Demo
🔗 **Live Site:** [Visit Live site](https://loanlink-side.web.app/)

## Website Information
🔗 **Server Site:** [Visit Server site](https://loanlink-server-bd.vercel.app/)
🔗 **Server Site Repository:** [Visit Server repo](https://github.com/mursalin35/LoanLink-Server.git)

---

## Features 

- Public pages (Home, All Loans, Loan Details)
- Authentication (Login, Register, Google Sign-in)
- Role-based dashboards (Borrower, Manager, Admin)
- Private and protected routing
- Light / Dark theme support
- Fully responsive UI
- Smooth animations and transitions
- Custom 404 error page
- Reload-safe client-side routing

---

## Tech Stack

- React
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Context API
- Framer Motion
- TanStack Query
- React Icons

---

## NPM Packages Used

- react
- react-router-dom
- firebase
- framer-motion
- axios
- lucide-react

---

## Folder Structure

src/
├── components/
├── pages/
├── routes/
├── context/
├── hooks/
├── assets/
├── layouts/
└── main.jsx

---

## Environment Variables

Create a `.env` file in the root directory and add:

VITE_API_BASE_URL=your_api_url  
VITE_FIREBASE_API_KEY=your_key  
VITE_FIREBASE_AUTH_DOMAIN=your_domain  
VITE_FIREBASE_PROJECT_ID=your_project_id  

---

## Authentication & Security 

- Firebase authentication for user login and registration
- JWT stored and handled securely via HTTP-only cookies
- Route protection based on authentication and user roles

---

## UI/UX Highlights

- Clean and consistent design system
- Brand-focused color palette
- Accessible and mobile-first layouts
- Smooth interactions and micro-animations

---

## Deployment Notes

- Frontend hosted on a static hosting platform (e.g., Firebase / Vercel)
- Authorized domains configured in Firebase
- Client-side routing configured to prevent reload errors

---

## Commit Guidelines

- Use clear and meaningful commit messages
- Follow feature-based or fix-based commit naming

---

## Author

## Author
- Name: Md. Saiyedul Mursalin
- Protfolio: https://saiyedul-mursalin.vercel.app  
- LinkedIn: https://www.linkedin.com/in/mursalin07  

---

## Copyright

© 2025 LoanLink. All rights reserved.
