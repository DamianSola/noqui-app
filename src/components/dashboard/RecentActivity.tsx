'use client';

import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'success',
    message: 'Nuevo usuario registrado',
    user: 'María González',
    time: 'Hace 2 minutos',
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'error',
    message: 'Error en el proceso de pago',
    user: 'Juan Pérez',
    time: 'Hace 15 minutos',
    icon: XCircle
  },
  {
    id: 3,
    type: 'warning',
    message: 'Alerta de seguridad',
    user: 'Sistema',
    time: 'Hace 1 hora',
    icon: AlertTriangle
  },
  {
    id: 4,
    type: 'info',
    message: 'Proceso programado ejecutado',
    user: 'Sistema',
    time: 'Hace 2 horas',
    icon: Clock
  },
  {
    id: 5,
    type: 'success',
    message: 'Backup completado',
    user: 'Sistema',
    time: 'Hace 3 horas',
    icon: CheckCircle
  }
];

const getTypeStyles = (type: string) => {
  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      icon: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800'
    }
  };
  return styles[type as keyof typeof styles] || styles.info;
};

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Actividad Reciente
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const styles = getTypeStyles(activity.type);
          
          return (
            <div
              key={activity.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border ${styles.bg} ${styles.border}`}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
        Ver toda la actividad
      </button>
    </div>
  );
}