export function averageRating(ratings = []) {
  if (!ratings.length) return 0;
  return Number(
    (ratings.reduce((sum, item) => sum + item.value, 0) / ratings.length).toFixed(2)
  );
}

export function ratingDistribution(ratings = []) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  for (const rating of ratings) {
    if (counts[rating.value] !== undefined) counts[rating.value] += 1;
  }

  const total = ratings.length;
  return [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: counts[rating],
    percentage: total ? Math.round((counts[rating] / total) * 100) : 0,
  }));
}

export function pageParams(query, defaultLimit = 10, maxLimit = 50) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || defaultLimit, 1),
    maxLimit
  );
  return { page, limit, skip: (page - 1) * limit };
}
