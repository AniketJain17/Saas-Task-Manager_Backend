# Saas-Task-Manager_Backend
A multi-tenant SaaS backend for managing tasks, teams, roles, deadlines, and activity logs with authentication, authorization, and scalable architecture.

A production-ready backend system for managing tasks in a multi-user environment with role-based access control and audit logging.

## 🚀 Features
- JWT Authentication & Authorization
- Role-based permissions (ADMIN, MANAGER, MEMBER)
- Task lifecycle management
- Ownership enforcement
- Activity logs (audit trail)
- Secure password hashing
- Pagination-ready APIs

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- Helmet & CORS

## 🔐 Authentication Flow

1. User signs up → password hashed at schema level
2. User logs in → receives JWT
3. Token sent via `Authorization: Bearer <token>`
4. Middleware verifies token and attaches user context
5. Role-based guards enforce permissions

## 👥 Roles & Permissions
| Role | Capabilities |
|----|-------------|
| ADMIN | Full access, delete tasks, view logs |
| MANAGER | Create & assign tasks |
| MEMBER | Update assigned tasks only |

## 📦 API Modules
- `/auth` – Signup & Login
- `/tasks` – Task management
- `/activities` – Audit logs (ADMIN only)
- `/health` – Health check

## ▶️ Run Locally
```bash
npm install
npm start
```
---

## 🔐 Environment Variables
```bash
PORT=5000
MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=1d
```

## 1️⃣ Final Folder Structure
```bash
saas-task-manager-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth & error handling
│   ├── utils/           # Shared utilities
│   ├── app.js           # Express app setup
│   └── server.js        # Application entry point
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── README.md
```


## ✅ Final Functionality Checklist

### 🔐 Authentication
- ✅ Password hashing at schema level
- ✅ Secure signup (no password leakage)
- ✅ Login with JWT
- ✅ Token verification middleware
- ✅ Role-based authorization

### 📋 Task Management
- ✅ ADMIN / MANAGER can create tasks
- ✅ MEMBER cannot create tasks
- ✅ Members can update only their assigned tasks
- ✅ ADMIN-only task deletion
- ✅ Pagination implemented

### 🧾 Activity Logs
- ✅ Task create / update / delete logged
- ✅ Logs store actor and timestamp
- ✅ Logs visible to ADMIN only

### 🛡 Security
- ✅ Environment variables ignored
- ✅ Helmet & CORS enabled
- ✅ Consistent error responses

