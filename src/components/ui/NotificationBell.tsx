'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function NotificationBell() {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
      )}
    </button>
  );
}