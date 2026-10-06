import React from "react";
import { UserForm, StoreForm, SearchForm, FilterForm, RatingForm, LoginForm } from "./index";

const owners = [
  { id: "1", name: "Rahul Khanna" },
  { id: "2", name: "Priya Sharma" },
];

export default function FormsDemo() {
  return (
    <div className="min-h-screen bg-[#fff7f3] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-[#991b1b] to-[#dc2626] p-6 text-white">
          <h1 className="text-2xl font-bold">StoreRate Form Components</h1>
          <p className="mt-1 text-sm text-red-100">Reusable forms for admin, store owner and user flows.</p>
        </header>

        <section>
          <h2 className="mb-3 text-lg font-bold">User Form</h2>
          <UserForm onSubmit={console.log} onCancel={() => console.log("cancel")} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">Store Form</h2>
          <StoreForm owners={owners} onSubmit={console.log} onCancel={() => console.log("cancel")} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">Search Form</h2>
          <SearchForm onSubmit={console.log} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">User Filters</h2>
          <FilterForm type="users" onApply={console.log} onReset={console.log} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">Store Filters</h2>
          <FilterForm type="stores" onApply={console.log} onReset={console.log} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">Rating Form</h2>
          <RatingForm store={{ id: "1", name: "Urban Basket" }} onSubmit={console.log} />
        </section>

        <section className="max-w-md">
          <h2 className="mb-3 text-lg font-bold">Login Form</h2>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <LoginForm onSubmit={console.log} />
          </div>
        </section>
      </div>
    </div>
  );
}