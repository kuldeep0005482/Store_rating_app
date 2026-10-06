import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, MapPin, Mail, Store as StoreIcon, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { Button, Card, EmptyState, RatingStars, Skeleton } from "../../components/ui";
import RatingSummary from "../../components/rating/RatingSummary";
import RatingForm from "../../components/forms/RatingForm";
import { StoreImageGallery } from "../../components/stores";
import { ReviewCard } from "../../components/reviews";
import { useAuth } from "../../context/AuthContext";
import {
  getStorePageData,
  normalizeImages,
  normalizeReview,
  replyToReview,
  submitStoreReview,
  updateStoreReview,
} from "../../services/reviews";

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-[1250px] space-y-5">
      <Skeleton className="h-4 w-56" />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <Skeleton className="h-[360px] rounded-xl" />
        <Card><Skeleton className="h-8 w-2/3" /><Skeleton className="mt-4 h-4 w-1/3" /><Skeleton className="mt-7 h-28 w-full" /></Card>
      </div>
      <Card><Skeleton className="h-6 w-40" /><Skeleton className="mt-5 h-32 w-full" /></Card>
    </div>
  );
}

function ratingDistribution(reviews) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    if (counts[review.rating] !== undefined) counts[review.rating] += 1;
  });
  const total = reviews.length;
  return Object.fromEntries(Object.entries(counts).map(([star, count]) => [star, total ? Math.round((count / total) * 100) : 0]));
}

function averageRating(reviews, store) {
  if (!reviews.length) return Number(store?.rating ?? store?.averageRating ?? 0);
  return reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / reviews.length;
}

export default function UserStoreDetails() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [store, setStore] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [replyingId, setReplyingId] = useState(null);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getStorePageData(storeId);
      setStore(result.store);
      setReviews(result.reviews);
    } catch (loadError) {
      setError(loadError.message || "Unable to load this store.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const result = await getStorePageData(storeId);
        if (!active) return;
        setStore(result.store);
        setReviews(result.reviews);
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load this store.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [storeId]);

  const images = useMemo(() => normalizeImages(store), [store]);
  const average = useMemo(() => averageRating(reviews, store), [reviews, store]);
  const distribution = useMemo(() => ratingDistribution(reviews), [reviews]);

  const myReview = useMemo(() => {
    if (!user?.id) return null;
    return reviews.find((review) => String(review.user?.id ?? review.userId) === String(user.id)) || null;
  }, [reviews, user]);

  const handleReview = async ({ rating, comment }) => {
    setSubmitLoading(true);
    setActionError("");
    try {
      if (myReview?.id) {
        const response = await updateStoreReview(storeId, myReview.id, { rating, comment });
        const updated = normalizeReview(response?.data?.review || response?.review || response?.data || { ...myReview, rating, comment, createdAt: new Date().toISOString() });
        setReviews((current) => current.map((item) => item.id === myReview.id ? { ...item, ...updated } : item));
      } else {
        await submitStoreReview(storeId, { rating, comment });
      }
      await load();
      setToast(myReview ? "Your rating was updated." : "Thanks! Your rating was submitted.");
    } catch (submitError) {
      setActionError(submitError.message || "Unable to submit your rating.");
    } finally {
      setSubmitLoading(false);
      window.setTimeout(() => setToast(""), 2800);
    }
  };

  const handleReply = async (review, reply, done) => {
    setReplyingId(review.id);
    setActionError("");
    try {
      const response = await replyToReview(review.id, reply);
      const created = response?.data?.reply || response?.reply || response?.data || {
        id: `local-${Date.now()}`,
        comment: reply,
        createdAt: new Date().toISOString(),
        user: { id: user?.id, name: user?.name || "You" },
      };
      setReviews((current) => current.map((item) => (
        item.id === review.id
          ? { ...item, replies: [...(item.replies || []), created] }
          : item
      )));
      done?.();
      setToast("Reply added successfully.");
    } catch (replyError) {
      setActionError(replyError.message || "Unable to add the reply.");
    } finally {
      setReplyingId(null);
      window.setTimeout(() => setToast(""), 2800);
    }
  };

  if (loading) return <AdminLayout activeItem="Stores"><DetailsSkeleton /></AdminLayout>;

  if (error || !store) {
    return (
      <AdminLayout activeItem="Stores">
        <div className="mx-auto max-w-[900px]">
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate("/stores")}>Back to Stores</Button>
          <Card className="mt-5 p-8 text-center">
            <p className="text-sm font-semibold text-[#dc2626]">{error || "Store not found."}</p>
            <Button className="mt-4" onClick={load}>Try again</Button>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const storeName = store.name || "Store";
  const total = reviews.length || Number(store.reviewCount ?? store.ratingsCount ?? store.totalRatings ?? 0);

  return (
    <AdminLayout activeItem="Stores">
      <div className="mx-auto w-full max-w-[1250px]">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-[#9ca3af]">
          <button className="hover:text-[#dc2626]" type="button" onClick={() => navigate("/stores")}>Stores</button>
          <span>/</span>
          <span className="font-medium text-[#64748b]">{storeName}</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">Store Details</h1>
            <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">View photos, ratings, comments and replies.</p>
          </div>
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate("/stores")}>Back to Stores</Button>
        </div>

        {(actionError || toast) && (
          <div className={`mb-4 rounded-xl border p-3 text-sm ${actionError ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>
            {actionError || toast}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
          <StoreImageGallery images={images} storeName={storeName} />

          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1f2] text-[#dc2626]"><StoreIcon size={22} /></div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-[#111827]">{storeName}</h2>
                <p className="mt-1 text-xs text-[#64748b]">{store.category || "General"}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-[#64748b]">
              <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{store.address || "Address not available"}</p>
              {store.email && <p className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0" />{store.email}</p>}
              {store.ownerName && <p className="flex items-start gap-2"><Tag size={16} className="mt-0.5 shrink-0" />Owner: {store.ownerName}</p>}
            </div>

            <div className="mt-7 rounded-xl bg-[#fff7f3] p-4">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-[#111827]">{average.toFixed(1)}</span>
                <div className="pb-1"><RatingStars value={average} size={18} /><p className="mt-1 text-[11px] text-[#64748b]">{total} ratings</p></div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <RatingSummary average={average} total={total} distribution={distribution} />
          <RatingForm
            store={{ ...store, id: store.id || storeId }}
            initialRating={myReview?.rating || 0}
            initialComment={myReview?.comment || ""}
            onSubmit={handleReview}
            onCancel={() => undefined}
            loading={submitLoading}
          />
        </div>

        <section className="mt-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Comments & Reviews</h2>
              <p className="mt-1 text-xs text-[#6b7280]">See what customers are saying about {storeName}.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#64748b] shadow-sm ring-1 ring-[#e5e7eb]">
              <MessageCircle size={14} /> {reviews.filter((review) => review.comment).length} comments
            </div>
          </div>

          {reviews.length === 0 ? (
            <EmptyState title="No reviews yet" description="Be the first customer to rate and comment on this store." />
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  canReply
                  replying={replyingId === review.id}
                  onReply={handleReply}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
