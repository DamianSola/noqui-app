// app/dashboard/configuracion/page.tsx
'use client';

import { useState } from 'react';

export default function ConfiguracionPage() {
  const [config, setConfig] = useState({
    nombreNegocio: 'El Buen Sabor',
    telefono: '+5491112345678',
    email: 'contacto@elbuensabor.com',
    direccion: 'Av. Principal 123, Ciudad',
    horarioApertura: '08:00',
    horarioCierre: '23:00',
    impuestos: 21,
    delivery: true,
    costoDelivery: 500,
    notificaciones: true,
  });

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>

      <div className="max-w-2xl">
        {/* Información del Negocio */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Información del Negocio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Negocio
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={config.nombreNegocio}
                onChange={(e) => setConfig({...config, nombreNegocio: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={config.telefono}
                onChange={(e) => setConfig({...config, telefono: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={config.email}
                onChange={(e) => setConfig({...config, email: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={config.direccion}
                onChange={(e) => setConfig({...config, direccion: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Horarios de Atención</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apertura
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg"
                value={config.horarioApertura}
                onChange={(e) => setConfig({...config, horarioApertura: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cierre
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg"
                value={config.horarioCierre}
                onChange={(e) => setConfig({...config, horarioCierre: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Configuración de Ventas */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Configuración de Ventas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impuestos (%)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={config.impuestos}
                onChange={(e) => setConfig({...config, impuestos: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo Delivery
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={config.costoDelivery}
                onChange={(e) => setConfig({...config, costoDelivery: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={config.delivery}
                onChange={(e) => setConfig({...config, delivery: e.target.checked})}
              />
              <span className="text-sm font-medium text-gray-700">
                Ofrecer servicio de delivery
              </span>
            </label>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={config.notificaciones}
              onChange={(e) => setConfig({...config, notificaciones: e.target.checked})}
            />
            <span className="text-sm font-medium text-gray-700">
              Recibir notificaciones de nuevos pedidos
            </span>
          </label>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancelar
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}