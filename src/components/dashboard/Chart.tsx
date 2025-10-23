'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Ingresos',
      data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 7200, 8800, 9100, 9500, 10000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Usuarios',
      data: [3200, 2800, 3500, 3600, 3200, 3100, 2800, 3300, 3800, 4000, 4200, 4500],
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#6B7280',
        usePointStyle: true,
      }
    },
    title: {
      display: true,
      text: 'Rendimiento Mensual',
      color: '#374151',
      font: {
        size: 16,
        weight: 'bold' as const
      }
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
      ticks: {
        color: '#6B7280',
      }
    },
    y: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
      ticks: {
        color: '#6B7280',
      }
    },
  },
};

const darkOptions = {
  ...options,
  plugins: {
    ...options.plugins,
    title: {
      ...options.plugins.title,
      color: '#D1D5DB'
    },
    legend: {
      ...options.plugins.legend,
      labels: {
        ...options.plugins.legend.labels,
        color: '#9CA3AF'
      }
    }
  },
  scales: {
    x: {
      ...options.scales.x,
      grid: {
        color: 'rgba(75, 85, 99, 0.3)',
      },
      ticks: {
        color: '#9CA3AF',
      }
    },
    y: {
      ...options.scales.y,
      grid: {
        color: 'rgba(75, 85, 99, 0.3)',
      },
      ticks: {
        color: '#9CA3AF',
      }
    },
  },
};

interface ChartProps {
  darkMode?: boolean;
}

export default function Chart({ darkMode = false }: ChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <Line data={data} options={darkMode ? darkOptions : options} />
    </div>
  );
}