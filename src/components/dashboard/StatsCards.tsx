'use client';

import { Users, TrendingUp, DollarSign, FileText } from 'lucide-react';

const stats = [
  {
    name: 'Usuarios Totales',
    value: '2,543',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Ingresos',
    value: '$45,231',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'green'
  },
  {
    name: 'Crecimiento',
    value: '+32.4%',
    change: '+4.3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'purple'
  },
  {
    name: 'Documentos',
    value: '1,234',
    change: '-2.1%',
    changeType: 'negative' as const,
    icon: FileText,
    color: 'orange'
  }
];

export default function StatsCards() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change} desde el último mes
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(stat.color)}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}