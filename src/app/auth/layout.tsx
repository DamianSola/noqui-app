import { ReactNode } from 'react';
import AuthProvider from '../AuthProvider';
import { ThemeProvider } from '../ThemeProvider';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}