'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterFormData } from '@/types/auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import api from '@/lib/axios';

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');

      const { confirmPassword, ...registerData } = data;

      const response = await api.post('/auth/register', registerData);

      if (response.status === 201) {
        router.push('/auth/login?message=Registro exitoso');
      }
    } catch (error: any) {
      console.log(error)
      setError(
        error.response?.data?.message || 
        'Error en el registro. Intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
  <div className="text-center mb-8">
    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Crear Cuenta</h2>
    <p className="text-gray-600 dark:text-gray-400 mt-2">Únete a nuestra plataforma</p>
  </div>
  
  {error && (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center space-x-2">
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <span className="text-sm font-medium">{error}</span>
    </div>
  )}

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div className="space-y-4">
      <Input
        label="Nombre completo"
        type="text"
        {...register('name', {
          required: 'El nombre es requerido',
          minLength: {
            value: 2,
            message: 'El nombre debe tener al menos 2 caracteres',
          },
        })}
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'El email es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido',
          },
        })}
        error={errors.email}
      />

      <Input
        label="Contraseña"
        type="password"
        {...register('password', {
          required: 'La contraseña es requerida',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres',
          },
        })}
        error={errors.password}
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        {...register('confirmPassword', {
          required: 'Confirma tu contraseña',
          validate: value =>
            value === password || 'Las contraseñas no coinciden',
        })}
        error={errors.confirmPassword}
      />
    </div>

    <div className="flex items-center space-x-2 text-sm">
      <input 
        type="checkbox" 
        id="terms"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
      />
      <label htmlFor="terms" className="text-gray-600 dark:text-gray-400">
        Acepto los{' '}
        <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
          términos y condiciones
        </a>
      </label>
    </div>

    <Button
      type="submit"
      loading={loading}
      className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
    >
      Crear Cuenta
    </Button>
  </form>

  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
    <div className="text-center">
      <p className="text-gray-600 dark:text-gray-400">
        ¿Ya tienes cuenta?{' '}
        <a
          href="/auth/login"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
        >
          Iniciar Sesión
        </a>
      </p>
    </div>
  </div>
</div>
  );
}