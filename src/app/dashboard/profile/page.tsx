'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut, 
  Edit3,
  Bell,
  Lock,
  Globe
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Session } from 'inspector/promises';

interface userData {
  name: string;
  email: string;
  role: string;
  id: string
}
interface SessionData {
  user?: {
    data?: {
      user: userData;
    };
  };
}

export default function ProfilePage() {

  const [user, setUser] = useState<userData | undefined>()

  const { data: session, status } = useSession();
 

  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

useEffect(() => {
  const userData = (session as SessionData)?.user?.data?.user;
  if (userData) {
    setUser(userData);
  }
}, [session]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ 
        redirect: true, 
        callbackUrl: '/auth/login' 
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userStats = [
    { label: 'Proyectos', value: '12', color: 'blue' },
    { label: 'Tareas', value: '47', color: 'green' },
    { label: 'Completados', value: '38', color: 'purple' },
    { label: 'En progreso', value: '9', color: 'orange' },
  ];

  const menuItems = [
    {
      icon: Edit3,
      label: 'Editar Perfil',
      description: 'Actualiza tu información personal',
      onClick: () => console.log('Editar perfil')
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      description: 'Configura tus preferencias de notificación',
      onClick: () => console.log('Notificaciones')
    },
    {
      icon: Lock,
      label: 'Privacidad',
      description: 'Gestiona tu privacidad y seguridad',
      onClick: () => console.log('Privacidad')
    },
    {
      icon: Globe,
      label: 'Preferencias',
      description: 'Idioma y configuraciones regionales',
      onClick: () => console.log('Preferencias')
    },
  ];

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Perfil de Usuario
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tu información personal y preferencias
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>{isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información del usuario */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tarjeta de perfil */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user?.name.charAt(0).toUpperCase() || 'U'}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.name || 'Usuario'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user?.role || 'Usuario'}
              </p>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Miembro desde {new Date().getFullYear()}
                  </span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Estadísticas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha - Configuraciones y acciones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Menú de acciones */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Configuración de Cuenta
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Gestiona tu cuenta y preferencias
              </p>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full px-6 py-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Información de sesión */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Información de Sesión
            </h3>
            <div className="space-y-3">
              {/* <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">ID de Usuario:</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {user?.id || 'N/A'}
                </span>
              </div> */}
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Rol:</span>
                <span className="text-gray-900 dark:text-white capitalize">
                  {user?.role || 'usuario'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Sesión activa desde:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta de logout destacada */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  ¿Necesitas cerrar sesión?
                </h3>
                <p className="opacity-90 text-sm">
                  Tu sesión se cerrará de forma segura y deberás volver a iniciar sesión para acceder.
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-200 font-medium border border-white/30"
              >
                <LogOut className="w-5 h-5" />
                <span>{isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}