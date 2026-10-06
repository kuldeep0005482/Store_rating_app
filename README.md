# StoreRate — Full-Stack Store Rating Platform

StoreRate is a complete role-based store-rating web application built with **React, Vite, Express.js, PostgreSQL, Prisma and JWT authentication**.

The project is designed for the provided Full-Stack Intern Coding Challenge and includes the complete UI flow for administrators, normal users and store owners.

---

## Demo accounts

| Role | Email | Password |
|---|---|---|
| ADMIN | `admin@example.com` | `Admin@123` |
| USER | `user@example.com` | `User@123` |
| STORE_OWNER | `owner@example.com` | `Owner@123` |
| STORE_OWNER | `owner2@example.com` | `Owner2@123` |
| USER | `user2@example.com` | `User2@123` |
| USER | `user3@example.com` | `User3@123` |

---

## Run the entire project with ONE command

### Requirement

Only **Docker Desktop / Docker Engine with Docker Compose** is required on the reviewer's machine. No Node.js, npm, PostgreSQL, Prisma or other project dependency needs to be installed manually.

From the project root, run:

```bash
docker compose up --build
```

Then open:

**http://localhost**

The first startup automatically:

1. Builds the React frontend.
2. Installs frontend dependencies inside Docker.
3. Builds the Express backend.
4. Installs backend dependencies inside Docker.
5. Starts PostgreSQL 16.
6. Waits for PostgreSQL to become healthy.
7. Runs Prisma migrations automatically.
8. Runs the demo seed automatically.
9. Starts the Express API.
10. Starts Nginx and serves the React application.
11. Proxies `/api/*` from the browser to the backend.

No manual database setup is required.

### Stop the project

```bash
docker compose down
```

### Reset the demo database

To remove the database volume and start with a clean database:

```bash
docker compose down -v
```

Then run the one startup command again:

```bash
docker compose up --build
```

---

# Architecture

```text
Browser
  |
  | http://localhost
  v
Nginx / React Frontend
  |
  | /api/*
  v
Express API
  |
  | Prisma
  v
PostgreSQL
```

Project structure:

```text
Store_rating_app-main/
├── backend/
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── validators/
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── utils/
│
├── docker-compose.yml
└── README.md
```

---

# Technology Stack

## Frontend

- React 19
- React Router
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Fetch API

## Backend

- Node.js 22
- Express 5
- Prisma ORM
- PostgreSQL 16
- JWT
- bcryptjs
- Zod
- Helmet
- CORS
- Morgan

## Infrastructure

- Docker
- Docker Compose
- Nginx

---

# Roles and authorization

There are three roles:

```text
ADMIN
USER
STORE_OWNER
```

Authentication is handled with JWT stored in an **HTTP-only cookie**.

Authorization is enforced twice:

1. React protected routes control what the user can navigate to.
2. Express middleware enforces the role on the server.

Therefore manually typing another role's URL does not bypass authorization.

---

# ADMIN permissions

Admin users can access:

```text
/admin/dashboard
/admin/users
/admin/users/new
/admin/users/:id
/admin/users/:id/edit
/admin/stores
/admin/stores/new
/admin/stores/:id
/admin/stores/:id/edit
/admin/ratings
/settings
```

Admin functionality includes:

- Dashboard statistics
- Rating overview
- Rating distribution
- Recent ratings
- Top rated stores
- User search
- User filtering
- User sorting
- User pagination
- Add user
- View user details
- Edit user
- Delete user
- Store search
- Store filtering
- Store sorting
- Store pagination
- Add store
- Assign store owner
- View store details
- Edit store
- Delete store
- View all ratings

---

# NORMAL USER permissions

Normal users can access:

```text
/stores
/stores/:storeId
/settings
```

Normal-user functionality includes:

- Search stores
- Browse stores
- Open store details
- View store images
- View store average rating
- View rating distribution
- Submit a 1–5 star rating
- Modify an existing rating
- Add comments
- Reply to comments
- View other users' comments and replies

A database unique constraint ensures one rating per user/store pair while still allowing the user to update their rating.

---

# STORE OWNER permissions

Store owners can access:

```text
/owner/dashboard
/owner/store/edit
/owner/ratings
/stores
/stores/:storeId
/settings
```

Store-owner functionality includes:

- Store dashboard
- Average rating
- Total ratings
- Total unique users rated
- Rating distribution
- Recent ratings
- View own store
- Edit own store
- View users who rated the store
- Browse the public store listing

Store owners cannot modify another owner's store.

---

# Authentication flow

## Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "user@example.com",
  "password": "User@123"
}
```

The API creates an HTTP-only JWT cookie.

## Current session

```http
GET /api/auth/me
```

## Logout

```http
POST /api/auth/logout
```

## Registration

```http
POST /api/auth/register
```

Registration creates a normal user/store owner/admin according to the application's configured signup flow.

> For a production deployment, public ADMIN registration should be disabled and administrator accounts should be provisioned by an existing administrator.

---

# Main API endpoints

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout
PATCH  /api/auth/password
```

