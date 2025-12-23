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
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{cliente.name}</td>

                <td className="p-3">
                  <div className="text-sm text-gray-600">{cliente.email}</div>
                  <div className="text-sm text-gray-500">{cliente.phone || "—"}</div>
                </td>

                <td className="p-3 text-sm text-gray-600">
                  {new Date(cliente.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    Ver Historial
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    Contactar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
