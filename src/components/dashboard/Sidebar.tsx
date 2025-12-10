'use client';

import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  User,
  Settings,
  Calendar,
  MessageSquare,
  HelpCircle,
  Activity,
  Box,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  // { name: 'Usuarios', href: '/usuarios', icon: User }, // borrar
  {name: 'Mis negocios', href: '/dashboard/negocios', icon: Users },
  { name: 'Productos', href: '/dashboard/productos', icon: Box },
  { name: 'Clientes', href: '/dashboard/clientes', icon: Users },
  { name: 'Analítica', href: '/dashboard/actividad', icon: Activity },
  { name: 'Pedidos', href: '/dashboard/pedidos', icon: ShoppingBag },
  { name: 'Calendario', href: '/dashboard/calendario', icon: Calendar },
  { name: 'Mensajes', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
  { name: 'Ayuda', href: '/dashboard/help', icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const user: UserData | any = session;

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // En móvil, asegurarse que no esté colapsado
      if (mobile) {
        setIsCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar en móvil al hacer clic en un link
  useEffect(() => {
    if (isMobile && isOpen) {
      const handleLinkClick = () => {
        onClose();
      };

      const links = document.querySelectorAll('nav a');
      links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });

      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleLinkClick);
        });
      };
    }
  }, [isMobile, isOpen, onClose]);

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Determinar clases CSS basado en el estado
  const getSidebarClasses = () => {
    if (isMobile) {
      return {
        container: `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`,
        overlay: isOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden' : 'hidden'
      };
    } else {
      return {
        container: `static transform transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`,
        overlay: 'hidden'
      };
    }
  };

  const { container, overlay } = getSidebarClasses();

  return (
    <>
      
      {/* Overlay para móvil */}
      {isOpen && isMobile && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`
        ${container}
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        flex flex-col h-screen
      `}>
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white truncate">
                AdminPanel
              </span>
            </div>
          )}
          
          {isCollapsed && !isMobile && (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
          )}

          <div className="flex items-center space-x-1">
            {/* Botón para colapsar/expandir (solo desktop) */}
            {!isMobile && (
              <button
                onClick={toggleCollapse}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            )}

            {/* Botón para cerrar en móvil */}
            {isMobile && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>
        </div>

        {/* Información del usuario */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || 'Usuario'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user?.role || 'Rol'}
                </p>
              </div>
            </div>
          </div>
        )}

        {isCollapsed && !isMobile && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        )}

        {/* Navegación */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`
                  flex items-center rounded-lg text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors group
                  ${isCollapsed && !isMobile ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2'}
                `}
                title={isCollapsed && !isMobile ? item.name : undefined}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <span className="font-medium truncate">{item.name}</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        {(!isCollapsed || isMobile) && (
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
        )}
      </aside>
    </>
  );
}