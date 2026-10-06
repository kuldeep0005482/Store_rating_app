import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Star,
  Store,
  Users,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Trophy,
  ArrowUpRight,
} from "lucide-react";

import { AdminLayout } from "../../components/layout";
import {
  RatingOverviewChart,
  RatingDistributionChart,
} from "../../components/charts";

import { RatingStars } from "../../components/rating";
import { api } from "../../services/api";

// If your project has these components, keep these imports.
// Otherwise you can remove them and use the inline versions below.
import { Avatar, Badge, Button } from "../../components/ui";


/* =========================================================
   DATA
========================================================= */

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12%",
    text: "from last month",
    icon: Users,
    type: "users",
  },
  {
    title: "Total Stores",
    value: "184",
    change: "+8%",
    text: "from last month",
    icon: Store,
    type: "stores",
  },
  {
    title: "Total Ratings",
    value: "8,426",
    change: "+18%",
    text: "from last month",
    icon: Star,
    type: "ratings",
  },
];

const recentRatings = [
  {
    id: 1,
    user: "Rohan Mehta",
    initials: "RM",
    userColor: "bg-[#fee2e2] text-[#dc2626]",
    store: "Urban Basket",
    category: "Grocery",
    rating: 5,
    date: "22 Jul 2024, 10:24 AM",
    status: "Approved",
    storeColor: "bg-[#166534]",
  },
  {
    id: 2,
    user: "Priya Sharma",
    initials: "PS",
    userColor: "bg-[#fce7f3] text-[#be185d]",
    store: "TechWorld",
    category: "Electronics",
    rating: 4,
    date: "22 Jul 2024, 09:15 AM",
    status: "Approved",
    storeColor: "bg-[#64748b]",
  },
  {
    id: 3,
    user: "Amit Desai",
    initials: "AD",
    userColor: "bg-[#fee2e2] text-[#dc2626]",
    store: "FreshMart",
    category: "Grocery",
    rating: 5,
    date: "21 Jul 2024, 08:42 PM",
    status: "Approved",
    storeColor: "bg-[#16a34a]",
  },
  {
    id: 4,
    user: "Sneha Patil",
    initials: "SP",
    userColor: "bg-[#fce7f3] text-[#be185d]",
    store: "City Fashion",
    category: "Fashion",
    rating: 3,
    date: "21 Jul 2024, 06:17 PM",
    status: "Approved",
    storeColor: "bg-[#111827]",
  },
  {
    id: 5,
    user: "Vikram Singh",
    initials: "VS",
    userColor: "bg-[#dbeafe] text-[#2563eb]",
    store: "Home Living",
    category: "Home & Lifestyle",
    rating: 4,
    date: "21 Jul 2024, 04:33 PM",
    status: "Approved",
    storeColor: "bg-[#ca8a04]",
  },
];

const topStores = [
  {
    name: "Urban Basket",
    category: "Grocery",
    rating: 4.8,
    reviews: 482,
    logo: "U",
    color: "bg-[#166534]",
  },
  {
    name: "TechWorld",
    category: "Electronics",
    rating: 4.6,
    reviews: 320,
    logo: "T",
    color: "bg-[#475569]",
  },
  {
    name: "FreshMart",
    category: "Grocery",
    rating: 4.4,
    reviews: 289,
    logo: "F",
    color: "bg-[#16a34a]",
  },
  {
    name: "City Fashion",
    category: "Fashion",
    rating: 4.2,
    reviews: 276,
    logo: "A",
    color: "bg-[#111827]",
  },
];


/* =========================================================
   STAT CARD
========================================================= */

