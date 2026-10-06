import React from "react";
import { Link } from "react-router-dom";
export default function Users() {
  return <div><h1>Admin Users</h1><Link to="/admin/users/new">Add User</Link></div>;
}
