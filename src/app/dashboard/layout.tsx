

'use client';

import { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { useSession } from 'next-auth/react';
import { ThemeProvider } from '../ThemeProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/dashboard/Header';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const data = new Promise((resolve) => {
  //   getSession().then((sessionData) => {
  //     resolve(sessionData);
  //   });
  // }).then((session) => {
  //   console.log('Session data inside Promise:', session);
  //   return session;
  // });


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router, session]);

  if (status === 'loading') {
    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>

    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
       
        />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
        </ThemeProvider>
  );
}
