# Store Rating Platform — Full-Stack Coding Challenge

A role-based store rating application built with **Express.js + PostgreSQL + Prisma + React**.

## Architecture

```text
store-rating-app/
├── backend/
│   ├── prisma/schema.prisma        # PostgreSQL schema
│   ├── prisma/seed.js              # demo data
│   └── src/
│       ├── config/                  # env + Prisma client
│       ├── controllers/             # HTTP request handlers
│       ├── middleware/              # auth + error handling
│       ├── routes/                  # REST endpoints
│       ├── services/                # business logic
│       ├── utils/                   # errors + Zod validation
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── api/                     # Axios client
│       ├── components/              # reusable UI
│       ├── context/                 # auth state
│       ├── pages/                   # role-specific screens
│       └── routes/                  # protected routes
└── docker-compose.yml               # local PostgreSQL
```

## Implemented requirements

- Single login system with role-based authorization: ADMIN, USER, STORE_OWNER.
- Normal-user registration.
- Admin dashboard: user/store/rating counts.
- Admin user and store creation.
- Admin user/store listing with filtering and sorting.
- Store owner rating aggregation and list of users who rated the store.
- Normal-user store search by name/address.
- 1–5 rating submission and update using a database unique constraint per user/store.
- Password change for authenticated users.
- HTTP-only JWT cookie authentication.
- Zod validation for name, email, address and password rules.
- Helmet, CORS, rate limiting and centralized error handling.
- Prisma migrations/seeding and Docker PostgreSQL.

## Run locally

### 1. Start PostgreSQL

```bash
docker compose up -d postgres
```

If you already have PostgreSQL installed, create a database named `store_rating` and update `backend/.env`.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Backend: http://localhost:5000
Health check: http://localhost:5000/api/health

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173

## Demo accounts

All seeded passwords satisfy the challenge password policy.

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | Admin@123 |
| Normal User | user@example.com | User@123 |
| Store Owner | owner@example.com | Owner@123 |

Change these credentials before using the project outside local development.

## API overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `PATCH /api/auth/password`

### Admin — ADMIN role
- `GET /api/admin/dashboard`
- `POST /api/admin/users`
- `POST /api/admin/stores`
- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `GET /api/admin/stores`

### Stores — USER role
- `GET /api/stores`
- `PUT /api/stores/:storeId/rating`

### Store Owner — STORE_OWNER role
- `GET /api/owner/dashboard`

## Important implementation notes

1. The database uses a normalized `users`, `stores`, and `ratings` model.
2. `@@unique([userId, storeId])` prevents duplicate ratings while allowing updates.
3. Passwords are stored only as bcrypt hashes.
4. JWT is kept in an HTTP-only cookie; the frontend does not store it in localStorage.
5. Server-side role checks protect every role-specific route.
6. Sorting/filtering is handled server-side so it remains usable for larger datasets.
7. For production, add pagination, HTTPS, CSRF protection appropriate to the deployment architecture, structured logging, tests, and stronger audit logging.
