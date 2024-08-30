// AdminRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import UsersList from '../components/userManagement/UsersList';
import BookedUsers from '../components/userManagement/BookedUsers';
import AdminLogin from '../components/Authentication/AdminLogin';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="overview" element={<AdminDashboard />} />
      <Route path="all-users" element={<UsersList />} />
      <Route path="booked-users" element={<BookedUsers />} />
    </Routes>
  );
}

export default AdminRoutes;
