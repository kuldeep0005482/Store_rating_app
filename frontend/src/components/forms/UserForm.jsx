import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button, Input, Select, Textarea } from "../ui";

const defaultValues = {
  name: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
  role: "USER",
};

export default function UserForm({
  initialValues = defaultValues,
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Address is required";

    if (mode === "create") {
      if (!form.password) next.password = "Password is required";
      else if (form.password.length < 8) next.password = "Minimum 8 characters";
      if (form.password !== form.confirmPassword) next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <h3 className="text-sm font-bold text-[#111827]">User Information</h3>
        <div className="mt-4 grid gap-4">
          <Input
            label="Name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Enter full name (20–60 characters)"
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Enter email address"
            error={errors.email}
          />

          <Textarea
            label="Address"
            required
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Enter address (max 400 characters)"
            error={errors.address}
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <h3 className="text-sm font-bold text-[#111827]">Account Details</h3>

        <div className="mt-4 space-y-4">
          {mode === "create" && (
            <>
              <div className="relative">
                <Input
                  label="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Enter password (8–16 characters)"
                  error={errors.password}
                  inputClassName="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[31px] text-[#6b7280]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  required
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  error={errors.confirmPassword}
                  inputClassName="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-[31px] text-[#6b7280]"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </>
          )}

          <Select
            label="Role"
            required
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "USER", label: "User" },
              { value: "STORE_OWNER", label: "Store Owner" },
            ]}
          />

          <p className="text-[10px] text-[#6b7280]">
            Note: You can create Normal Users or Administrators from here.
          </p>
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {mode === "edit" ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </form>
  );
}