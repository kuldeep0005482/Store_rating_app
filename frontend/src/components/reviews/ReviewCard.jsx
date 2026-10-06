import React, { useState } from "react";
import { MessageCircle, Reply, Send } from "lucide-react";
import { Avatar, Button, Card, RatingStars, Textarea } from "../ui";

function formatDate(value) {
  if (!value) return "Recently";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function ReviewCard({ review, canReply = false, onReply, replying = false }) {
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  const submitReply = async (event) => {
    event.preventDefault();
    const value = reply.trim();
    if (!value) {
      setReplyError("Reply cannot be empty.");
      return;
    }
    setReplyError("");
    await onReply?.(review, value, () => {
      setReply("");
      setOpenReply(false);
    });
  };

  return (
    <Card className="p-0">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Avatar name={review.user?.name || "User"} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-[#111827]">{review.user?.name || "Anonymous user"}</p>
                <p className="mt-0.5 text-[11px] text-[#94a3b8]">{formatDate(review.createdAt)}</p>
              </div>
              <RatingStars value={review.rating} size={16} showValue />
            </div>

            {review.comment ? (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-[#475569]">{review.comment}</p>
            ) : (
              <p className="mt-4 text-sm italic text-[#94a3b8]">No written comment.</p>
            )}

            {canReply && (
              <button
                type="button"
                onClick={() => setOpenReply((value) => !value)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#dc2626] hover:underline"
              >
                <Reply size={14} />
                {openReply ? "Cancel reply" : "Reply"}
              </button>
            )}

            {openReply && (
              <form onSubmit={submitReply} className="mt-4 rounded-xl bg-[#fff7f3] p-3">
                <Textarea
                  label="Your reply"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write a helpful reply..."
                  maxLength={500}
                  error={replyError}
                />
                <div className="mt-3 flex justify-end">
                  <Button type="submit" size="sm" loading={replying} icon={Send}>Send reply</Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {review.replies?.length > 0 && (
          <div className="mt-5 border-l-2 border-[#fecaca] pl-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#64748b]">
              <MessageCircle size={14} />
              {review.replies.length} {review.replies.length === 1 ? "reply" : "replies"}
            </div>
            <div className="space-y-3">
              {review.replies.map((item, index) => (
                <div key={item.id || item._id || `${review.id}-reply-${index}`} className="rounded-xl bg-[#f8fafc] p-3">
                  <div className="flex items-start gap-2.5">
                    <Avatar name={item.user?.name || item.author?.name || item.userName || "Reply"} size="sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-bold text-[#111827]">{item.user?.name || item.author?.name || item.userName || "Reply"}</p>
                        <span className="text-[10px] text-[#94a3b8]">{formatDate(item.createdAt || item.date)}</span>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-[#475569]">{item.comment || item.text || item.reply || ""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
