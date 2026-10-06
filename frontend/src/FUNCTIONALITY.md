# StoreRate connected frontend

The UI has been kept intact and the interactive controls are wired to the backend.

Implemented:
- Responsive desktop/mobile sidebar navigation
- Header profile menu, settings navigation, logout and notification dropdown
- Admin dashboard stat-card navigation
- Admin dashboard Recent Ratings / Top Rated Stores View All actions
- Admin user View / Edit / Delete / Add actions
- Admin store View / Edit / Delete / Add actions
- User store search and rating/update-rating flow
- Store details and rating page
- Store owner dashboard data, View Store, Edit Store and View All Ratings
- Store owner store editing
- Settings/profile/password actions
- JWT-authenticated API requests with credentials included

Frontend environment:
VITE_API_URL=http://localhost:5000/api

## Authentication and role access
- Public `/login` and `/signup` pages.
- Signup supports USER, STORE_OWNER, and ADMIN as requested.
- Registration creates a JWT session cookie and signs the user in immediately.
- `AuthProvider` validates an existing cached session with `/api/auth/me`.
- Unauthenticated users attempting protected URLs are redirected to `/login` with the original URL preserved.
- Authenticated users attempting another role's URLs are redirected to their own home page.
- ADMIN: `/admin/*`
- USER: `/stores*`
- STORE_OWNER: `/stores*` and `/owner/*`
- All authenticated roles: `/settings`.
- Backend also enforces the same roles; frontend routing is not the security boundary.

## Store details, reviews and replies
- Clicking anywhere on a user-facing store card opens `/stores/:storeId`.
- Store details support a responsive image gallery using `image`, `images`, `imageUrls`, `photos`, or `gallery` fields.
- Users can submit or update a 1–5 rating with an optional written comment.
- Users can reply to review comments.
- Store owners can see customer ratings/comments from the owner dashboard and `/owner/ratings`, and can reply to customer comments.
- Store pages use skeleton loading states and a route-transition progress animation.
- Review API calls try the review/rating endpoint variants supported by the frontend and fall back to the existing `PUT /stores/:id/rating` endpoint for rating submission.
