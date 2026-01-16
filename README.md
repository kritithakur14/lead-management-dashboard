# Lead Management Dashboard (Mini CRM)

This project is a full-stack Lead Management Dashboard built as part of an Internshala take-home assignment.
The application allows basic authentication, viewing and managing leads with search, filters, pagination, analytics, and a lead details view.

# Features

- Basic admin login (as allowed in the assignment)
- Leads dashboard with:

  - Search by name or email
  - Filter by lead status
  - Pagination

- Analytics Overview

  - Total leads
  - Converted leads
  - Leads grouped by status

- Individual lead details view
- Mobile-responsive UI
- REST APIs with MongoDB integration

# Tech Stack

**Frontend**

- React(Vite)
- Tailwind CSS
- React Router

**Backend**

- Node.js
- Express.js
- MongoDB (Atlas-free tier)

----

# Local Setup 

1. Clone the Repository

```bash
   git clone https://github.com/kritithakur14/lead-management-dashboard.git
   cd lead-management-dashboard
```

2. Backend Setup

```bash
   cd backend
   npm install
```

Create a `.env` file in the backend folder:

   PORT=8000
   MONGO_URI=your_mongodb_connection_string


Start the backend server:

````bash
  npm run dev
  ````

3. Frontend Setup

```bash
  cd ../frontend
  npm install
  npm run dev
  ```
  Frontend will run on:
  http://localhost:5173
````
----

# Database Seeding

To populate the database with dummy lead data:

```bash
  cd backend
  node seed.js
```

This will insert multiple dummy leads with different statuses and sources for testing pagination, filters, and analytics.

# Deployed URLs

- **Frontend**

- **Backend**

# Demo Credentials

Username: admin@yahoo.com
Password: admin123
