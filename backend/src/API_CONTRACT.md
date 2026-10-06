# StoreRate API contract for the supplied UI

Base URL: `/api`

Authentication: JWT is stored in an HTTP-only `token` cookie after login. A Bearer token is also accepted.

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`
- `PATCH /auth/password`

## Admin dashboard

`GET /admin/dashboard` returns:

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 1248,
      "totalStores": 184,
      "totalRatings": 8426
    },
    "ratingOverview": [
      { "month": "Jan", "count": 420 },
      { "month": "Feb", "count": 510 }
    ],
    "ratingDistribution": [
      { "rating": 5, "count": 2865, "percentage": 34 },
      { "rating": 4, "count": 2360, "percentage": 28 },
      { "rating": 3, "count": 1516, "percentage": 18 },
      { "rating": 2, "count": 1011, "percentage": 12 },
      { "rating": 1, "count": 674, "percentage": 8 }
    ],
    "recentRatings": [],
    "topStores": []
  }
}
```

## Admin users

- `GET /admin/users?name=&email=&address=&role=&page=1&limit=10&sortBy=name&sortOrder=asc`
- `POST /admin/users`
- `GET /admin/users/:id`
- `PATCH /admin/users/:id`
- `DELETE /admin/users/:id`

`GET /admin/users/:id` supplies `user.totalRatingsSubmitted`, `user.lastRatingDate`, `user.accountStatus`, `user.memberSince`, and `recentRatings` for the User Details page.

## Admin stores

- `GET /admin/store-owners` — supplies the Store Owner dropdown on Add Store.
- `GET /admin/stores?search=&name=&email=&address=&page=1&limit=10&sortBy=name&sortOrder=asc`
- `POST /admin/stores`
- `GET /admin/stores/:id`
- `PATCH /admin/stores/:id`
- `DELETE /admin/stores/:id`

## Normal user store listing

- `GET /stores?search=&page=1&limit=12`
- `GET /stores/:storeId`
- `PUT /stores/:storeId/rating` body: `{ "value": 1..5 }`

Each store-listing item contains `id`, `name`, `category`, `address`, `image`, `rating`, `ratingsCount`, and `userRating`.

## Store owner

- `GET /owner/dashboard`
- `GET /owner/store`
- `PATCH /owner/store`
- `GET /owner/ratings?page=1&limit=10`

Owner dashboard contains `store`, `statistics.averageRating`, `statistics.totalRatings`, `statistics.totalUsersRated`, `ratingDistribution`, and `recentRatings`.
