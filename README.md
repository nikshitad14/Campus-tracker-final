# 🚌 Campus Bus Tracker
**Vardhaman College of Engineering — CSE Summer Project 2024-25**
Project Code: E-09 | Team Size: 3-4 Students

---

## 📁 Project Structure
```
campus-bus-tracker/
├── database/
│   └── schema.sql          ← Run this first in MySQL
├── backend/
│   ├── server.js           ← Express entry point
│   ├── .env.example        ← Copy to .env and fill details
│   ├── routes/api.js       ← All API endpoints
│   ├── controllers/
│   │   ├── routeController.js         ← Routes & Stops
│   │   ├── delayController.js         ← Delays + AI ETA
│   │   └── subscriptionController.js  ← Subscriptions + Email
│   └── models/db.js        ← MySQL connection pool
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.js           ← Landing page
        │   ├── RoutesPage.js     ← All routes listing
        │   ├── RouteDetail.js    ← Single route + ETA
        │   ├── MapPage.js        ← Leaflet interactive map
        │   ├── Subscribe.js      ← Subscribe form
        │   └── AdminDashboard.js ← Report delays + analytics
        ├── components/Navbar.js
        └── utils/api.js         ← Axios API calls
```

---

## 🚀 Setup Instructions

### Step 1: Database
1. Open MySQL Workbench or terminal
2. Run: `mysql -u root -p < database/schema.sql`
3. This creates the DB, all 6 tables, and sample data

### Step 2: Backend
```bash
cd backend
cp .env.example .env
# Edit .env: add your MySQL password and Gmail credentials
npm install
npm run dev       # Runs on http://localhost:5000
```

### Step 3: Frontend
```bash
cd frontend
npm install
npm start         # Runs on http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/routes | All active routes |
| GET | /api/routes/:id | Single route with stops |
| GET | /api/routes/:id/schedules | Schedules for a route |
| POST | /api/delays | Report a delay |
| GET | /api/delays/:id/eta | 🤖 AI ETA prediction |
| POST | /api/subscriptions | Subscribe to route |
| POST | /api/subscriptions/notify | Send delay email to subscribers |
| GET | /api/analytics/ridership | Subscriber counts per route |

---

## 🤖 AI ETA Predictor Logic
Rule-based predictor using 3 factors:
1. **Avg historical delay** from last 14 days
2. **Day-of-week weight** (Mon/Fri = busier = more delay)
3. **Rush hour factor** (7–9 AM = 1.25x multiplier)

Formula: `predictedDelay = avgDelay × dowWeight × rushFactor`

---

## 👥 Suggested Team Roles
| Role | Responsibility |
|------|---------------|
| Frontend Developer | React UI, Leaflet map, forms |
| Backend Developer | Express API, auth, routes |
| Database Designer | MySQL schema, queries |
| AI/ML Engineer | ETA predictor, analytics |

## 📦 Deliverables
1. Project Proposal (1 page)
2. ER Diagram + DB Schema
3. Mid-Review Live Demo
4. Final Demo + GitHub Link
