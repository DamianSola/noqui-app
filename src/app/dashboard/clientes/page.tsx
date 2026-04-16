'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getCustomerbyOwner } from '@/services/customer';
import { useRouter } from 'next/navigation';

interface Cliente {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const router = useRouter();

  let token: string | undefined = undefined;
  let ownerId: string = "ID_DEL_USUARIO_LOGUEADO";

   const {data} = useSession();

  if(data && data.user) {
    // @ts-ignore
    ownerId = data.user.data.user.id;
    // @ts-ignore
    token = data.user.data.token;
  }

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const data = await getCustomerbyOwner(ownerId, token)
      setClientes(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent dark:border-slate-700 dark:border-t-transparent" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Cargando clientes...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Gestión de Clientes
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Administra tus clientes, revisa su contacto y actividad.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
          onClick={() => {
            router.push('/dashboard/clientes/nuevo');
          }}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Clientes</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{clientes.length}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Nuevos Hoy</h3>
          <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {clientes.filter(c =>
              new Date(c.createdAt).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Última actualización</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {clientes.length > 0
              ? new Date(clientes[0].updatedAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Páginas</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {pagination?.totalPages ?? 1}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Cliente</th>
              <th className="px-4 py-3 text-left font-semibold">Contacto</th>
              <th className="px-4 py-3 text-left font-semibold">Registrado</th>
              <th className="px-4 py-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody>
  {clientes.map((cliente) => {
    const phone = cliente.phone
      ? cliente.phone.replace(/\D/g, "")
      : null;

    const whatsappUrl = phone
      ? `https://wa.me/${phone}`
      : null;

    return (
      <tr
        key={cliente.id}
        className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
      >
        {/* Nombre */}
        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-50">
          {cliente.name}
        </td>

        {/* Contacto */}
        <td className="px-4 py-4">
          <div className="text-slate-700 dark:text-slate-200">
            {cliente.email}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {cliente.phone || "Sin teléfono"}
          </div>
        </td>

        {/* Fecha */}
        <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
          {new Date(cliente.createdAt).toLocaleDateString()}
        </td>

        {/* Acciones */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Ver historial
            </button>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-offset-slate-900"
                title="Contactar por WhatsApp"
              >
                {/* Icono WhatsApp */}
                <svg
                  viewBox="0 0 32 32"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M19.11 17.51c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.46.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.57.66.21 1.26.18 1.73.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.17.16-1.29-.07-.12-.25-.2-.52-.34zM16 3C8.82 3 3 8.82 3 16c0 2.82.74 5.46 2.03 7.76L3 29l5.39-1.97A12.9 12.9 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" />
                </svg>
              </a>
            )}
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

    </div>
  );
}
