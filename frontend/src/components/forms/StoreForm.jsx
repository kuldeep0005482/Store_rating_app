import React, { useState } from "react";
import { Button, Input, Select, Textarea } from "../ui";

const initial = {
  name: "",
  email: "",
  address: "",
  ownerId: "",
};

export default function StoreForm({
  initialValues = initial,
  owners = [],
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) {
  const [form, setForm] = useState({ ...initial, ...initialValues });
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Store name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.ownerId) next.ownerId = "Select a store owner";
    setErrors(next);
    return !Object.keys(next).length;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <h3 className="text-sm font-bold text-[#111827]">Store Information</h3>

      <div className="mt-4 space-y-4">
        <Input
          label="Store Name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Enter store name"
          error={errors.name}
        />

        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Enter store email"
          error={errors.email}
        />

        <Textarea
          label="Address"
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Enter store address (max 400 characters)"
          error={errors.address}
        />

        <Select
          label="Store Owner"
          required
          value={form.ownerId}
          onChange={(e) => update("ownerId", e.target.value)}
          placeholder="Select a store owner"
          options={owners.map((owner) => ({
            value: owner.id,
            label: owner.name,
          }))}
          error={errors.ownerId}
        />

        <p className="text-[10px] text-[#6b7280]">
          Select an existing user with the STORE_OWNER role.
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {mode === "edit" ? "Save Changes" : "Create Store"}
        </Button>
      </div>
    </form>
  );
}