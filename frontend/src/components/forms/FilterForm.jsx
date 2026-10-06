import React, { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Button, Input, Select } from "../ui";

const defaults = {
  name: "",
  email: "",
  address: "",
  role: "",
  status: "",
  rating: "",
};

export default function FilterForm({
  initialValues = defaults,
  onApply,
  onReset,
  type = "users",
}) {
  const [filters, setFilters] = useState({ ...defaults, ...initialValues });

  const update = (key, value) => {
    setFilters((p) => ({ ...p, [key]: value }));
  };

  const reset = () => {
    setFilters(defaults);
    onReset?.(defaults);
  };

  const apply = (e) => {
    e.preventDefault();
    onApply?.(filters);
  };

  const isStores = type === "stores";

  return (
    <form onSubmit={apply} className="rounded-xl border border-[#e5e7eb] bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Input
          label={isStores ? "Store Name" : "Name"}
          value={isStores ? filters.name : filters.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder={isStores ? "Enter store name" : "Enter name"}
        />

        <Input
          label="Email"
          value={filters.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Enter email"
        />

        <Input
          label="Address"
          value={filters.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Enter address"
        />

        {!isStores && (
          <Select
            label="Role"
            value={filters.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="All Roles"
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "USER", label: "User" },
              { value: "STORE_OWNER", label: "Store Owner" },
            ]}
          />
        )}

        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          placeholder="All Statuses"
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
        />

        {isStores && (
          <Select
            label="Rating"
            value={filters.rating}
            onChange={(e) => update("rating", e.target.value)}
            placeholder="All Ratings"
            options={[
              { value: "5", label: "5 Stars" },
              { value: "4", label: "4+ Stars" },
              { value: "3", label: "3+ Stars" },
            ]}
          />
        )}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </Button>
        <Button type="submit">
          <Filter size={14} /> Apply Filters
        </Button>
      </div>
    </form>
  );
}