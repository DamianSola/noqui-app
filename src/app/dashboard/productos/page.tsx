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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Productos</h3>
          <p className="text-2xl font-bold">{productos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Stock Bajo</h3>
          <p className="text-2xl font-bold text-red-600">
            {productos.filter(p => p.stock < 10).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Precio Promedio</h3>
          <p className="text-2xl font-bold">
            ${(productos.reduce((acc, p) => acc + p.precio, 0) / productos.length).toFixed(0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Activos</h3>
          <p className="text-2xl font-bold text-green-600">
            {productos.filter(p => p.activo).length}
          </p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full p-2 border rounded-lg"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{producto.nombre}</td>
                <td className="p-3">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {producto.categoria}
                  </span>
                </td>
                <td className="p-3 font-semibold">${producto.precio}</td>
                <td className="p-3">
                  <span className={producto.stock < 10 ? 'text-red-600 font-semibold' : ''}>
                    {producto.stock} unidades
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    producto.activo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800">
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