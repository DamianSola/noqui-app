// app/dashboard/analisis/page.tsx
'use client';

export default function AnalisisPage() {
  const datosVentas = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    ventas: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
    pedidos: [8, 12, 10, 15, 18, 22, 20]
  };

  const productosPopulares = [
    { nombre: 'Jamón y Queso', ventas: 45, porcentaje: 25 },
    { nombre: 'Lomito', ventas: 38, porcentaje: 21 },
    { nombre: 'Milanesa Completa', ventas: 32, porcentaje: 18 },
    { nombre: 'Pollo', ventas: 28, porcentaje: 16 },
    { nombre: 'Veggie', ventas: 20, porcentaje: 11 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Análisis y Reportes</h1>

      {/* Stats Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Ventas del Mes</h3>
          <p className="text-2xl font-bold">$103,100</p>
          <p className="text-green-600 text-sm">+15% vs mes anterior</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pedidos del Mes</h3>
          <p className="text-2xl font-bold">42</p>
          <p className="text-green-600 text-sm">+12% vs mes anterior</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Ticket Promedio</h3>
          <p className="text-2xl font-bold">$2,455</p>
          <p className="text-green-600 text-sm">+3% vs mes anterior</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Clientes Nuevos</h3>
          <p className="text-2xl font-bold">8</p>
          <p className="text-green-600 text-sm">+5% vs mes anterior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ventas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Ventas de la Semana</h2>
          <div className="space-y-2">
            {datosVentas.labels.map((dia, index) => (
              <div key={dia} className="flex items-center">
                <span className="w-12 text-sm">{dia}</span>
                <div className="flex-1 ml-2">
                  <div 
                    className="bg-blue-500 h-6 rounded"
                    style={{ width: `${(datosVentas.ventas[index] / 30000) * 100}%` }}
                  >
                    <span className="text-white text-xs pl-2">
                      ${datosVentas.ventas[index].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Populares */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Productos Más Vendidos</h2>
          <div className="space-y-3">
            {productosPopulares.map((producto) => (
              <div key={producto.nombre}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{producto.nombre}</span>
                  <span className="text-gray-600">{producto.ventas} ventas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${producto.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios Pico */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Horarios de Mayor Demanda</h2>
          <div className="space-y-2">
            {['12:00-14:00', '14:00-16:00', '18:00-20:00', '20:00-22:00'].map((horario, index) => (
              <div key={horario} className="flex justify-between items-center">
                <span>{horario}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${[40, 60, 35, 25][index]}%` }}
                    ></div>
                  </div>
                  <span>{[40, 60, 35, 25][index]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Métricas de Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Tiempo Promedio de Preparación</span>
                <span className="font-semibold">12 min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Satisfacción del Cliente</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Pedidos a Tiempo</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}