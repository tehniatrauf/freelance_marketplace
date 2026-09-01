// src/components/common/Notification.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaWarning } from 'react-icons/fa';

const Notification = ({ type, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      icon: FaCheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: FaExclamationCircle,
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: FaWarning,
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: FaInfoCircle,
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  if (!isVisible) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm w-full animate-slide-in`}>
      <div className={`${config.bg} border-l-4 ${config.border} p-4 rounded-r-lg shadow-lg`}>
        <div className="flex items-start gap-3">
          <Icon className={`${config.iconColor} text-xl flex-shrink-0 mt-0.5`} />
          <div className={`${config.text} flex-1`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;