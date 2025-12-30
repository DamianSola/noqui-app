'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
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
    return <div className="p-6">Cargando clientes...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => { router.push('/dashboard/clientes/nuevo'); }}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Clientes</h3>
          <p className="text-2xl font-bold">{clientes.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Nuevos Hoy</h3>
          <p className="text-2xl font-bold text-green-600">
            {clientes.filter(c =>
              new Date(c.createdAt).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Última actualización</h3>
          <p className="text-2xl font-bold">
            {clientes.length > 0
              ? new Date(clientes[0].updatedAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Páginas</h3>
          <p className="text-2xl font-bold">
            {pagination?.totalPages ?? 1}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Contacto</th>
              <th className="p-3 text-left">Registrado</th>
              <th className="p-3 text-left">Acciones</th>
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
        className="border-t transition hover:bg-gray-50"
      >
        {/* Nombre */}
        <td className="p-4 font-medium text-gray-900">
          {cliente.name}
        </td>

        {/* Contacto */}
        <td className="p-4">
          <div className="text-sm text-gray-700">
            {cliente.email}
          </div>
          <div className="text-xs text-gray-500">
            {cliente.phone || "Sin teléfono"}
          </div>
        </td>

        {/* Fecha */}
        <td className="p-4 text-sm text-gray-600">
          {new Date(cliente.createdAt).toLocaleDateString()}
        </td>

        {/* Acciones */}
        <td className="p-4">
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver historial
            </button>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 transition"
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
