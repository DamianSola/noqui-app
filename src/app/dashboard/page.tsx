'use client'

import { getDashboardData } from "@/services/dashboard";
import { DashboardHeader }  from "@/components/dashboard/DashboardHeader";
import { DashboardTabs }    from "@/components/dashboard/DashboardTabs";
import { getSession }      from "next-auth/react";
import {getCurrentUser} from "@/services/authService";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { constants } from "node:buffer";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
/**
 * /dashboard — Vista global del usuario autenticado.
 *
 * Server Component: fetches all data, passes it down.
 * Only DashboardTabs (and its children that need Chart.js) are "use client".
 *
 * Replace "user_001" with the real session userId:
 *   import { auth } from "@/lib/auth"
 *   const session = await auth()
 *   const userId  = session?.user?.id
 * 
 */


interface User {
    id?: string | undefined;
    token?: string | undefined;
    email?: string | undefined;
    name?: string | undefined;
}
export default  function DashboardPage() {

  const [data, setData] = useState<any>(null);


  useEffect(() => {
    getDashboardData()
      .then((dashboardData) => {
        setData(dashboardData);
        console.log("TRAJE LOS DATOS DE DASBOARD_DATA:", dashboardData);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  if(!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 ">Cargando dashboard...</p>
        </div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <DashboardHeader
          userName={data.user.name}
          businessCount={data.businesses.length}
        />
        <DashboardTabs data={data} />
      </main>
    </div>
  );
}

// 'use client';

// // import { useTheme } from '@/providers/ThemeProvider';
// import StatsCards from '@/components/dashboard/StatsCards';
// import Chart from '@/components/dashboard/Chart';
// import RecentActivity from '@/components/dashboard/RecentActivity';
// import { useTheme } from '@/hooks/useTheme';

// export default function DashboardPage() {

//   const theme = useTheme()

//   return (
//     <div className="space-y-6">
    
//       {/* Estadísticas */}
//       <StatsCards />

//       {/* Gráfico y Actividad */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <Chart/>
//         </div>
//         <div className="lg:col-span-1">
//           <RecentActivity />
//         </div>
//       </div>

//       {/* Métricas adicionales */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//           <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
//             Rendimiento del Sistema
//           </h4>
//           <div className="space-y-3">
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="text-gray-600 dark:text-gray-400">CPU</span>
//                 <span className="text-gray-900 dark:text-white">42%</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className="bg-green-500 h-2 rounded-full" 
//                   style={{ width: '42%' }}
//                 ></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="text-gray-600 dark:text-gray-400">Memoria</span>
//                 <span className="text-gray-900 dark:text-white">68%</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className="bg-blue-500 h-2 rounded-full" 
//                   style={{ width: '68%' }}
//                 ></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="text-gray-600 dark:text-gray-400">Almacenamiento</span>
//                 <span className="text-gray-900 dark:text-white">85%</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className="bg-orange-500 h-2 rounded-full" 
//                   style={{ width: '85%' }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//           <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//             Tareas Pendientes
//           </h4>
//           <div className="space-y-3">
//             {[
//               'Revisar reportes mensuales',
//               'Actualizar documentación',
//               'Reunión con el equipo',
//               'Optimizar base de datos'
//             ].map((task, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   {task}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//           <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//             Estado del Sistema
//           </h4>
//           <div className="space-y-3">
//             {[
//               { service: 'API Principal', status: 'online', color: 'bg-green-500' },
//               { service: 'Base de Datos', status: 'online', color: 'bg-green-500' },
//               { service: 'Servidor de Email', status: 'warning', color: 'bg-yellow-500' },
//               { service: 'CDN', status: 'online', color: 'bg-green-500' }
//             ].map((item, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   {item.service}
//                 </span>
//                 <div className="flex items-center space-x-2">
//                   <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
//                   <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
//                     {item.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }