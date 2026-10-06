import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Tag,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { api } from "../../services/api";


// ============================================================
// Store data
// ============================================================

const STORES = [
  {
    id: "1",
    name: "Urban Basket",
    category: "Grocery",
    address: "Pune, Maharashtra",
    rating: 4.8,
    ratingsCount: 382,

    // Add image URL here later
    image: "",
  },

  {
    id: "2",
    name: "TechWorld",
    category: "Electronics",
    address: "Mumbai, Maharashtra",
    rating: 4.6,
    ratingsCount: 210,
    image: "",
  },

  {
    id: "3",
    name: "FreshMart",
    category: "Grocery",
    address: "Bangalore, Karnataka",
    rating: 4.4,
    ratingsCount: 189,
    image: "",
  },

  {
    id: "4",
    name: "City Fashion",
    category: "Fashion",
    address: "Chennai, Tamil Nadu",
    rating: 4.2,
    ratingsCount: 176,
    image: "",
  },

  {
    id: "5",
    name: "Home Living",
    category: "Home & Lifestyle",
    address: "Delhi, Delhi",
    rating: 4.1,
    ratingsCount: 158,
    image: "",
  },

  {
    id: "6",
    name: "MegaStore",
    category: "General",
    address: "Hyderabad, Telangana",
    rating: 3.9,
    ratingsCount: 142,
    image: "",
  },

  {
    id: "7",
    name: "SmartShop",
    category: "Lifestyle",
    address: "Ahmedabad, Gujarat",
    rating: 3.8,
    ratingsCount: 134,
    image: "",
  },

  {
    id: "8",
    name: "Fashion Hub",
    category: "Fashion",
    address: "Kolkata, West Bengal",
    rating: 3.7,
    ratingsCount: 120,
    image: "",
  },

  {
    id: "9",
    name: "Daily Needs",
    category: "Grocery",
    address: "Jaipur, Rajasthan",
    rating: 3.6,
    ratingsCount: 98,
    image: "",
  },

  {
    id: "10",
    name: "Style Point",
    category: "Fashion",
    address: "Surat, Gujarat",
    rating: 3.5,
    ratingsCount: 86,
    image: "",
  },

  {
    id: "11",
    name: "Super Mart",
    category: "Grocery",
    address: "Nagpur, Maharashtra",
    rating: 4.3,
    ratingsCount: 112,
    image: "",
  },

  {
    id: "12",
    name: "Digital World",
    category: "Electronics",
    address: "Noida, Uttar Pradesh",
    rating: 4.0,
    ratingsCount: 96,
    image: "",
  },
];


// ============================================================
// Rating component
// ============================================================

function StoreRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1.5">

      <div className="flex items-center gap-[1px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            strokeWidth={1.5}
            className={
              star <= Math.floor(rating)
                ? "fill-[#f59e0b] text-[#f59e0b]"
                : star - rating < 1
                ? "fill-[#f59e0b] text-[#f59e0b]"
                : "text-[#d1d5db]"
            }
          />
        ))}
      </div>

      <span className="text-xs font-bold text-[#374151]">
        {rating.toFixed(1)}
      </span>

      <span className="text-[11px] text-[#6b7280]">
        ({count} ratings)
      </span>

    </div>
  );
}


// ============================================================
// Store image area
// ============================================================

