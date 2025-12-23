import React from 'react';
import Link from 'next/link';

interface Business {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  guests: string[];
}

interface BusinessSectionProps {
  business: Business[];
  isLoading?: boolean;
}

const CompaniesSection: React.FC<BusinessSectionProps> = ({ 
  business, 
  isLoading = false 
}) => {

  console.log(business);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!business || business.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tus Empresas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Aún no tienes empresas creadas
            </p>
            <Link 
              href="/dashboard/negocios/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Crear primera empresa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tus Negocios
          </h1>
          <Link 
            href="/dashboard/negocios/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Nuevo Negocio
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.map((business) => (
            <div
              key={business.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {business.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {business.guests.length} invitados
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Creada:</span>
                  <span>{new Date(business.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Actualizada:</span>
                  <span>{new Date(business.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Link
                  href={`/dashboard/negocios/${business.id}`}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Ver detalles
                </Link>
                <Link
                  href={`/dashboard/negocios/${business.id}/edit`}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSection;