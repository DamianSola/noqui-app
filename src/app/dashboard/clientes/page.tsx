// app/dashboard/clientes/page.tsx
'use client';

import { useState } from 'react';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  pedidos: number;
  totalGastado: number;
  ultimaVisita: string;
}

export default function ClientesPage() {
  const [clientes] = useState<Cliente[]>([
    { id: '1', nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '+5491112345678', pedidos: 12, totalGastado: 28400, ultimaVisita: '2025-10-25' },
    { id: '2', nombre: 'María González', email: 'maria@email.com', telefono: '+5491112345679', pedidos: 8, totalGastado: 17600, ultimaVisita: '2025-10-27' },
    { id: '3', nombre: 'Carlos Rodríguez', email: 'carlos@email.com', telefono: '+5491112345680', pedidos: 15, totalGastado: 38500, ultimaVisita: '2025-10-26' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
          <h3 className="text-gray-500">Clientes Recurrentes</h3>
          <p className="text-2xl font-bold text-green-600">
            {clientes.filter(c => c.pedidos > 5).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Ticket Promedio</h3>
          <p className="text-2xl font-bold">
            ${(clientes.reduce((acc, c) => acc + c.totalGastado, 0) / clientes.length).toFixed(0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pedidos Hoy</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Contacto</th>
              <th className="p-3 text-left">Pedidos</th>
              <th className="p-3 text-left">Total Gastado</th>
              <th className="p-3 text-left">Última Visita</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{cliente.nombre}</td>
                <td className="p-3">
                  <div className="text-sm text-gray-600">{cliente.email}</div>
                  <div className="text-sm text-gray-500">{cliente.telefono}</div>
                </td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {cliente.pedidos} pedidos
                  </span>
                </td>
                <td className="p-3 font-semibold">${cliente.totalGastado}</td>
                <td className="p-3 text-sm text-gray-600">{cliente.ultimaVisita}</td>
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