// src/components/layout/ClientLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import { useAuth } from '../../hooks/useAuth';

const ClientLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <Sidebar user={user} role="client" onLogout={logout} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;