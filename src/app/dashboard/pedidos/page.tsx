// app/dashboard/pedidos/page.tsx
'use client';

import { useState } from 'react';

interface Pedido {
  id: string;
  cliente: string;
  productos: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  estado: 'pendiente' | 'preparando' | 'listo' | 'entregado';
  fecha: string;
  tipo: 'local' | 'delivery';
}

export default function PedidosPage() {
  const [pedidos] = useState<Pedido[]>([
    {
      id: '001',
      cliente: 'Juan Pérez',
      productos: [
        { nombre: 'Jamón y Queso', cantidad: 2, precio: 1800 },
        { nombre: 'Coca-Cola', cantidad: 1, precio: 800 }
      ],
      total: 4400,
      estado: 'preparando',
      fecha: '2025-10-28 14:30',
      tipo: 'local'
    },
    {
      id: '002',
      cliente: 'María González',
      productos: [
        { nombre: 'Lomito', cantidad: 1, precio: 3000 }
      ],
      total: 3000,
      estado: 'pendiente',
      fecha: '2025-10-28 14:25',
      tipo: 'delivery'
    }
  ]);

  const getEstadoColor = (estado: string) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      preparando: 'bg-blue-100 text-blue-800',
      listo: 'bg-green-100 text-green-800',
      entregado: 'bg-gray-100 text-gray-800'
    };
    return colors[estado as keyof typeof colors];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nuevo Pedido
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pedidos Hoy</h3>
          <p className="text-2xl font-bold">{pedidos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {pedidos.filter(p => p.estado === 'pendiente').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">En Preparación</h3>
          <p className="text-2xl font-bold text-blue-600">
            {pedidos.filter(p => p.estado === 'preparando').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total del Día</h3>
          <p className="text-2xl font-bold">
            ${pedidos.reduce((acc, p) => acc + p.total, 0)}
          </p>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
                <p className="text-gray-600">{pedido.cliente}</p>
                <span className={`px-2 py-1 rounded text-sm ${getEstadoColor(pedido.estado)}`}>
                  {pedido.estado.toUpperCase()}
                </span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  pedido.tipo === 'local' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {pedido.tipo.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${pedido.total}</p>
                <p className="text-sm text-gray-500">{pedido.fecha}</p>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-semibold mb-2">Productos:</h4>
              {pedido.productos.map((producto, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{producto.cantidad}x {producto.nombre}</span>
                  <span>${producto.precio * producto.cantidad}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2 mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Actualizar Estado
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}