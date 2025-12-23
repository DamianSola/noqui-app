// app/cliente/nuevo/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getCompanyByOwnerId } from '@/services/business';

interface Business {
  id: string;
  name: string;
}

export default function NuevoClientePage() {
  const { data, status } = useSession();
  const router = useRouter();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // OwnerId por defecto desde el usuario logueado
  let token: string | undefined = undefined;
  let ownerId: string = "ID_DEL_USUARIO_LOGUEADO";

  if(data && data.user) {
    // @ts-ignore
    ownerId = data.user.data.user.id;
    // @ts-ignore
    token = data.user.data.token;
  }

  useEffect(() => {
    // Si todavía se está cargando la sesión, no hacer nada
    if (status === 'loading') return;

    // Si no hay sesión, podrías redirigir o mostrar mensaje
    if (!ownerId) {
      setLoadingBusinesses(false);
      return;
    }

    const fetchBusinesses = async () => {
      try {
        setLoadingBusinesses(true);
        const res = await getCompanyByOwnerId(ownerId, token);
        const list: Business[] = res.data || [];
        console.log("Fetched businesses:", list);
        setBusinesses(list);

        // Si hay negocios, seleccionamos el primero por defecto
        if (list.length > 0) {
          setSelectedBusinessId(list[0].id);
        }
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError('No se pudieron cargar los negocios del usuario');
      } finally {
        setLoadingBusinesses(false);
      }
    };

    fetchBusinesses();

  }, [ownerId, status]);

  const handleChange = (e: any) => {
    if(e.target.name === 'name') {
      setName(e.target.value);
    } else if(e.target.name === 'email') {
      setEmail(e.target.value);
    } else if(e.target.name === 'phone') {
      setPhone(e.target.value);
    } else if(e.target.name === 'businessId') {
      setSelectedBusinessId(e.target.value);
    }

}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!ownerId) {
      setError('Debes iniciar sesión para crear un cliente');
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }

    if (!selectedBusinessId) {
      setError('Debes seleccionar un negocio');
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          businessId: selectedBusinessId,
          ownerId,
        }
      );

      if (res.data?.success) {
        setSuccess('Cliente creado correctamente');
        // Limpiar formulario
        setName('');
        setEmail('');
        setPhone('');

        // Opcional: redirigir a la lista de clientes
        // router.push('/dashboard/clientes');
      } else {
        setError(res.data?.error || 'Error al crear el cliente');
      }
    } catch (err: any) {
      console.error('Error creando cliente:', err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Error al crear el cliente';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <div className="p-6">Cargando sesión...</div>;
  }

  if (!ownerId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Nuevo Cliente</h1>
        <p className="text-gray-600">
          Debes iniciar sesión para crear un cliente.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
  <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
    Agregar nuevo cliente
  </h1>

  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
    Completa los datos del cliente y asignalo a uno de tus negocios.
  </p>

  <form className="space-y-4 bg-white dark:bg-gray-900 rounded-lg shadow p-5"
     onChange={handleChange} onSubmit={handleSubmit}>

    {/* Nombre */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Nombre <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nombre del cliente"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        E-mail <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name='email'
        className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="correo@ejemplo.com"
      />
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Debe ser único por cliente.
      </p>
    </div>

    {/* Teléfono */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Teléfono (opcional)
      </label>
      <input
        type="text"
        name='phone'
        className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="+54911..."
      />
    </div>

    {/* Negocio */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Negocio al que pertenece <span className="text-red-500">*</span>
      </label>

      <select
      name='businessId'
        className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loadingBusinesses ? (
          <option>Cargando negocios...</option>
        ) : businesses.length === 0 ? (
            <option>No hay negocios disponibles</option>
            ) : (
                businesses.map((biz) => (
                    <option key={biz.id} value={biz.id}>
                        {biz.name}
                    </option>
                ))
            )}
      </select>
    </div>

    {/* Mensajes */}
    {/* <p className="text-sm text-red-600 dark:text-red-500">Error ejemplo</p>
    <p className="text-sm text-green-600 dark:text-green-400">Éxito ejemplo</p> */}

    {error && (
      <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
    )}
    {success && (
      <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
    )}

    {/* Botones */}
    <div className="flex gap-3 mt-4">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium 
                   hover:bg-blue-700 dark:hover:bg-blue-500 
                   disabled:opacity-50"
      >
        Guardar cliente
      </button>

      <button
        type="button"
        className="border border-gray-300 dark:border-gray-600 
                   text-gray-700 dark:text-gray-300 
                   px-4 py-2 rounded-md text-sm font-medium 
                   hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Cancelar
      </button>
    </div>

  </form>
</div>

  );
}
