import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, RotateCcw, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { api } from "../../services/api";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Avatar from "../../components/ui/Avatar";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";





// ---------------------------------------------------------
// Rating component
// ---------------------------------------------------------

function Rating({ value, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-[13px] leading-none ${
              star <= Math.round(value)
                ? "text-[#f59e0b]"
                : "text-[#d1d5db]"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <span className="text-xs font-semibold text-[#374151]">
        {value.toFixed(1)}
      </span>

      <span className="text-[10px] text-[#9ca3af]">
        ({count})
      </span>
    </div>
  );
}


// ---------------------------------------------------------
// Store Actions
// ---------------------------------------------------------

function StoreActions({
  store,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        icon={Eye}
        className="h-8 px-3 text-[11px]"
        onClick={() => onView(store)}
      >
        View
      </Button>

      <Dropdown
        iconOnly
        items={[
          {
            label: "View Store",
            icon: Eye,
            onClick: () => onView(store),
          },
          {
            label: "Edit Store",
            icon: Pencil,
            onClick: () => onEdit(store),
          },
          {
            label: "Delete Store",
            icon: Trash2,
            danger: true,
            onClick: () => onDelete(store),
          },
        ]}
      />
    </div>
  );
}


// ---------------------------------------------------------
// Desktop table
// ---------------------------------------------------------

function DesktopStoreTable({
  stores,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[850px] border-collapse">

        <thead>
          <tr className="border-b border-[#e5e7eb] bg-[#fafafa]">

            <th className="w-12 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              #
            </th>

            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              Store Name
            </th>

            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              Email
            </th>

            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              Address
            </th>

            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              Rating
            </th>

            <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
              Actions
            </th>

          </tr>
        </thead>


        <tbody>
          {stores.map((store, index) => (
            <tr
              key={store.id}
              className="
                border-b
                border-[#f1f5f9]
                transition
                hover:bg-[#fffafa]
              "
            >

              {/* Number */}
              <td className="px-4 py-3 text-xs text-[#6b7280]">
                {index + 1}
              </td>


              {/* Store name */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">

                  <Avatar
                    name={store.name}
                    size="sm"
                  />

                  <span className="text-xs font-semibold text-[#111827]">
                    {store.name}
                  </span>

                </div>
              </td>


              {/* Email */}
              <td className="px-4 py-3 text-xs text-[#6b7280]">
                {store.email}
              </td>


              {/* Address */}
              <td className="px-4 py-3 text-xs text-[#6b7280]">
                {store.address}
              </td>


              {/* Rating */}
              <td className="px-4 py-3">
                <Rating
                  value={store.rating}
                  count={store.ratingsCount}
                />
              </td>


              {/* Actions */}
              <td className="px-4 py-3">
                <StoreActions
                  store={store}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}


// ---------------------------------------------------------
// Mobile cards
// ---------------------------------------------------------

function MobileStoreList({
  stores,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-3 md:hidden">

      {stores.map((store, index) => (
        <div
          key={store.id}
          className="
            rounded-xl
            border
            border-[#e5e7eb]
            bg-white
            p-4
            shadow-sm
          "
        >

          {/* Header */}
          <div className="flex items-start justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              <Avatar
                name={store.name}
                size="md"
              />

              <div className="min-w-0">

                <h3 className="truncate text-sm font-bold text-[#111827]">
                  {store.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-[#6b7280]">
                  {store.email}
                </p>

              </div>

            </div>


            <Dropdown
              iconOnly
              items={[
                {
                  label: "View Store",
                  icon: Eye,
                  onClick: () => onView(store),
                },
                {
                  label: "Edit Store",
                  icon: Pencil,
                  onClick: () => onEdit(store),
                },
                {
                  label: "Delete Store",
                  icon: Trash2,
                  danger: true,
                  onClick: () => onDelete(store),
                },
              ]}
            />

          </div>


          {/* Information */}
          <div className="mt-4 border-t border-[#f1f5f9] pt-3">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                Address
              </p>

              <p className="mt-1 text-xs text-[#4b5563]">
                {store.address}
              </p>
            </div>


            <div className="mt-3">

              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                Rating
              </p>

              <Rating
                value={store.rating}
                count={store.ratingsCount}
              />

            </div>


            <div className="mt-4 flex justify-end">

              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => onView(store)}
              >
                View Store
              </Button>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}


// ---------------------------------------------------------
// Main Page
// ---------------------------------------------------------

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await api.get("/admin/stores?limit=100&sortBy=name&sortOrder=asc");
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


  // Search
  const [search, setSearch] = useState("");


  // Filters
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  // Pagination
  const [page, setPage] = useState(1);

  const STORES_PER_PAGE = 10;


  // -------------------------------------------------------
  // Filter stores
  // -------------------------------------------------------

  const filteredStores = useMemo(() => {

    const searchValue = search
      .toLowerCase()
      .trim();

    return stores.filter((store) => {

      const matchesSearch =
        !searchValue ||
        store.name
          .toLowerCase()
          .includes(searchValue) ||
        store.email
          .toLowerCase()
          .includes(searchValue) ||
        store.address
          .toLowerCase()
          .includes(searchValue);


      const matchesName =
        !storeName ||
        store.name
          .toLowerCase()
          .includes(storeName.toLowerCase());


      const matchesEmail =
        !email ||
        store.email
          .toLowerCase()
          .includes(email.toLowerCase());


      const matchesAddress =
        !address ||
        store.address
          .toLowerCase()
          .includes(address.toLowerCase());


      return (
        matchesSearch &&
        matchesName &&
        matchesEmail &&
        matchesAddress
      );
    });

  }, [
    stores,
    search,
    storeName,
    email,
    address,
  ]);


  // -------------------------------------------------------
  // Pagination
  // -------------------------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStores.length /
        STORES_PER_PAGE
    )
  );


  const visibleStores =
    filteredStores.slice(
      (page - 1) * STORES_PER_PAGE,
      page * STORES_PER_PAGE
    );


  // -------------------------------------------------------
  // Reset
  // -------------------------------------------------------

  const resetFilters = () => {

    setSearch("");
    setStoreName("");
    setEmail("");
    setAddress("");
    setPage(1);

  };


  // -------------------------------------------------------
  // Actions
  // -------------------------------------------------------

  const handleView = (store) => {
    navigate(`/admin/stores/${store.id}`);
  };


  const handleEdit = (store) => {
    navigate(`/admin/stores/${store.id}/edit`);
  };


  const handleDelete = async (store) => {
    if (!window.confirm(`Delete ${store.name}?`)) return;
    try {
      await api.delete(`/admin/stores/${store.id}`);
      setStores((current) => current.filter((item) => item.id !== store.id));
    } catch (error) {
      window.alert(error.message || "Unable to delete store");
    }
  };


  const handleAddStore = () => {
    navigate("/admin/stores/new");
  };


  if (loading) return <div className="p-8 text-sm text-[#6b7280]">Loading stores...</div>;
  if (loadError) return <div className="p-8 text-sm text-[#dc2626]">{loadError}</div>;

  return (
    <AdminLayout activeItem="Stores">

      <div className="mx-auto w-full max-w-[1500px]">

        {/* --------------------------------------------- */}
        {/* Breadcrumb */}
        {/* --------------------------------------------- */}

        <div className="mb-3 flex items-center gap-2 text-[11px] text-[#9ca3af]">

          <span>Home</span>

          <span>/</span>

          <span className="font-medium text-[#6b7280]">
            Stores
          </span>

        </div>


        {/* --------------------------------------------- */}
        {/* Page Header */}
        {/* --------------------------------------------- */}

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
              Stores
            </h1>

            <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
              Manage all registered stores.
            </p>

          </div>


          <Button
            size="sm"
            icon={Plus}
            className="w-full sm:w-auto"
            onClick={handleAddStore}
          >
            Add Store
          </Button>

        </div>


        {/* --------------------------------------------- */}
        {/* Main Card */}
        {/* --------------------------------------------- */}

        <Card
          className="overflow-hidden"
          contentClassName="p-0"
        >

          {/* ------------------------------------------- */}
          {/* Search + Filters */}
          {/* ------------------------------------------- */}

          <div className="border-b border-[#f1f5f9] bg-white p-4 sm:p-5">

            {/* Search */}
            <div className="relative">

              <Search
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#9ca3af]
                "
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by store name, email or address..."
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-[#e5e7eb]
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


            {/* Desktop filters */}
            <div className="mt-4 hidden grid-cols-12 gap-3 lg:grid">

              <Input
                label="Store Name"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="col-span-3"
              />


              <Input
                label="Email"
                placeholder="Enter store email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />


              <Input
                label="Address"
                placeholder="Enter store address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
              />


              <div className="col-span-3 flex items-end gap-2">

                <Button
                  size="sm"
                  icon={Filter}
                  className="flex-1"
                  onClick={() => setPage(1)}
                >
                  Apply Filters
                </Button>


                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  className="px-3"
                  onClick={resetFilters}
                >
                  <span className="hidden xl:inline">
                    Reset
                  </span>
                </Button>

              </div>

            </div>


            {/* Mobile / tablet filters */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">

              <Input
                label="Store Name"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />


              <Input
                label="Email"
                placeholder="Enter store email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


              <Input
                label="Address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />


              <div className="flex items-end gap-2 sm:col-span-2">

                <Button
                  size="sm"
                  icon={Filter}
                  className="flex-1"
                  onClick={() => setPage(1)}
                >
                  Apply Filters
                </Button>


                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  onClick={resetFilters}
                >
                  Reset
                </Button>

              </div>

            </div>

          </div>


          {/* ------------------------------------------- */}
          {/* Results header */}
          {/* ------------------------------------------- */}

          <div className="flex flex-col gap-3 border-b border-[#f1f5f9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">

            <div className="flex flex-wrap items-center gap-2">

              <span className="text-sm font-bold text-[#111827]">
                {filteredStores.length} stores
              </span>


              <span className="rounded-md bg-[#eff6ff] px-2 py-1 text-[10px] font-semibold text-[#2563eb]">
                Sort: Name (A-Z)
              </span>

            </div>

          </div>


          {/* ------------------------------------------- */}
          {/* Desktop table */}
          {/* ------------------------------------------- */}

          <DesktopStoreTable
            stores={visibleStores}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />


          {/* ------------------------------------------- */}
          {/* Mobile cards */}
          {/* ------------------------------------------- */}

          <div className="p-4 md:hidden">

            <MobileStoreList
              stores={visibleStores}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>


          {/* ------------------------------------------- */}
          {/* Empty state */}
          {/* ------------------------------------------- */}

          {visibleStores.length === 0 && (

            <div className="px-5 py-16 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f2]">

                <Search
                  size={20}
                  className="text-[#dc2626]"
                />

              </div>


              <h3 className="mt-3 text-sm font-bold text-[#111827]">
                No stores found
              </h3>


              <p className="mt-1 text-xs text-[#6b7280]">
                Try changing your search or filter criteria.
              </p>


              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={resetFilters}
              >
                Clear Filters
              </Button>

            </div>

          )}


          {/* ------------------------------------------- */}
          {/* Pagination */}
          {/* ------------------------------------------- */}

          {visibleStores.length > 0 && (

            <div className="border-t border-[#f1f5f9] px-4 py-4 sm:px-5">

              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />


              <p className="mt-3 text-center text-[10px] text-[#9ca3af]">

                Showing{" "}

                <span className="font-semibold text-[#6b7280]">
                  {(page - 1) * STORES_PER_PAGE + 1}
                </span>

                {" – "}

                <span className="font-semibold text-[#6b7280]">
                  {Math.min(
                    page * STORES_PER_PAGE,
                    filteredStores.length
                  )}
                </span>

                {" of "}

                <span className="font-semibold text-[#6b7280]">
                  {filteredStores.length + 172}
                </span>

                {" stores"}

              </p>

            </div>

          )}

        </Card>

      </div>

    </AdminLayout>
  );
}