function StoreImage({ store }) {
  return (
    <div
      className="
        relative
        h-[135px]
        w-full
        overflow-hidden
        bg-[#f3f4f6]
        sm:h-[145px]
        lg:h-[135px]
      "
    >

      {store.image ? (
        <img
          src={store.image}
          alt={store.name}
          className="h-full w-full object-cover"
        />
      ) : (
        /*
         * IMAGE PLACEHOLDER
         *
         * Exact space reserved for the store image.
         *
         * Later simply provide:
         *
         * image: "/images/urban-basket.jpg"
         *
         * or:
         *
         * image: store.image
         *
         * The card dimensions will remain unchanged.
         */
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
              <Tag
                size={17}
                className="text-[#cbd5e1]"
              />
            </div>

            <span className="text-[10px] font-medium text-[#9ca3af]">
              Store Image
            </span>
          </div>
        </div>
      )}

    </div>
  );
}


// ============================================================
// Store Card
// ============================================================

function StoreCard({ store, onRate }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        border
        border-[#e5e7eb]
        bg-white
        shadow-sm
        transition
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-md
      "
    >

      {/* ================================================
          IMAGE
      ================================================= */}

      <StoreImage store={store} />


      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="p-3">

        {/* Store name */}

        <h2 className="truncate text-[15px] font-bold leading-5 text-[#111827]">
          {store.name}
        </h2>


        {/* Category */}

        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#6b7280]">

          <Tag
            size={12}
            strokeWidth={2}
          />

          <span className="truncate">
            {store.category}
          </span>

        </div>


        {/* Location */}

        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6b7280]">

          <MapPin
            size={12}
            strokeWidth={2}
          />

          <span className="truncate">
            {store.address}
          </span>

        </div>


        {/* Rating */}

        <div className="mt-2.5">
          <StoreRating
            rating={store.rating}
            count={store.ratingsCount}
          />
        </div>


        {/* Rate button */}

        <button
          type="button"
          onClick={() => onRate(store)}
          className="
            mt-3
            h-9
            w-full
            rounded-md
            bg-[#dc2626]
            text-xs
            font-bold
            text-white
            transition
            hover:bg-[#b91c1c]
            active:scale-[0.99]
          "
        >
          {store.userRating ? "Modify Rating" : "Rate Store"}
        </button>

      </div>

    </div>
  );
}


// ============================================================
// Main Page
// ============================================================

export default function Stores() {
  const [stores, setStores] = useState(STORES);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await api.get("/stores?limit=100&sortBy=name&sortOrder=asc");
        if (active) setStores(result.data || []);
      } catch (error) {
        if (active) setLoadError(error.message || "Failed to load stores");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);


  const navigate = useNavigate();

  const [search, setSearch] = useState("");


  // ========================================================
  // Search
  // ========================================================

  const filteredStores = useMemo(() => {

    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return stores;
    }

    return stores.filter((store) => {

      return (
        store.name
          .toLowerCase()
          .includes(value) ||

        store.category
          .toLowerCase()
          .includes(value) ||

        store.address
          .toLowerCase()
          .includes(value)
      );

    });

  }, [search]);


  // ========================================================
  // Rate store
  // ========================================================

  const handleRateStore = async (store) => {
    const value = window.prompt(
      `Enter your rating for ${store.name} (1-5):`,
      store.userRating || ""
    );
    if (value === null) return;
    const rating = Number(value);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      window.alert("Please enter a rating from 1 to 5.");
      return;
    }
    try {
      await api.put(`/stores/${store.id}/rating`, { value: rating });
      const refreshed = await api.get("/stores?limit=100&sortBy=name&sortOrder=asc");
      setStores(refreshed.data || []);
    } catch (error) {
      window.alert(error.message || "Unable to submit rating");
    }
  };


  if (loading) return <div className="p-8 text-sm text-[#6b7280]">Loading stores...</div>;
  if (loadError) return <div className="p-8 text-sm text-[#dc2626]">{loadError}</div>;

  return (
    <AdminLayout activeItem="Stores">

      <div className="mx-auto w-full max-w-[1500px]">

        {/* =================================================
            Breadcrumb
        ================================================= */}

        <div className="mb-3 flex items-center gap-2 text-[11px] text-[#9ca3af]">

          <span>
            Home
          </span>

          <span>
            /
          </span>

          <span>
            Stores
          </span>

          <span>
            /
          </span>

          <span className="font-medium text-[#6b7280]">
            Store Listing
          </span>

        </div>


        {/* =================================================
            Page Header
        ================================================= */}

        <div className="mb-5">

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-[#111827]
              sm:text-[28px]
            "
          >
            Store Listing
          </h1>

          <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
            Browse all available stores and view their ratings.
          </p>

        </div>


        {/* =================================================
            Main Container
        ================================================= */}

        <div
          className="
            rounded-xl
            border
            border-[#e5e7eb]
            bg-white
            p-3
            shadow-sm
            sm:p-4
            lg:p-5
          "
        >

          {/* =================================================
              Search
          ================================================= */}

          <div className="relative mb-5">

            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-[#64748b]
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by store name or address..."
              className="
                h-11
                w-full
                rounded-lg
                border
                border-[#dfe3e8]
                bg-white
                pl-10
                pr-4
                text-xs
                text-[#111827]
                outline-none
                transition
                placeholder:text-[#9ca3af]
                focus:border-[#dc2626]
                focus:ring-2
                focus:ring-[#dc2626]/10
                sm:text-sm
              "
            />

          </div>


          {/* =================================================
              Store Grid
          ================================================= */}

          {filteredStores.length > 0 ? (

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >

              {filteredStores.map((store) => (

                <StoreCard
                  key={store.id}
                  store={store}
                  onRate={handleRateStore}
                />

              ))}

            </div>

          ) : (

            /* =================================================
               Empty State
            ================================================= */

            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f2]">
                <Search
                  size={20}
                  className="text-[#dc2626]"
                />
              </div>

              <h2 className="mt-3 text-sm font-bold text-[#111827]">
                No stores found
              </h2>

              <p className="mt-1 max-w-sm text-xs text-[#6b7280]">
                We couldn't find any stores matching your search.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  mt-4
                  rounded-md
                  border
                  border-[#e5e7eb]
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#374151]
                  hover:bg-[#f9fafb]
                "
              >
                Clear Search
              </button>

            </div>

          )}

        </div>

      </div>

    </AdminLayout>
  );
}