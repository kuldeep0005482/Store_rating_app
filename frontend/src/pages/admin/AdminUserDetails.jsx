import React, { useEffect, useState } from "react";
import { ArrowLeft, Edit, Mail, MapPin, ShieldCheck, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/layout/PageHeader";
import { api } from "../../services/api";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";

const USERS = [
  {
    id: "1",
    name: "Rahul Khanna",
    email: "rahul.khanna@example.com",
    address: "Pune, Maharashtra",
    role: "ADMIN",
    status: "Active",
    joinedDate: "12 Jan 2024, 10:30 AM",
    lastUpdated: "20 Jul 2024, 02:15 PM",
    totalRatings: 28,
    lastRatingDate: "18 Jul 2024",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    address: "Mumbai, Maharashtra",
    role: "USER",
    status: "Active",
    joinedDate: "18 Feb 2024, 11:20 AM",
    lastUpdated: "19 Jul 2024, 01:45 PM",
    totalRatings: 14,
    lastRatingDate: "17 Jul 2024",
  },
  {
    id: "3",
    name: "Amit Mehta",
    email: "amit.mehta@example.com",
    address: "Bangalore, Karnataka",
    role: "USER",
    status: "Active",
    joinedDate: "05 Mar 2024, 09:15 AM",
    lastUpdated: "18 Jul 2024, 04:30 PM",
    totalRatings: 21,
    lastRatingDate: "16 Jul 2024",
  },
];

const RATINGS = [
  {
    id: 1,
    store: "Urban Basket",
    rating: 5,
    date: "18 Jul 2024",
  },
  {
    id: 2,
    store: "TechWorld",
    rating: 4,
    date: "12 Jul 2024",
  },
  {
    id: 3,
    store: "FreshMart",
    rating: 4,
    date: "01 Jul 2024",
  },
  {
    id: 4,
    store: "City Fashion",
    rating: 3,
    date: "22 Jun 2024",
  },
];

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating
              ? "text-[#f59e0b]"
              : "text-[#d1d5db]"
          }
        >
          ★
        </span>
      ))}

      <span className="ml-1 text-xs font-semibold text-[#4b5563]">
        {rating}
      </span>
    </div>
  );
}

function RoleBadge({ role }) {
  return (
    <Badge
      variant={role === "ADMIN" ? "admin" : "user"}
    >
      {role}
    </Badge>
  );
}

