'use client';

import SearchInput from '@/components/ui/SearchInput';
import NotificationBell from '@/components/ui/NotificationBell';
import ThemeToggle from '../ui/ThemeToggle';
import UserMenu from './UserMenu';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1> */}
        </div>

        <div className="flex items-center space-x-4">
          {/* <div className="hidden md:block">
            <SearchInput />
          </div> */}
          <ThemeToggle />
          {/* <NotificationBell /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}