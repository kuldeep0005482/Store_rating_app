ALTER TABLE "ratings" ADD COLUMN "comment" VARCHAR(500);

CREATE TABLE "replies" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(500) NOT NULL,
    "rating_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "replies_rating_id_idx" ON "replies"("rating_id");
CREATE INDEX "replies_user_id_idx" ON "replies"("user_id");

ALTER TABLE "replies" ADD CONSTRAINT "replies_rating_id_fkey"
  FOREIGN KEY ("rating_id") REFERENCES "ratings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "replies" ADD CONSTRAINT "replies_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;