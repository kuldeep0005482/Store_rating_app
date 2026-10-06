import React, { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { ReviewCard } from "../../components/reviews";
import { extractList, getOwnerReviews, normalizeReview, replyToReview } from "../../services/reviews";
import { useAuth } from "../../context/AuthContext";

export default function OwnerRatings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyingId, setReplyingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getOwnerReviews();
      setRows(extractList(result, ["reviews", "ratings"]).map(normalizeReview));
    } catch (loadError) {
      setError(loadError.message || "Unable to load ratings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleReply = async (review, reply, done) => {
    setReplyingId(review.id);
    try {
      const response = await replyToReview(review.id, reply);
      const created = response?.data?.reply || response?.reply || response?.data || {
        id: `local-${Date.now()}`,
        comment: reply,
        createdAt: new Date().toISOString(),
        user: { id: user?.id, name: user?.name || "Store Owner" },
      };
      setRows((current) => current.map((item) => item.id === review.id ? { ...item, replies: [...(item.replies || []), created] } : item));
      done?.();
    } catch (replyError) {
      setError(replyError.message || "Unable to reply to this comment.");
    } finally {
      setReplyingId(null);
    }
  };

  return (
    <AdminLayout activeItem="Ratings">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ratings & Comments</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Review every customer rating and reply to written feedback.</p>
          </div>
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate("/owner/dashboard")}>Dashboard</Button>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36 rounded-xl" />)}
          </div>
        ) : rows.length === 0 ? (
          <EmptyState title="No ratings yet" description="Customer ratings for your store will appear here." />
        ) : (
          <div className="space-y-4">
            <Card className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#111827]">Customer feedback</p>
                <p className="mt-1 text-xs text-[#6b7280]">{rows.length} ratings loaded</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#fff1f2] px-3 py-1.5 text-xs font-semibold text-[#dc2626]"><MessageCircle size={14} /> {rows.filter((row) => row.comment).length} comments</div>
            </Card>
            {rows.map((review) => (
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
      </div>
    </AdminLayout>
  );
}
