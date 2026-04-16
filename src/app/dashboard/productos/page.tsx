// app/dashboard/productos/page.tsx
'use client';

import { useState } from 'react';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  activo: boolean;
}

export default function ProductosPage() {
  const [productos] = useState<Producto[]>([
    { id: '1', nombre: 'Jamón y Queso', precio: 1800, categoria: 'Clásicos', stock: 45, activo: true },
    { id: '2', nombre: 'Milanesa Completa', precio: 2500, categoria: 'Especiales', stock: 30, activo: true },
    { id: '3', nombre: 'Lomito', precio: 3000, categoria: 'Premium', stock: 25, activo: true },
    { id: '4', nombre: 'Veggie', precio: 2200, categoria: 'Saludables', stock: 20, activo: true },
  ]);

  const [filtro, setFiltro] = useState('');

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Gestión de Productos
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Catálogo, stock y estado de tus productos.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Productos</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{productos.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Stock Bajo</h3>
          <p className="mt-2 text-2xl font-semibold text-rose-600 dark:text-rose-400">
            {productos.filter(p => p.stock < 10).length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Precio Promedio</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            ${(productos.reduce((acc, p) => acc + p.precio, 0) / productos.length).toFixed(0)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Activos</h3>
          <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {productos.filter(p => p.activo).length}
          </p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Tabla de Productos */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Producto</th>
              <th className="px-4 py-3 text-left font-semibold">Categoría</th>
              <th className="px-4 py-3 text-left font-semibold">Precio</th>
              <th className="px-4 py-3 text-left font-semibold">Stock</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
              <th className="px-4 py-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr
                key={producto.id}
                className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{producto.nombre}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {producto.categoria}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">${producto.precio}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      producto.stock < 10
                        ? 'font-semibold text-rose-600 dark:text-rose-400'
                        : 'text-slate-700 dark:text-slate-300'
                    }
                  >
                    {producto.stock} unidades
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      producto.activo
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                    }`}
                  >
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="mr-3 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                  >
                    {producto.activo ? 'Desactivar' : 'Activar'}
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