export default function AdminUserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await api.get(`/admin/users/${id}`);
        const data = result.data || {};
        const userData = data.user || data;
        const activity = data.accountActivity || {};
        setUser({
          ...(userData || {}),
          status: "Active",
          joinedDate: userData?.createdAt
            ? new Date(userData.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
            : "—",
          lastUpdated: userData?.updatedAt
            ? new Date(userData.updatedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
            : "—",
          totalRatings: activity.totalRatingsSubmitted ?? userData?.totalRatingsSubmitted ?? 0,
          lastRatingDate: activity.lastRatingDate || userData?.lastRatingDate
            ? new Date(activity.lastRatingDate || userData.lastRatingDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "—",
        });
        setRatings((data.recentRatings || []).map((rating) => ({
          ...rating,
          store: typeof rating.store === "string"
            ? rating.store
            : rating.store?.name || "Unknown Store",
          date: rating.createdAt
            ? new Date(rating.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "—",
        })));
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser({ loadError: error.message || "Unable to load user" });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout activeItem="Users">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-[#6b7280]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#e5e7eb] border-t-[#dc2626]" />
            Loading user...
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (user?.loadError) {
    return (
      <AdminLayout activeItem="Users">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-10 text-center">
          <h2 className="text-lg font-bold text-[#111827]">Unable to load user</h2>

          <p className="mt-2 text-sm text-[#6b7280]">
            {user.loadError}
          </p>

          <Button
            className="mt-5"
            onClick={() => navigate("/admin/users")}
          >
            Back to Users
          </Button>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout activeItem="Users">
      <div className="mx-auto w-full max-w-[1200px]">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[11px] text-[#9ca3af]">
          <button
            onClick={() => navigate("/admin/users")}
            className="transition hover:text-[#dc2626]"
          >
            Users
          </button>

          <span>/</span>

          <span className="text-[#6b7280]">
            User Details
          </span>
        </div>

        {/* Page heading */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
              User Details
            </h1>

            <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
              View complete information about this user.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate("/admin/users")}
            >
              Back to Users
            </Button>

            <Button
              size="sm"
              icon={Edit}
              onClick={() =>
                navigate(`/admin/users/${user.id}/edit`)
              }
            >
              Edit User
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Basic information */}
          <Card className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between border-b border-[#f1f5f9] pb-4">
              <div>
                <h2 className="text-sm font-bold text-[#111827]">
                  Basic Information
                </h2>

                <p className="mt-1 text-[11px] text-[#9ca3af]">
                  User account information
                </p>
              </div>

              <Avatar
                name={user.name}
                size="lg"
              />
            </div>

            <div className="space-y-0">

              {/* Full Name */}
              <div className="grid grid-cols-1 gap-1 border-b border-[#f1f5f9] py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#6b7280]">
                  <User size={14} />
                  Full Name
                </div>

                <div className="text-xs font-semibold text-[#111827]">
                  {user.name}
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 gap-1 border-b border-[#f1f5f9] py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#6b7280]">
                  <Mail size={14} />
                  Email
                </div>

                <div className="break-all text-xs text-[#4b5563]">
                  {user.email}
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 gap-1 border-b border-[#f1f5f9] py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#6b7280]">
                  <MapPin size={14} />
                  Address
                </div>

                <div className="text-xs text-[#4b5563]">
                  {user.address}
                </div>
              </div>

              {/* Role */}
              <div className="grid grid-cols-1 gap-1 border-b border-[#f1f5f9] py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#6b7280]">
                  <ShieldCheck size={14} />
                  Role
                </div>

                <div>
                  <RoleBadge role={user.role} />
                </div>
              </div>

              {/* Member Since */}
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                <div className="text-[11px] font-semibold text-[#6b7280]">
                  Member Since
                </div>

                <div className="text-xs text-[#4b5563]">
                  {user.joinedDate}
                </div>
              </div>

            </div>
          </Card>

          {/* Account activity */}
          <Card>
            <div className="border-b border-[#f1f5f9] pb-4">
              <h2 className="text-sm font-bold text-[#111827]">
                Account Activity
              </h2>

              <p className="mt-1 text-[11px] text-[#9ca3af]">
                Recent account statistics
              </p>
            </div>

            <div className="space-y-5 pt-5">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Total Ratings Submitted
                </p>

                <p className="mt-1 text-2xl font-bold text-[#111827]">
                  {user.totalRatings}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Last Rating Date
                </p>

                <p className="mt-1 text-sm font-semibold text-[#374151]">
                  {user.lastRatingDate}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Account Status
                </p>

                <div className="mt-2">
                  <Badge variant="success">
                    {user.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Last Updated
                </p>

                <p className="mt-1 text-xs text-[#4b5563]">
                  {user.lastUpdated}
                </p>
              </div>

            </div>
          </Card>
        </div>

        {/* Recent Ratings */}
        <Card className="mt-5" contentClassName="p-0">

          <div className="flex flex-col gap-2 border-b border-[#f1f5f9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Recent Ratings
              </h2>

              <p className="mt-1 text-[11px] text-[#9ca3af]">
                Ratings submitted by this user
              </p>
            </div>

            <span className="text-[11px] font-medium text-[#9ca3af]">
              {user.totalRatings} total ratings
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#fafafa]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
                    #
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
                    Store
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
                    Rating
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {ratings.map((rating, index) => (
                  <tr
                    key={rating.id}
                    className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#fffafa]"
                  >
                    <td className="px-5 py-3 text-xs text-[#6b7280]">
                      {index + 1}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">
                          {rating.store.charAt(0)}
                        </div>

                        <span className="text-xs font-semibold text-[#111827]">
                          {rating.store}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      <RatingStars rating={rating.rating} />
                    </td>

                    <td className="px-5 py-3 text-xs text-[#6b7280]">
                      {rating.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile ratings */}
          <div className="space-y-3 p-4 md:hidden">
            {ratings.map((rating, index) => (
              <div
                key={rating.id}
                className="rounded-lg border border-[#e5e7eb] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[#111827]">
                        {rating.store}
                      </p>

                      <p className="mt-1 text-[10px] text-[#9ca3af]">
                        {rating.date}
                      </p>
                    </div>
                  </div>

                  <RatingStars rating={rating.rating} />
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AdminLayout>
  );
}