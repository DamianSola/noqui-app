// components/forms/CreateCompanyForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import axios from 'axios';
import { createBusiness } from '@/services/business';

interface CreateCompanyData {
  name: string;
  guests: string[];
}

const CreateCompanyForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCompanyData>({
    name: '',
    guests: [],
  });
  const [guestEmail, setGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = createBusiness(formData, 'your-auth-token-here')

    // try {
    //   const response = await axios.post('/api/business', formData);
      
    //   if (response.status === 201) {
    //     router.push('/business');
    //     router.refresh();
    //   }
    // } catch (err: any) {
    //   setError(
    //     err.response?.data?.error || 
    //     'Error al crear la empresa. Por favor, intenta nuevamente.'
    //   );
    //   console.error('Error creating company:', err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleAddGuest = () => {
    if (guestEmail.trim() && !formData.guests.includes(guestEmail.trim())) {
      setFormData(prev => ({
        ...prev,
        guests: [...prev.guests, guestEmail.trim()]
      }));
      setGuestEmail('');
    }
  };

  const handleRemoveGuest = (email: string) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.filter(guest => guest !== email)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGuest();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/companies"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-4"
          >
            ← Volver a empresas
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Crear Nueva Empresa
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Completa la información para crear una nueva empresa y compartirla con tu equipo.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Company Name */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nombre de la empresa *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ingresa el nombre de tu empresa"
              />
            </div>

            {/* Guests Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Invitar colaboradores
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Agrega los emails de las personas que quieres invitar a tu empresa.
              </p>
              
              {/* Add Guest Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="email@ejemplo.com"
                />
                <button
                  type="button"
                  onClick={handleAddGuest}
                  disabled={!guestEmail.trim()}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar
                </button>
              </div>

              {/* Guests List */}
              {formData.guests.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Colaboradores invitados ({formData.guests.length})
                  </h4>
                  <div className="space-y-2">
                    {formData.guests.map((guest, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {guest}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGuest(guest)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
              <Link
                href="/companies"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading || !formData.name.trim()}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creando...' : 'Crear Empresa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyForm;