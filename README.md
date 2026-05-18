# CRM Lead Management System

A Customer Relationship Management (CRM) system designed to collect, manage, and track potential customers (leads) through different stages until conversion.

---

## Project Overview

This application allows interested customers to submit their information through a public form. Administrators can log in to manage leads, track interactions, schedule follow-ups, and update lead statuses based on customer engagement.

The goal is to simplify lead handling and maintain a structured customer acquisition process.

---

## System Workflow

### Lead Submission
- The root route (`/`) contains a public form for interested customers.
- Users fill in their information and submit it.
- A new lead is created automatically.
- Every new lead starts with the status:

```text
New
```

### Admin Authentication
- Administrators are **not registered through the application UI**.
- Admin accounts are created manually in the database.
- Administrators only log in using existing credentials.

### Lead Management

After logging in, the administrator can:

- View submitted leads
- Contact leads
- Add conversation notes
- Schedule follow-up dates
- Update lead statuses

### Lead Status Flow

```text
New
   ↓
Contacted
   ↓
 ┌────────────┬─────────────────┬──────────────┐
 ↓            ↓                 ↓
Customer   Follow-Up       Withdrawn
```

Possible outcomes after follow-up:

- **Customer** → Lead successfully converted
- **Follow-Up** → Another follow-up date is scheduled
- **Withdrawn** → Lead is no longer interested

---

## Features

- Public lead submission form
- Admin authentication
- View and manage leads
- Lead status updates
- Add notes for customer conversations
- Schedule follow-up dates
- Convert leads to customers
- Withdraw inactive or uninterested leads

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- HTTP-only Cookies

---

## Installation and Setup

### Clone the repository

```bash
git clone <repository-url>
```

### Install backend dependencies

```bash
npm install
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Create environment variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### Run backend

```bash
npm run dev
```

### Run frontend

```bash
npm run dev
```

---

## Notes

- The public form is available on the root route (`/`).
- Admin registration is not implemented through the UI.
- Admin credentials must already exist in the database before login.

---

## Future Improvements

- Email reminders for scheduled follow-ups
- Dashboard analytics and charts
- Activity log
- Notifications system
