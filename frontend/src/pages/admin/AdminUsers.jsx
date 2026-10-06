// src/pages/admin/AdminUsers.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  RotateCcw,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import MobileSidebar from "../../components/layout/MobileSidebar";
import { api } from "../../services/api";

import {
  Card,
  Input,
  Select,
  Button,
  Badge,
  Avatar,
  Pagination,
  Dropdown,
} from "../../components/ui";



const ROLE_OPTIONS = [
  { value: "ALL", label: "All Roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
  { value: "STORE_OWNER", label: "Store Owner" },
];

function UserRoleBadge({ role }) {
  const variant =
    role === "ADMIN"
      ? "admin"
      : role === "STORE OWNER"
      ? "owner"
      : "user";

  return <Badge variant={variant}>{role}</Badge>;
}

function UserActions({ user, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        icon={Eye}
        className="h-8 px-3 text-[11px]"
        onClick={() => onView(user)}
      >
        View
      </Button>

      <Dropdown
        iconOnly
        items={[
          {
            label: "View User",
            icon: Eye,
            onClick: () => onView(user),
          },
          {
            label: "Edit User",
            icon: Pencil,
            onClick: () => onEdit(user),
          },
          {
            label: "Delete User",
            icon: Trash2,
            danger: true,
            onClick: () => onDelete(user),
          },
        ]}
      />
    </div>
  );
}

function DesktopUserTable({
  users,
  selectedUsers,
  setSelectedUsers,
  onView,
  onEdit,
  onDelete,
}) {
  const allSelected =
    users.length > 0 && selectedUsers.length === users.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const toggleUser = (id) => {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id]
    );
  };

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b border-[#e5e7eb] bg-[#fafafa]">
            <th className="w-10 px-3 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 cursor-pointer accent-[#dc2626]"
              />
            </th>

            <th className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
              Name
            </th>

            <th className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
              Email
            </th>

            <th className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
              Address
            </th>

            <th className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
              Role
            </th>

            <th className="px-3 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-[#f1f5f9] transition hover:bg-[#fffafa]"
            >
              <td className="px-3 py-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                  className="h-4 w-4 cursor-pointer accent-[#dc2626]"
                />
              </td>

              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} size="sm" />

                  <div>
                    <p className="text-xs font-semibold text-[#111827]">
                      {user.name}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-3 py-3 text-xs text-[#6b7280]">
                {user.email}
              </td>

              <td className="px-3 py-3 text-xs text-[#6b7280]">
                {user.address}
              </td>

              <td className="px-3 py-3">
                <UserRoleBadge role={user.role} />
              </td>

              <td className="px-3 py-3">
                <UserActions
                  user={user}
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

function MobileUserList({ users, onView, onEdit, onDelete }) {
  return (
    <div className="space-y-3 md:hidden">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={user.name} size="md" />

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-[#111827]">
                  {user.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-[#6b7280]">
                  {user.email}
                </p>
              </div>
            </div>

            <Dropdown
              iconOnly
              items={[
                {
                  label: "View User",
                  icon: Eye,
                  onClick: () => onView(user),
                },
                {
                  label: "Edit User",
                  icon: Pencil,
                  onClick: () => onEdit(user),
                },
                {
                  label: "Delete User",
                  icon: Trash2,
                  danger: true,
                  onClick: () => onDelete(user),
                },
              ]}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#f1f5f9] pt-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                Address
              </p>
              <p className="mt-1 text-xs text-[#4b5563]">{user.address}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Role
                </p>
                <UserRoleBadge role={user.role} />
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => onView(user)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const result = await api.get("/admin/users?limit=100&sortBy=name&sortOrder=asc");
        if (active) setUsers(result.data || []);
      } catch (error) {
        if (active) setLoadError(error.message || "Failed to load users");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [role, setRole] = useState("ALL");

  const [page, setPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const USERS_PER_PAGE = 10;

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.address.toLowerCase().includes(searchValue);

      const matchesName =
        !nameFilter ||
        user.name.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesEmail =
        !emailFilter ||
        user.email.toLowerCase().includes(emailFilter.toLowerCase());

      const matchesAddress =
        !addressFilter ||
        user.address.toLowerCase().includes(addressFilter.toLowerCase());

      const matchesRole = role === "ALL" || user.role === role;

      return (
        matchesSearch &&
        matchesName &&
        matchesEmail &&
        matchesAddress &&
        matchesRole
      );
    });
  }, [users, search, nameFilter, emailFilter, addressFilter, role]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );

  const visibleUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch("");
    setNameFilter("");
    setEmailFilter("");
    setAddressFilter("");
    setRole("ALL");
    setPage(1);
    setSelectedUsers([]);
  };

  const applyFilters = () => {
    setPage(1);
  };

  const handleView = (user) => {
    navigate(`/admin/users/${user.id}`);
    // navigate(`/admin/users/${user.id}`);
  };

  const handleEdit = (user) => {
    navigate(`/admin/users/${user.id}/edit`);
    // navigate(`/admin/users/${user.id}/edit`);
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    try {
      await api.delete(`/admin/users/${user.id}`);
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (error) {
      window.alert(error.message || "Unable to delete user");
    }
  };

  const handleAddUser = () => {
    navigate("/admin/users/new");
  };

  if (loading) {
    return <div className="p-8 text-sm text-[#6b7280]">Loading users...</div>;
  }

  if (loadError) {
    return <div className="p-8 text-sm text-[#dc2626]">{loadError}</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#111827]">
      {/* Desktop sidebar */}
      <Sidebar
        activeItem="Users"
        onNavigate={(item) => {
          const paths = { Dashboard: "/admin/dashboard", Users: "/admin/users", Stores: "/admin/stores", Settings: "/settings" };
          if (paths[item]) navigate(paths[item]);
        }}
      />

      {/* Mobile sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        activeItem="Users"
        onLogout={async () => {
          try { await api.post("/auth/logout", {}); } catch {}
          localStorage.removeItem("authUser");
          window.location.replace("/login");
        }}
      />

      <div className="min-h-screen lg:pl-60">
        <Header
          user={{
            name: "Admin",
            role: "System Administrator",
          }}
          onMenu={() => setMobileSidebarOpen(true)}
          onLogout={async () => {
            try { await api.post("/auth/logout", {}); } catch {}
            localStorage.removeItem("authUser");
            window.location.replace("/login");
          }}
        />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-5 lg:p-6">
          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-2 text-[11px] text-[#9ca3af]">
            <span>Home</span>
            <span>/</span>
            <span className="font-medium text-[#6b7280]">Users</span>
          </div>

          {/* Page heading */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[28px]">
                Users
              </h1>

              <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
                Manage normal users and administrators
              </p>
            </div>

            <Button
              size="sm"
              icon={Plus}
              className="w-full sm:w-auto"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </div>

          {/* Main card */}
          <Card className="overflow-hidden" contentClassName="p-0">
            {/* Search */}
            <div className="border-b border-[#f1f5f9] bg-white p-4 sm:p-5">
              <div className="relative">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by name, email or address..."
                  className="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-10 pr-4 text-xs text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10 sm:text-sm"
                />
              </div>

              {/* Desktop filter row */}
              <div className="mt-4 hidden grid-cols-12 gap-3 lg:grid">
                <Input
                  label="Name"
                  placeholder="Enter name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="col-span-3"
                />

                <Input
                  label="Email"
                  placeholder="Enter email..."
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  className="col-span-3"
                />

                <Input
                  label="Address"
                  placeholder="Enter address..."
                  value={addressFilter}
                  onChange={(e) => setAddressFilter(e.target.value)}
                  className="col-span-2"
                />

                <Select
                  label="Role"
                  options={ROLE_OPTIONS}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="col-span-2"
                  placeholder={null}
                />

                <div className="col-span-2 flex items-end gap-2">
                  <Button
                    size="sm"
                    icon={Filter}
                    className="flex-1"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={RotateCcw}
                    className="px-3"
                    onClick={resetFilters}
                    aria-label="Reset filters"
                  >
                    <span className="hidden xl:inline">Reset</span>
                  </Button>
                </div>
              </div>

              {/* Mobile/tablet filters */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
                <Input
                  label="Name"
                  placeholder="Enter name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />

                <Input
                  label="Email"
                  placeholder="Enter email..."
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                />

                <Input
                  label="Address"
                  placeholder="Enter address..."
                  value={addressFilter}
                  onChange={(e) => setAddressFilter(e.target.value)}
                />

                <Select
                  label="Role"
                  options={ROLE_OPTIONS}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder={null}
                />

                <div className="flex gap-2 sm:col-span-2">
                  <Button
                    size="sm"
                    icon={Filter}
                    className="flex-1"
                    onClick={applyFilters}
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

            {/* Results header */}
            <div className="flex flex-col gap-3 border-b border-[#f1f5f9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[#111827]">
                  {filteredUsers.length + 236} users
                </span>

                <span className="rounded-md bg-[#eff6ff] px-2 py-1 text-[10px] font-semibold text-[#2563eb]">
                  Role: {role === "ALL" ? "All" : role}
                </span>

                <span className="rounded-md bg-[#f8fafc] px-2 py-1 text-[10px] font-medium text-[#64748b]">
                  Sort: Name (A-Z)
                </span>
              </div>

              {selectedUsers.length > 0 && (
                <span className="text-xs font-semibold text-[#dc2626]">
                  {selectedUsers.length} selected
                </span>
              )}
            </div>

            {/* Desktop table */}
            <DesktopUserTable
              users={visibleUsers}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Mobile cards */}
            <div className="p-4 md:hidden">
              <MobileUserList
                users={visibleUsers}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            {/* Empty state */}
            {visibleUsers.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f2]">
                  <Search size={20} className="text-[#dc2626]" />
                </div>

                <h3 className="mt-3 text-sm font-bold text-[#111827]">
                  No users found
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

            {/* Pagination */}
            {visibleUsers.length > 0 && (
              <div className="border-t border-[#f1f5f9] px-4 py-4 sm:px-5">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />

                <p className="mt-3 text-center text-[10px] text-[#9ca3af]">
                  Showing{" "}
                  <span className="font-semibold text-[#6b7280]">
                    {(page - 1) * USERS_PER_PAGE + 1}
                  </span>{" "}
                  –
                  <span className="font-semibold text-[#6b7280]">
                    {" "}
                    {Math.min(
                      page * USERS_PER_PAGE,
                      filteredUsers.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#6b7280]">
                    {filteredUsers.length + 236}
                  </span>{" "}
                  users
                </p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}