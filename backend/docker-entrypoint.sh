#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."

until npx prisma migrate deploy; do
  echo "PostgreSQL is not ready yet. Retrying in 2 seconds..."
  sleep 2
done

echo "Running demo seed..."
npm run prisma:seed

echo "Starting StoreRate API..."
exec node src/server.js
