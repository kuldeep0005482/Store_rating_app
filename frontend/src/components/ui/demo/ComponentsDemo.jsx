import React, { useState } from "react";
import { Plus, Trash2, Search, Users, Store, Star } from "lucide-react";
import {
  Button, Input, Textarea, Select, Badge, Avatar, Card, Dropdown,
  EmptyState, Modal, Skeleton, Spinner, Toast, RatingStars, Switch,
  SearchBar, FilterChip, StatCard, Tabs, Breadcrumb, Pagination, SidebarItem, TableRow
} from "../index";

export default function ComponentsDemo() {
  const [checked, setChecked] = useState(true);
  const [tab, setTab] = useState("users");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff7f3] p-6 text-[#111827]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#991b1b] to-[#dc2626] p-6 text-white">
          <h1 className="text-2xl font-bold">StoreRate UI Component Library</h1>
          <p className="mt-1 text-sm text-red-100">Reusable components matching the dashboard reference.</p>
        </div>

        <Breadcrumb items={["Admin", "Users", "Add User"]} />

        <Card title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button icon={Plus}>Add User</Button>
            <Button variant="secondary" icon={Plus}>Add User</Button>
            <Button variant="outline" icon={Plus}>Add User</Button>
            <Button variant="ghost" icon={Plus}>Add User</Button>
            <Button variant="destructive" icon={Trash2}>Delete</Button>
            <Button loading>Loading...</Button>
            <Button disabled>Add User</Button>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Inputs">
            <div className="space-y-4">
              <Input label="Email" placeholder="Enter email address" />
              <Input label="Email" error="Invalid email address" placeholder="Enter email address" />
              <SearchBar placeholder="Search users, stores..." />
              <Textarea label="Description" placeholder="Enter store description..." />
            </div>
          </Card>
          <Card title="Select / Status">
            <div className="space-y-4">
              <Select label="Role" placeholder="Select role" options={["Admin", "Store Owner", "User"]} />
              <div className="flex flex-wrap gap-2">
                <Badge variant="active">Active</Badge>
                <Badge variant="inactive">Inactive</Badge>
                <Badge variant="admin">Admin</Badge>
                <Badge variant="owner">Store Owner</Badge>
                <Badge variant="user">User</Badge>
                <Badge variant="pending">Pending</Badge>
              </div>
              <Switch checked={checked} onChange={setChecked} label="Active account" />
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Users" value="1,248" change={12} variant="users" icon={Users} />
          <StatCard title="Total Stores" value="184" change={8} variant="stores" icon={Store} />
          <StatCard title="Total Ratings" value="8,426" change={24} variant="ratings" icon={Star} />
        </div>

        <Card title="Avatars & Ratings">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar name="Rahul Khanna" size="lg" />
            <Avatar name="Priya Sharma" size="md" />
            <RatingStars value={4.5} showValue />
            <RatingStars value={3} interactive onChange={console.log} />
            <Spinner />
            <Skeleton className="h-10 w-40" />
          </div>
        </Card>

        <Card title="Tabs & Filters">
          <Tabs items={[{value:"users",label:"Users"},{value:"stores",label:"Stores"},{value:"ratings",label:"Ratings"},{value:"settings",label:"Settings"}]} value={tab} onChange={setTab} />
          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip label="Role" value="Admin" onRemove={() => {}} />
            <FilterChip label="Status" value="Active" onRemove={() => {}} />
          </div>
        </Card>

        <Card title="Dropdown / Modal">
          <div className="flex flex-wrap gap-3">
            <Dropdown items={[{label:"View Details", icon: Search}, {label:"Edit User"}, {label:"Delete User", danger:true}]} />
            <Button onClick={() => setModal(true)}>Open Modal</Button>
          </div>
        </Card>

        <Card title="Users Table">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b bg-[#f8fafc] text-[10px] uppercase text-[#6b7280]"><th className="px-3 py-2">#</th><th className="px-3 py-2">Name</th><th className="px-3 py-2">Email</th><th className="px-3 py-2">Role</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Actions</th></tr></thead>
              <tbody>
                <TableRow user={{name:"Rahul Khanna",email:"rahul.khanna@example.com",role:"ADMIN"}} />
                <TableRow user={{name:"Priya Sharma",email:"priya.sharma@example.com",role:"USER"}} />
              </tbody>
            </table>
          </div>
          <div className="mt-4"><Pagination page={page} totalPages={5} onChange={setPage} /></div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Toast">
            <Toast title="User created successfully!" message="The user has been added to the system." />
          </Card>
          <Card title="Empty State">
            <EmptyState title="No Users Found" description="There are no users to display. Add a new user to get started." actionLabel="Add User" />
          </Card>
        </div>

        <div className="rounded-xl bg-[#991b1b] p-3">
          <SidebarItem icon={Users} label="Dashboard" />
          <SidebarItem icon={Users} label="Users" active />
          <SidebarItem icon={Store} label="Stores" />
        </div>

        <Modal open={modal} onClose={() => setModal(false)} title="Add New User" description="Create a new user account.">
          <div className="space-y-4"><Input label="Full Name" placeholder="Enter full name" /><Input label="Email" placeholder="Enter email address" /></div>
        </Modal>
      </div>
    </div>
  );
}