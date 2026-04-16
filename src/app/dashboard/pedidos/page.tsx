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
      pendiente:
        'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800',
      preparando:
        'bg-blue-100 text-blue-900 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800',
      listo:
        'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800',
      entregado:
        'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
    };
    return colors[estado as keyof typeof colors];
  };

  const getTipoColor = (tipo: Pedido['tipo']) =>
    tipo === 'local'
      ? 'bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800'
      : 'bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800';

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Gestión de Pedidos
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Seguimiento de pedidos y totales del día.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          + Nuevo Pedido
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Pedidos Hoy</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{pedidos.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Pendientes</h3>
          <p className="mt-2 text-2xl font-semibold text-amber-600 dark:text-amber-400">
            {pedidos.filter(p => p.estado === 'pendiente').length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">En Preparación</h3>
          <p className="mt-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {pedidos.filter(p => p.estado === 'preparando').length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total del Día</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            ${pedidos.reduce((acc, p) => acc + p.total, 0)}
          </p>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Pedido #{pedido.id}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{pedido.cliente}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${getEstadoColor(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${getTipoColor(pedido.tipo)}`}>
                    {pedido.tipo}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">${pedido.total}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{pedido.fecha}</p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Productos:</h4>
              {pedido.productos.map((producto, index) => (
                <div key={index} className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                  <span>
                    {producto.cantidad}x {producto.nombre}
                  </span>
                  <span>${producto.precio * producto.cantidad}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-end space-x-2">
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Actualizar Estado
              </button>
              <button
                type="button"
                className="rounded-lg bg-slate-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
