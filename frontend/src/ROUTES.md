# StoreRate Routes

## Public

| Path | Page | Access |
|---|---|---|
| `/login` | Login | Public only |
| `/signup` | Signup | Public only |

Signup supports `USER`, `STORE_OWNER`, and `ADMIN` roles. In a production deployment, public ADMIN signup should be disabled or protected by an invitation/secret; the current implementation follows the requested coding-challenge behavior.

## Admin

| Path | Role |
|---|---|
| `/admin/dashboard` | ADMIN |
| `/admin/ratings` | ADMIN |
| `/admin/users` | ADMIN |
| `/admin/users/new` | ADMIN |
| `/admin/users/:id` | ADMIN |
| `/admin/users/:id/edit` | ADMIN |
| `/admin/stores` | ADMIN |
| `/admin/stores/new` | ADMIN |
| `/admin/stores/:id` | ADMIN |
| `/admin/stores/:id/edit` | ADMIN |

## User / Store Owner

| Path | Role |
|---|---|
| `/stores` | USER, STORE_OWNER |
| `/stores/:storeId` | USER, STORE_OWNER |

## Store Owner

| Path | Role |
|---|---|
| `/owner/dashboard` | STORE_OWNER |
| `/owner/store/edit` | STORE_OWNER |
| `/owner/ratings` | STORE_OWNER |

## Shared

`/settings` is available to every authenticated role.

`ProtectedRoute` verifies the cached user against `GET /api/auth/me` on startup. `RoleRoute` blocks users from opening another role's URL and redirects them to their own home page.
