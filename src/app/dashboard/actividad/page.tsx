// app/dashboard/actividad/page.tsx
'use client';

export default function ActividadPage() {
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Análisis y Reportes
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Resumen de ventas, productos y rendimiento.
        </p>
      </div>

      {/* Stats Principales */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Ventas del Mes</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">$103,100</p>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">+15% vs mes anterior</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Pedidos del Mes</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">42</p>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">+12% vs mes anterior</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Ticket Promedio</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">$2,455</p>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">+3% vs mes anterior</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Clientes Nuevos</h3>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">8</p>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">+5% vs mes anterior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de Ventas */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">Ventas de la Semana</h2>
          <div className="space-y-2">
            {datosVentas.labels.map((dia, index) => (
              <div key={dia} className="flex items-center">
                <span className="w-12 text-sm text-slate-600 dark:text-slate-400">{dia}</span>
                <div className="ml-2 flex-1">
                  <div
                    className="h-6 rounded bg-blue-500 dark:bg-blue-600"
                    style={{ width: `${(datosVentas.ventas[index] / 30000) * 100}%` }}
                  >
                    <span className="pl-2 text-xs text-white">
                      ${datosVentas.ventas[index].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Populares */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">Productos Más Vendidos</h2>
          <div className="space-y-3">
            {productosPopulares.map((producto) => (
              <div key={producto.nombre}>
                <div className="mb-1 flex justify-between">
                  <span className="font-medium text-slate-900 dark:text-slate-100">{producto.nombre}</span>
                  <span className="text-slate-600 dark:text-slate-400">{producto.ventas} ventas</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-emerald-500 dark:bg-emerald-500"
                    style={{ width: `${producto.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios Pico */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">Horarios de Mayor Demanda</h2>
          <div className="space-y-2">
            {['12:00-14:00', '14:00-16:00', '18:00-20:00', '20:00-22:00'].map((horario, index) => (
              <div key={horario} className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">{horario}</span>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-amber-500 dark:bg-amber-500"
                      style={{ width: `${[40, 60, 35, 25][index]}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{[40, 60, 35, 25][index]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de Performance */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">Métricas de Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Tiempo Promedio de Preparación</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">12 min</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-2 w-[60%] rounded-full bg-blue-500 dark:bg-blue-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Satisfacción del Cliente</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">4.8/5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-2 w-[96%] rounded-full bg-emerald-500 dark:bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Pedidos a Tiempo</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">94%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-2 w-[94%] rounded-full bg-violet-500 dark:bg-violet-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