## Admin

```text
GET    /api/admin/dashboard
GET    /api/admin/users
POST   /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id
GET    /api/admin/stores
POST   /api/admin/stores
GET    /api/admin/stores/:id
PATCH  /api/admin/stores/:id
DELETE /api/admin/stores/:id
```

## Public/user store APIs

```text
GET    /api/stores
GET    /api/stores/:storeId
PUT    /api/stores/:storeId/rating
POST   /api/stores/:storeId/comments
POST   /api/stores/:storeId/comments/:commentId/replies
DELETE /api/stores/:storeId/comments/:commentId
```

## Store owner

```text
GET    /api/owner/dashboard
GET    /api/owner/store
PATCH  /api/owner/store
GET    /api/owner/ratings
```

## Health check

```text
GET /api/health
```

---

# Database

The database uses PostgreSQL through Prisma.

Main models:

```text
User
Store
Rating
Comment
StoreImage
```

Core relationships:

```text
User
 ├── owns Store
 ├── creates Rating
 └── creates Comment

Store
 ├── belongs to Store Owner
 ├── has Ratings
 ├── has Comments
 └── has Store Images

Rating
 ├── belongs to User
 └── belongs to Store

Comment
 ├── belongs to User
 ├── belongs to Store
 └── can have nested Replies
```

The rating model uses:

```prisma
@@unique([userId, storeId])
```

so the same user cannot create duplicate ratings for one store.

---

# Demo accounts

The database is automatically seeded on first startup.

| Role | Email | Password |
|---|---|---|
| ADMIN | admin@example.com | Admin@123 |
| USER | user@example.com | User@123 |
| STORE_OWNER | owner@example.com | Owner@123 |
| STORE_OWNER | owner2@example.com | Owner2@123 |
| USER | user2@example.com | User2@123 |
| USER | user3@example.com | User3@123 |

Additional demo users, stores and ratings are generated by the seed script.

---

# UI pages

## Authentication

```text
/login
/signup
```

## Admin

```text
/admin/dashboard
/admin/users
/admin/users/new
/admin/users/:id
/admin/users/:id/edit
/admin/stores
/admin/stores/new
/admin/stores/:id
/admin/stores/:id/edit
/admin/ratings
```

## Normal user

```text
/stores
/stores/:storeId
```

## Store owner

```text
/owner/dashboard
/owner/store/edit
/owner/ratings
```

## Shared

```text
/settings
```

---

# UI functionality

The application includes responsive navigation and functional controls throughout the provided StoreRate UI.

### Sidebar

- Dashboard navigation
- Users navigation
- Stores navigation
- Settings navigation
- Mobile sidebar
- Logout

### Header

- User profile
- Role display
- Settings navigation
- Logout
- Responsive mobile navigation

### Dashboard actions

- View all recent ratings
- View all top stores
- Navigate from statistic cards
- Rating chart data
- Rating distribution data

### Tables

- Search
- Filters
- Sorting
- Pagination
- View actions
- Edit actions
- Delete actions

### Store cards

- Open store details
- View image
- View rating
- Rate store
- Modify rating

### Store details

- Store image gallery
- Store information
- Average rating
- Rating distribution
- Rating submission/update
- Comments
- Replies

---

# Docker design

The reviewer only needs Docker.

The three containers are:

```text
storerate-frontend
storerate-backend
storerate-postgres
```

The frontend container uses Nginx to serve the production React build and reverse-proxy API requests:

```text
/api/* → backend:5000/api/*
```

This means the browser does not need a separately configured backend hostname and the frontend can use:

```text
VITE_API_URL=/api
```

The backend entrypoint automatically waits for PostgreSQL and runs:

```text
prisma migrate deploy
npm run prisma:seed
node src/server.js
```

---

# Troubleshooting

### Port 80 is already in use

Change the frontend port in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

Then open:

```text
http://localhost:8080
```

### Rebuild everything

```bash
docker compose down -v
docker compose up --build
```

### View backend logs

```bash
docker compose logs -f backend
```

### View frontend logs

```bash
docker compose logs -f frontend
```

### View PostgreSQL logs

```bash
docker compose logs -f postgres
```

---

# Production considerations

Before production deployment:

- Replace the demo JWT secret.
- Disable public ADMIN registration.
- Use HTTPS.
- Configure secure cookies for the deployment domain.
- Use a managed PostgreSQL database.
- Add CSRF protection appropriate for cookie authentication.
- Add application-level rate limits and audit logging.
- Add automated unit/integration tests.
- Store uploaded images in object storage such as S3/Cloudinary rather than the application container.

---

# Reviewer quick start

There is intentionally only one project startup command:

```bash
docker compose up --build
```

Then visit:

```text
http://localhost
```

Login using one of the demo accounts above and test the role-specific flows.
