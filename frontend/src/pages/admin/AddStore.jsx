import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { api } from "../../services/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  website: "",
  ownerId: "",
};

const initialErrors = {};

export default function AddStore() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // --------------------------------------------------
  // Fetch store owners
  // --------------------------------------------------

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoadingOwners(true);

        const result = await api.get("/admin/users?role=STORE_OWNER&limit=100&sortBy=name&sortOrder=asc");
        setOwners(result.data || []);
      } catch (error) {
        console.error("Failed to fetch store owners:", error);
      } finally {
        setLoadingOwners(false);
      }
    };

    fetchOwners();
  }, []);

  // --------------------------------------------------
  // Handle input
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  // --------------------------------------------------
  // Validation
  // --------------------------------------------------

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Store name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Store name must be at least 2 characters.";
    } else if (form.name.trim().length > 100) {
      newErrors.name = "Store name cannot exceed 100 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (form.phone.trim()) {
      const phone = form.phone.replace(/\s+/g, "");

      if (!/^\+?[0-9]{10,15}$/.test(phone)) {
        newErrors.phone = "Enter a valid phone number.";
      }
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (form.address.length > 400) {
      newErrors.address =
        "Address cannot exceed 400 characters.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    if (form.website.trim()) {
      try {
        new URL(form.website);
      } catch {
        newErrors.website =
          "Enter a valid website URL.";
      }
    }

    if (!form.ownerId) {
      newErrors.ownerId =
        "Please select a store owner.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/admin/stores", {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        ownerId: Number(form.ownerId),
      });

      navigate("/admin/stores");
    } catch (error) {
      console.error(
        "Failed to create store:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/stores");
  };

  return (
    <AdminLayout activeItem="Stores">
      <div className="mx-auto w-full max-w-[1200px]">

        {/* ============================================
            Breadcrumb
        ============================================ */}

        <div className="mb-4 flex items-center gap-2 text-[11px] text-[#9ca3af]">
          <button
            type="button"
            onClick={() => navigate("/admin/stores")}
            className="transition hover:text-[#dc2626]"
          >
            Stores
          </button>

          <span>/</span>

          <span className="text-[#6b7280]">
            Add Store
          </span>
        </div>

        {/* ============================================
            Page Header
        ============================================ */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
              Add New Store
            </h1>

            <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
              Create a new store and assign an owner.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="
              inline-flex
              h-9
              w-fit
              items-center
              gap-2
              rounded-lg
              border
              border-[#e5e7eb]
              bg-white
              px-3
              text-xs
              font-semibold
              text-[#374151]
              shadow-sm
              transition
              hover:bg-[#f9fafb]
            "
          >
            <ArrowLeft size={14} />
            Back to Stores
          </button>
        </div>

        {/* ============================================
            Form Card
        ============================================ */}

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">

            {/* ========================================
                Store Information
            ======================================== */}

            <section className="p-4 sm:p-6 lg:p-7">

              <div className="mb-5 flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1f2]">
                  <Store
                    size={18}
                    className="text-[#dc2626]"
                  />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#111827]">
                    Store Information
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                    Enter the basic information for the store.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">

                {/* Store Name */}
                <Field
                  label="Store Name"
                  required
                  error={errors.name}
                  className="md:col-span-2"
                >
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter store name (e.g., Urban Basket)"
                    maxLength={100}
                    className={inputClass(errors.name)}
                  />
                </Field>

                {/* Email */}
                <Field
                  label="Email"
                  required
                  error={errors.email}
                >
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter store email address"
                    className={inputClass(errors.email)}
                  />
                </Field>

                {/* Phone */}
                <Field
                  label="Phone Number"
                  error={errors.phone}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number (e.g., +91 9876543210)"
                    className={inputClass(errors.phone)}
                  />
                </Field>

                {/* Address */}
                <Field
                  label="Address"
                  required
                  error={errors.address}
                  className="md:col-span-2"
                >
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter store address (max 400 characters)"
                    maxLength={400}
                    rows={4}
                    className={`${inputClass(
                      errors.address
                    )} min-h-[105px] resize-y py-3`}
                  />
                </Field>

                {/* City */}
                <Field
                  label="City"
                  required
                  error={errors.city}
                >
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={inputClass(errors.city)}
                  />
                </Field>

                {/* State */}
                <Field
                  label="State"
                  required
                  error={errors.state}
                >
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={inputClass(errors.state)}
                  />
                </Field>

                {/* Pincode */}
                <Field
                  label="Pincode"
                  required
                  error={errors.pincode}
                >
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode (e.g., 411001)"
                    maxLength={6}
                    inputMode="numeric"
                    className={inputClass(errors.pincode)}
                  />
                </Field>

                {/* Website */}
                <Field
                  label="Website"
                  error={errors.website}
                >
                  <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="Enter website URL (e.g., https://example.com)"
                    className={inputClass(errors.website)}
                  />
                </Field>
              </div>
            </section>

            {/* ========================================
                Store Owner
            ======================================== */}

            <section className="border-t border-[#e5e7eb] px-4 py-5 sm:px-6 lg:px-7">

              <div className="mb-4">
                <h2 className="text-base font-bold text-[#111827]">
                  Store Owner
                </h2>

                <p className="mt-1 text-[11px] text-[#9ca3af]">
                  Assign an existing user as the owner of this store.
                </p>
              </div>

              <Field
                label="Store Owner"
                required
                error={errors.ownerId}
              >
                <div className="relative">
                  <select
                    name="ownerId"
                    value={form.ownerId}
                    onChange={handleChange}
                    disabled={loadingOwners}
                    className={`
                      h-11
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      bg-white
                      px-3
                      pr-10
                      text-xs
                      outline-none
                      transition
                      sm:text-sm
                      ${
                        errors.ownerId
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                          : "border-[#dfe3e8] focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10"
                      }
                      ${
                        !form.ownerId
                          ? "text-[#9ca3af]"
                          : "text-[#111827]"
                      }
                      disabled:cursor-not-allowed
                      disabled:bg-[#f9fafb]
                    `}
                  >
                    <option value="">
                      {loadingOwners
                        ? "Loading store owners..."
                        : "Select a user to assign as store owner"}
                    </option>

                    {owners.map((owner) => (
                      <option
                        key={owner.id}
                        value={owner.id}
                      >
                        {owner.name} — {owner.email}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
                  />
                </div>
              </Field>

              <p className="mt-2 text-[11px] text-[#9ca3af]">
                Select an existing user with STORE_OWNER role.
              </p>
            </section>

            {/* ========================================
                Actions
            ======================================== */}

            <div className="flex flex-col-reverse gap-2 border-t border-[#e5e7eb] bg-[#fcfcfc] px-4 py-4 sm:flex-row sm:justify-end sm:px-6 lg:px-7">

              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="
                  h-10
                  rounded-lg
                  border
                  border-[#e5e7eb]
                  bg-white
                  px-5
                  text-xs
                  font-semibold
                  text-[#374151]
                  transition
                  hover:bg-[#f9fafb]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#dc2626]
                  px-6
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#b91c1c]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {submitting && (
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />
                )}

                {submitting
                  ? "Creating..."
                  : "Create Store"}
              </button>

            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}


// ======================================================
// Reusable field component
// ======================================================

function Field({
  label,
  required = false,
  error,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-[#1f2937]">
        {label}

        {required && (
          <span className="ml-1 text-[#dc2626]">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-[10px] font-medium text-[#dc2626]">
          {error}
        </p>
      )}
    </div>
  );
}


// ======================================================
// Input class helper
// ======================================================

function inputClass(error) {
  return `
    h-11
    w-full
    rounded-lg
    border
    bg-white
    px-3
    text-xs
    text-[#111827]
    outline-none
    transition
    placeholder:text-[#9ca3af]
    sm:text-sm
    ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
        : "border-[#dfe3e8] focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10"
    }
  `;
}