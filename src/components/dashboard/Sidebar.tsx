'use client';

import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface userData{
  name: string;
  email: string;
  role: string;

}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/dashboard/users', icon: Users },
  { name: 'Reportes', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Documentos', href: '/dashboard/documents', icon: FileText },
  { name: 'Calendario', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Mensajes', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
  { name: 'Ayuda', href: '/dashboard/help', icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session } = useSession();
  console.log(session)

  const user: userData | any  = session;

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              AdminPanel
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Información del usuario */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Contacta a nuestro equipo de soporte
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}