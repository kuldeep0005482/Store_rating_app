import React, { useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/layout/PageHeader";
import UserForm from "../../components/forms/UserForm";
import { api } from "../../services/api";

export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await api.post("/admin/users", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        password: formData.password,
        role: formData.role,
      });

      navigate("/admin/users");
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  return (
    <AdminLayout activeItem="Users">
      <div className="mx-auto w-full max-w-[1050px]">
        {/* Page Header */}
        <PageHeader
          title="Add New User"
          description="Create a new user account with appropriate role."
          breadcrumbs={[
            {
              label: "Users",
              href: "/admin/users",
            },
            {
              label: "Add User",
            },
          ]}
          action={
            <button
              type="button"
              onClick={handleCancel}
              className="
                inline-flex
                h-9
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
              <ArrowLeft size={15} />
              <span>Back to Users</span>
            </button>
          }
        />

        {/* Form Container */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1f2]">
              <UserPlus size={18} className="text-[#dc2626]" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                User Account
              </h2>

              <p className="text-[11px] text-[#6b7280]">
                Enter the user's information and account details.
              </p>
            </div>
          </div>

          <UserForm
            mode="create"
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </AdminLayout>
  );
}