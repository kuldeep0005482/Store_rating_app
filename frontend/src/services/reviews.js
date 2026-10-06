import { api } from "./api";

async function tryCandidates(candidates) {
  let lastError;

  for (const candidate of candidates) {
    try {
      return await candidate();
    } catch (error) {
      lastError = error;
      if (error?.status !== 404) throw error;
    }
  }

  throw lastError || new Error("No compatible review endpoint is available");
}

export function unwrapData(payload) {
  return payload?.data ?? payload;
}

export function extractList(payload, keys = []) {
  const data = unwrapData(payload);
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
}

export function normalizeImages(store) {
  const candidates = [
    ...(Array.isArray(store?.images) ? store.images : []),
    ...(Array.isArray(store?.imageUrls) ? store.imageUrls : []),
    ...(Array.isArray(store?.photos) ? store.photos : []),
    ...(Array.isArray(store?.gallery) ? store.gallery : []),
  ];

  if (store?.image) candidates.unshift(store.image);

  return [...new Set(
    candidates
      .map((item) => (typeof item === "string" ? item : item?.url || item?.image || item?.src))
      .filter(Boolean),
  )];
}

export function normalizeReview(review) {
  return {
    ...review,
    id: review?.id ?? review?._id ?? `review-${Date.now()}`,
    rating: Number(review?.rating ?? review?.value ?? review?.score ?? 0),
    comment: review?.comment ?? review?.review ?? review?.text ?? "",
    createdAt: review?.createdAt ?? review?.date,
    user: review?.user ?? review?.reviewer ?? {
      id: review?.userId,
      name: review?.userName || review?.name || "Anonymous user",
      email: review?.userEmail,
    },
    replies: Array.isArray(review?.replies)
      ? review.replies
      : Array.isArray(review?.comments)
        ? review.comments
        : [],
  };
}

export async function getStorePageData(storeId) {
  const [storeResult, reviewsResult] = await Promise.all([
    tryCandidates([
      () => api.get(`/stores/${storeId}`),
      () => api.get(`/stores/${storeId}/details`),
      () => api.get("/stores?limit=100&sortBy=name&sortOrder=asc"),
    ]),
    tryCandidates([
      () => api.get(`/stores/${storeId}/reviews?page=1&limit=100`),
      () => api.get(`/stores/${storeId}/ratings?page=1&limit=100`),
      () => api.get(`/ratings?storeId=${encodeURIComponent(storeId)}&page=1&limit=100`),
    ]).catch(() => null),
  ]);

  const storePayload = unwrapData(storeResult);
  const store = Array.isArray(storePayload)
    ? storePayload.find((item) => String(item?.id ?? item?._id) === String(storeId))
    : (storePayload?.store || storePayload);
  const embeddedReviews = extractList(storePayload, ["reviews", "ratings", "recentRatings"]);
  const fetchedReviews = extractList(reviewsResult, ["reviews", "ratings"]);

  return {
    store: store || {},
    reviews: (fetchedReviews.length ? fetchedReviews : embeddedReviews).map(normalizeReview),
  };
}

export async function submitStoreReview(storeId, { rating, comment }) {
  return tryCandidates([
    () => api.post(`/stores/${storeId}/reviews`, { rating, comment }),
    () => api.post(`/stores/${storeId}/ratings`, { rating, comment }),
    () => api.put(`/stores/${storeId}/rating`, { value: rating, comment }),
  ]);
}

export async function updateStoreReview(storeId, reviewId, { rating, comment }) {
  return tryCandidates([
    () => api.patch(`/stores/${storeId}/reviews/${reviewId}`, { rating, comment }),
    () => api.put(`/stores/${storeId}/reviews/${reviewId}`, { rating, comment }),
    () => api.put(`/stores/${storeId}/rating`, { value: rating, comment }),
  ]);
}

export async function replyToReview(reviewId, reply) {
  return tryCandidates([
    () => api.post(`/stores/ratings/${reviewId}/replies`, { comment: reply }),
    () => api.post(`/reviews/${reviewId}/replies`, { comment: reply }),
    () => api.post(`/reviews/${reviewId}/reply`, { comment: reply }),
    () => api.post(`/ratings/${reviewId}/replies`, { comment: reply }),
    () => api.post(`/ratings/${reviewId}/reply`, { comment: reply }),
    () => api.post(`/comments/${reviewId}/replies`, { comment: reply }),
    () => api.post(`/comments/${reviewId}/reply`, { comment: reply }),
  ]);
}

export async function getOwnerReviews() {
  return tryCandidates([
    () => api.get("/owner/reviews?page=1&limit=100"),
    () => api.get("/owner/ratings?includeComments=true&page=1&limit=100"),
  ]);
}
