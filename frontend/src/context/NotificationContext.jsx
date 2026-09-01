// src/context/NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';
export const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      message: 'New application received for "Website Development"',
      read: false,
      timestamp: '2 min ago'
    },
    {
      id: 2,
      type: 'offer',
      message: 'Freelancer accepted your offer for "Mobile App Development"',
      read: false,
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from John Smith',
      read: true,
      timestamp: '3 hours ago'
    }
  ]);

  const addNotification = (notification) => {
    setNotifications(prev => [
      { id: Date.now(), read: false, ...notification },
      ...prev
    ]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};