function DashboardStatCard({
  title,
  value,
  change,
  text,
  icon: Icon,
  type,
  onClick,
}) {
  const iconStyles = {
    users: "bg-[#fff1f2] text-[#dc2626]",
    stores: "bg-[#fff7ed] text-[#f59e0b]",
    ratings: "bg-[#fff1f2] text-[#dc2626]",
  };

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border border-[#e5e7eb]
        bg-white
        p-4
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]
      "
    >
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
            ${iconStyles[type]}
          `}
        >
          <Icon size={25} strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-[#6b7280]">
            {title}
          </p>

          <p className="mt-0.5 text-[25px] font-bold leading-none tracking-tight text-[#111827]">
            {value}
          </p>

          <div className="mt-1 flex items-center gap-1 text-[10px]">
            <ArrowUpRight
              size={12}
              strokeWidth={2.5}
              className="text-[#16a34a]"
            />

            <span className="font-semibold text-[#16a34a]">
              {change}
            </span>

            <span className="text-[#6b7280]">
              {text}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <button
          onClick={onClick}
          aria-label={`Open ${title}`}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-[#f8fafc]
            text-[#6b7280]
            transition
            group-hover:bg-[#fff1f2]
            group-hover:text-[#dc2626]
          "
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}


/* =========================================================
   TOP RATED STORES
========================================================= */

function TopRatedStores({ onViewAll, onStoreClick }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff7ed] text-[#f59e0b]">
            <Trophy size={15} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827]">
              Top Rated Stores
            </h3>

            <p className="text-[9px] text-[#94a3b8]">
              Highest rated stores
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="
            rounded-md border border-[#e5e7eb] px-3 py-1.5 text-[10px]
            font-medium text-[#374151] transition hover:border-[#dc2626] hover:text-[#dc2626]
          "
        >View All</button>
      </div>

      {/* Stores */}
      <div>
        {topStores.map((store, index) => (
          <div
            key={store.name}
            className="
              flex
              items-center
              gap-3
              border-b
              border-[#f1f5f9]
              px-4
              py-3
              transition
              last:border-b-0
              hover:bg-[#fffafa]
            "
          >
            {/* Logo */}
            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-sm
                font-bold
                text-white
                ${store.color}
              `}
            >
              {store.logo}
            </div>

            {/* Name */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#111827]">
                {store.name}
              </p>

              <p className="mt-0.5 text-[9px] text-[#94a3b8]">
                {store.category}
              </p>
            </div>

            {/* Rating */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Star
                  size={13}
                  fill="#f59e0b"
                  className="text-[#f59e0b]"
                />

                <span className="text-xs font-bold text-[#374151]">
                  {store.rating}
                </span>
              </div>

              <p className="mt-0.5 text-[9px] text-[#94a3b8]">
                ({store.reviews} reviews)
              </p>
            </div>

            <button
              onClick={() => onStoreClick?.(store)}
              className="
                flex h-7 w-7 items-center justify-center rounded-full bg-[#f8fafc]
                text-[#64748b] transition hover:bg-[#fff1f2] hover:text-[#dc2626]
              "
              aria-label={`Open ${store.name}`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


/* =========================================================
   RECENT RATINGS
========================================================= */

function RecentRatings({ onViewAll }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1f2] text-[#dc2626]">
            <Star size={14} fill="currentColor" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827]">
              Recent Ratings
            </h3>

            <p className="text-[9px] text-[#94a3b8]">
              Latest ratings submitted by users
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="
            rounded-md border border-[#e5e7eb] px-3 py-1.5 text-[10px]
            font-medium text-[#374151] transition hover:border-[#dc2626] hover:text-[#dc2626]
          "
        >View All</button>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-[#f1f5f9] bg-[#fafafa]">
              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                #
              </th>

              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                User
              </th>

              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                Store
              </th>

              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                Rating
              </th>

              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                Date
              </th>

              <th className="px-3 py-2 text-left text-[9px] font-bold text-[#64748b]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {recentRatings.map((item) => (
              <tr
                key={item.id}
                className="
                  border-b
                  border-[#f1f5f9]
                  transition
                  last:border-b-0
                  hover:bg-[#fffafa]
                "
              >
                <td className="px-3 py-2.5 text-[10px] text-[#94a3b8]">
                  {item.id}
                </td>

                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[9px]
                        font-bold
                        ${item.userColor}
                      `}
                    >
                      {item.initials}
                    </div>

                    <span className="whitespace-nowrap text-[10px] font-medium text-[#374151]">
                      {item.user}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        text-[9px]
                        font-bold
                        text-white
                        ${item.storeColor}
                      `}
                    >
                      {item.store.charAt(0)}
                    </div>

                    <div>
                      <p className="text-[10px] font-medium text-[#374151]">
                        {item.store}
                      </p>

                      <p className="text-[8px] text-[#94a3b8]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <RatingStars
                      value={item.rating}
                      size={11}
                    />

                    <span className="text-[10px] font-medium text-[#374151]">
                      {item.rating}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-2.5 text-[9px] text-[#64748b]">
                  {item.date}
                </td>

                <td className="px-3 py-2.5">
                  <span
                    className="
                      inline-flex
                      rounded-md
                      bg-[#dcfce7]
                      px-2
                      py-1
                      text-[8px]
                      font-semibold
                      text-[#16a34a]
                    "
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-[#f1f5f9] md:hidden">
        {recentRatings.map((item) => (
          <div key={item.id} className="p-3">
            <div className="flex items-center gap-3">
              <div
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  font-bold
                  ${item.userColor}
                `}
              >
                {item.initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">
                  {item.user}
                </p>

                <p className="truncate text-[9px] text-[#94a3b8]">
                  {item.store}
                </p>
              </div>

              <span
                className="
                  rounded-md
                  bg-[#dcfce7]
                  px-2
                  py-1
                  text-[8px]
                  font-semibold
                  text-[#16a34a]
                "
              >
                Approved
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <RatingStars value={item.rating} size={12} />

              <span className="text-[9px] text-[#94a3b8]">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState(stats);
  const [dashboardRecentRatings, setDashboardRecentRatings] = useState(recentRatings);
  const [dashboardTopStores, setDashboardTopStores] = useState(topStores);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [ratingOverview, setRatingOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await api.get("/admin/dashboard");
        const data = result.data || {};
        if (!active) return;

        setDashboardStats([
          {
            ...stats[0],
            value: Number(data.stats?.totalUsers ?? data.users ?? 0).toLocaleString(),
          },
          {
            ...stats[1],
            value: Number(data.stats?.totalStores ?? data.stores ?? 0).toLocaleString(),
          },
          {
            ...stats[2],
            value: Number(data.stats?.totalRatings ?? data.ratings ?? 0).toLocaleString(),
          },
        ]);

        setDashboardRecentRatings(
          (data.recentRatings || []).map((item, index) => ({
            ...item,
            user: item.user?.name || "Unknown User",
            initials: (item.user?.name || "U").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(),
            store: item.store?.name || "Unknown Store",
            category: item.store?.category || "",
            rating: item.rating ?? item.value ?? 0,
            date: item?.createdAt || item?.date
              ? new Date(item.createdAt || item.date).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit",
              })
              : "—",
            status: "Approved",
          }))
        );

        setDashboardTopStores((data.topStores || []).map((store) => ({
          name: store.name,
          category: store.category || "",
          rating: Number(store.averageRating ?? store.rating ?? 0),
          reviews: Number(store.ratingsCount ?? store.totalRatings ?? 0),
          logo: (store.name || "S").charAt(0),
          color: "bg-[#475569]",
        })));

        setRatingDistribution(
          (data.ratingDistribution || []).map((item) => ({
            name: `${item.rating} ${item.rating === 1 ? "Star" : "Stars"}`,
            value: item.count,
          }))
        );
        setRatingOverview(
          (data.ratingOverview || []).map((item) => ({
            month: item.month,
            ratings: Number(item.count || item.ratings || 0),
          }))
        );
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <AdminLayout activeItem="Dashboard">
      <div className="mx-auto max-w-[1600px]">

        {/* ================================================
            TOP AREA
        ================================================= */}

        <div
          className="
            relative
            mb-5
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-[#991b1b]
            via-[#dc2626]
            to-[#f97316]
            px-5
            py-6
            text-white
            shadow-lg
            sm:px-7
          "
        >
          {/* Decorative waves */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            <div
              className="
                absolute
                -right-10
                top-10
                h-24
                w-[55%]
                rounded-[50%]
                border-t
                border-white/50
                rotate-[-4deg]
              "
            />

            <div
              className="
                absolute
                -right-20
                top-20
                h-24
                w-[55%]
                rounded-[50%]
                border-t
                border-white/30
                rotate-[-5deg]
              "
            />
          </div>

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] text-red-100">
                <span>⌂</span>
                <span>/</span>
                <span>Dashboard</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Good morning, Admin <span>👋</span>
              </h1>

              <p className="mt-1 text-xs text-red-100 sm:text-sm">
                Here's an overview of your store rating platform.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/10
                px-4
                py-3
                backdrop-blur-sm
              "
            >
              <CalendarDays size={20} />

              <div>
                <p className="text-[9px] text-red-100">
                  Today
                </p>

                <p className="text-xs font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* ================================================
            STAT CARDS
        ================================================= */}

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          {dashboardStats.map((stat) => (
            <DashboardStatCard
              key={stat.title}
              {...stat}
              onClick={() =>
                navigate(
                  stat.type === "users"
                    ? "/admin/users"
                    : stat.type === "stores"
                    ? "/admin/stores"
                    : "/admin/dashboard"
                )
              }
            />
          ))}
        </div>


        {/* ================================================
            CHARTS
        ================================================= */}

        <div className="mb-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">

          {/* Rating Overview */}
          <div className="min-w-0">
            <RatingOverviewChart data={ratingOverview.length ? ratingOverview : undefined} />
          </div>

          {/* Rating Distribution */}
          <div className="min-w-0">
            <RatingDistributionChart data={ratingDistribution.length ? ratingDistribution : undefined} />
          </div>

        </div>


        {/* ================================================
            RECENT RATINGS + TOP STORES
        ================================================= */}

        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">

          <div className="min-w-0">
            <RecentRatings onViewAll={() => navigate("/admin/ratings")} />
          </div>

          <div className="min-w-0">
            <TopRatedStores onViewAll={() => navigate("/admin/stores")} onStoreClick={(store) => store.id && navigate(`/admin/stores/${store.id}`)} />
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}