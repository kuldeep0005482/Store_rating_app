import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  Users,
  FileText,
  Store,
  MapPin,
  Tag,
  ExternalLink,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { api } from "../../services/api";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";


// ============================================================
// Temporary dashboard data
// Replace this with your API response later.
// ============================================================

const STORE = {
  id: "2",
  name: "TechWorld",
  category: "Electronics",
  address: "Mumbai, Maharashtra",
  rating: 4.6,
  totalRatings: 320,
  totalUsersRated: 320,
};


// ============================================================
// Rating distribution
// ============================================================

const RATING_DISTRIBUTION = [
  {
    stars: 5,
    count: 109,
    percentage: 34,
  },
  {
    stars: 4,
    count: 90,
    percentage: 28,
  },
  {
    stars: 3,
    count: 64,
    percentage: 20,
  },
  {
    stars: 2,
    count: 38,
    percentage: 12,
  },
  {
    stars: 1,
    count: 19,
    percentage: 6,
  },
];


// ============================================================
// Recent ratings
// ============================================================

const RECENT_RATINGS = [
  {
    id: "1",
    user: "Rohan Mehta",
    rating: 5,
    date: "18 Jul 2024, 10:34 AM",
  },
  {
    id: "2",
    user: "Priya Sharma",
    rating: 4,
    date: "15 Jul 2024, 09:15 AM",
  },
  {
    id: "3",
    user: "Amit Desai",
    rating: 4,
    date: "12 Jul 2024, 06:42 PM",
  },
  {
    id: "4",
    user: "Sneha Patil",
    rating: 3,
    date: "10 Jul 2024, 04:17 PM",
  },
  {
    id: "5",
    user: "Karan Tiwari",
    rating: 3,
    date: "08 Jul 2024, 03:28 PM",
  },
];


// ============================================================
// Star Rating
// ============================================================

function StarRating({
  rating,
  showValue = true,
}) {
  return (
    <div className="flex items-center gap-2">

      <div className="flex items-center gap-[2px]">

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={17}
            strokeWidth={1.7}
            className={
              star <= rating
                ? "fill-[#f59e0b] text-[#f59e0b]"
                : "text-[#d1d5db]"
            }
          />
        ))}

      </div>

      {showValue && (
        <span className="text-sm font-bold text-[#111827]">
          {rating}
        </span>
      )}

    </div>
  );
}


// ============================================================
// Dashboard Stat Card
// ============================================================

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
}) {
  return (
    <Card className="min-w-0">

      <div className="flex items-center gap-4">

        {/* Icon */}

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            ${iconClass}
          `}
        >
          <Icon size={26} />
        </div>


        {/* Content */}

        <div className="min-w-0">

          <p className="text-xs font-semibold text-[#64748b] sm:text-sm">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-[#111827] sm:text-[28px]">
            {value}
          </p>

          <p className="mt-0.5 text-[11px] text-[#64748b] sm:text-xs">
            {description}
          </p>

        </div>

      </div>

    </Card>
  );
}


// ============================================================
// My Store Card
// ============================================================

function MyStoreCard({
  store,
  onView,
  onEdit,
}) {
  return (
    <Card className="h-full">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">

        <h2 className="text-lg font-bold text-[#111827] sm:text-xl">
          My Store
        </h2>

        <Button
          variant="outline"
          size="sm"
          icon={ExternalLink}
          onClick={onView}
        >
          View Store
        </Button>

      </div>


      {/* Store details */}

      <div className="mt-5 flex flex-col gap-5 sm:flex-row">

        {/* Store image placeholder */}

        <div
          className="
            flex
            h-[150px]
            w-full
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#eff6ff]
            sm:h-[170px]
            sm:w-[180px]
          "
        >
          <Store
            size={55}
            strokeWidth={1.5}
            className="text-[#3b82f6]"
          />
        </div>


        {/* Information */}

        <div className="flex min-w-0 flex-1 flex-col justify-center">

          <h3 className="text-xl font-bold text-[#111827]">
            {store.name}
          </h3>


          {/* Category */}

          <div className="mt-3 flex items-center gap-2 text-sm text-[#64748b]">

            <Tag size={15} />

            <span>
              {store.category}
            </span>

          </div>


          {/* Address */}

          <div className="mt-2 flex items-center gap-2 text-sm text-[#64748b]">

            <MapPin size={15} />

            <span>
              {store.address}
            </span>

          </div>


          {/* Rating */}

          <div className="mt-4 flex flex-wrap items-center gap-3">

            <StarRating
              rating={store.rating}
            />

            <span className="text-sm text-[#64748b]">
              ({store.totalRatings} ratings)
            </span>

          </div>


          {/* Edit */}

          <div className="mt-5">

            <Button
              variant="outline"
              size="sm"
              icon={Edit}
              onClick={onEdit}
              className="
                border-[#fecaca]
                text-[#dc2626]
                hover:bg-[#fff1f2]
              "
            >
              Edit Store
            </Button>

          </div>

        </div>

      </div>

    </Card>
  );
}


// ============================================================
// Rating Distribution
// ============================================================

function RatingDistribution({
  ratings,
  totalRatings = 0,
}) {
  /*
   * Calculate the donut using conic-gradient.
   *
   * No external chart library is required.
   */

  const gradient = useMemo(() => {

    let current = 0;

    const segments = [];

    ratings.forEach((item, index) => {

      const start = current;

      current += item.percentage;

      const end = current;

      const colors = [
        "#b91c1c",
        "#dc2626",
        "#f4511e",
        "#f59e0b",
        "#fcd34d",
      ];

      segments.push(
        `${colors[index]} ${start}% ${end}%`
      );

    });

    return `conic-gradient(${segments.join(", ")})`;

  }, [ratings]);


  return (
    <Card className="h-full">

      {/* Header */}

      <div className="border-b border-[#f1f5f9] pb-4">

        <h2 className="text-lg font-bold text-[#111827] sm:text-xl">
          Rating Distribution
        </h2>

      </div>


      {/* Chart */}

      <div className="mt-5 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">

        {/* Donut */}

        <div
          className="
            relative
            h-[190px]
            w-[190px]
            shrink-0
          "
        >

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: gradient,
            }}
          />

          {/* Inner circle */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-[105px]
              w-[105px]
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >

            <span className="text-2xl font-bold text-[#111827]">
              {totalRatings}
            </span>

            <span className="text-[11px] text-[#64748b]">
              Total Ratings
            </span>

          </div>

        </div>


        {/* Legend */}

        <div className="w-full max-w-[260px]">

          {ratings.map((item, index) => {

            const colors = [
              "#b91c1c",
              "#dc2626",
              "#f4511e",
              "#f59e0b",
              "#fcd34d",
            ];

            return (
              <div
                key={item.stars}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#f1f5f9]
                  py-2.5
                  last:border-0
                "
              >

                <div className="flex items-center gap-3">

                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        colors[index],
                    }}
                  />

                  <span className="text-xs font-medium text-[#475569]">
                    {item.stars} Stars
                  </span>

                </div>

                <span className="text-xs font-semibold text-[#475569]">
                  {item.count} ({item.percentage}%)
                </span>

              </div>
            );

          })}

        </div>

      </div>

    </Card>
  );
}


// ============================================================
// Recent Ratings Desktop Table
// ============================================================

function RecentRatingsTable({
  ratings,
}) {
  return (
    <div className="hidden overflow-x-auto md:block">

      <table className="w-full min-w-[700px]">

        <thead>

          <tr className="bg-[#f8fafc]">

            <th className="px-5 py-3 text-left text-[11px] font-bold text-[#475569]">
              #
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-bold text-[#475569]">
              User
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-bold text-[#475569]">
              Rating
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-bold text-[#475569]">
              Date
            </th>

          </tr>

        </thead>


        <tbody>

          {ratings.map((rating, index) => (

            <tr
              key={rating.id}
              className="
                border-b
                border-[#f1f5f9]
                last:border-0
                hover:bg-[#fffafa]
              "
            >

              <td className="px-5 py-3 text-xs text-[#475569]">
                {index + 1}
              </td>


              <td className="px-5 py-3">

                <div className="flex items-center gap-3">

                  <Avatar
                    name={rating.user}
                    size="sm"
                  />

                  <span className="text-xs font-semibold text-[#111827]">
                    {rating.user}
                  </span>

                </div>

              </td>


              <td className="px-5 py-3">

                <StarRating
                  rating={rating.rating}
                />

              </td>


              <td className="px-5 py-3 text-xs text-[#64748b]">
                {rating.date}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// ============================================================
// Recent Ratings Mobile
// ============================================================

function RecentRatingsMobile({
  ratings,
}) {
  return (
    <div className="space-y-3 p-4 md:hidden">

      {ratings.map((rating, index) => (

        <div
          key={rating.id}
          className="
            rounded-lg
            border
            border-[#e5e7eb]
            p-3
          "
        >

          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              <span className="text-xs font-semibold text-[#64748b]">
                {index + 1}
              </span>

              <Avatar
                name={rating.user}
                size="sm"
              />

              <div className="min-w-0">

                <p className="truncate text-xs font-semibold text-[#111827]">
                  {rating.user}
                </p>

                <p className="mt-0.5 text-[10px] text-[#94a3b8]">
                  {rating.date}
                </p>

              </div>

            </div>


            <StarRating
              rating={rating.rating}
            />

          </div>

        </div>

      ))}

    </div>
  );
}
// ============================================================
// Main Dashboard
// ============================================================

export default function Dashboard() {

  const navigate = useNavigate();
  const store = STORE;
  const statsData = {
    averageRating: store.rating,
    totalUsersRated: store.totalUsersRated,
  };
  const totalRatings = store.totalRatings;
  const distribution = RATING_DISTRIBUTION;
  const recentRatings = RECENT_RATINGS;


  const handleViewStore = () => {
    navigate(`/stores/${store.id}`);
  };


  const handleEditStore = () => {
    navigate(`/owner/store/edit`);
  };


  const handleViewRatings = () => {
    navigate("/owner/ratings");
  };


  return (
    <AdminLayout activeItem="Dashboard">

      <div className="mx-auto w-full max-w-[1500px]">

        {/* ==================================================
            Breadcrumb
        ================================================== */}

        <div className="mb-3 flex items-center gap-2 text-[11px] text-[#9ca3af]">

          <span>Home</span>

          <span>/</span>

          <span className="font-medium text-[#6b7280]">
            Dashboard
          </span>

        </div>


        {/* ==================================================
            Page Header
        ================================================== */}

        <div className="mb-5">

          <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
            My Store Dashboard
          </h1>

          <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
            View your store performance and user ratings.
          </p>

        </div>


        {/* ==================================================
            Statistics
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <StatCard
            icon={Star}
            title="Average Rating"
            value={statsData.averageRating}
            description={`${totalRatings} total ratings`}
            iconClass="bg-[#fff7e6] text-[#f59e0b]"
          />

          <StatCard
            icon={Users}
            title="Total Users Rated"
            value={statsData.totalUsersRated}
            description="Unique users"
            iconClass="bg-[#ecfdf3] text-[#16a34a]"
          />

          <StatCard
            icon={FileText}
            title="Total Reviews"
            value={totalRatings}
            description="Total reviews"
            iconClass="bg-[#fce7f3] text-[#e11d48]"
          />

        </div>


        {/* ==================================================
            Store + Distribution
        ================================================== */}

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-5">

          {/* My Store */}

          <div className="xl:col-span-3">

            <MyStoreCard
              store={store}
              onView={handleViewStore}
              onEdit={handleEditStore}
            />

          </div>


          {/* Rating Distribution */}

          <div className="xl:col-span-2">

            <RatingDistribution
              ratings={distribution}
            />

          </div>

        </div>


        {/* ==================================================
            Recent Ratings
        ================================================== */}

        <Card
          className="mt-4 overflow-hidden"
          contentClassName="p-0"
        >

          {/* Header */}

          <div className="flex flex-col gap-3 border-b border-[#f1f5f9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

            <div>

              <h2 className="text-lg font-bold text-[#111827] sm:text-xl">
                Recent Ratings
              </h2>

              <p className="mt-1 text-[11px] text-[#94a3b8]">
                Latest ratings submitted for your store.
              </p>

            </div>


            <Button
              variant="outline"
              size="sm"
              icon={ExternalLink}
              onClick={handleViewRatings}
            >
              View All
            </Button>

          </div>


          {/* Desktop */}

          <RecentRatingsTable
            ratings={recentRatings}
          />


          {/* Mobile */}

          <RecentRatingsMobile
            ratings={recentRatings}
          />

        </Card>

      </div>

    </AdminLayout>
  );
}