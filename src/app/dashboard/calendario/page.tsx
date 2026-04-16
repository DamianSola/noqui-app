// app/dashboard/calendario/page.tsx
'use client';

import { useState } from 'react';

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // YYYY-MM-DD
  hora: string;
  tipo: 'pedido' | 'entrega' | 'reunion' | 'mantenimiento' | 'otro';
  cliente?: string;
  completado: boolean;
}

export default function CalendarioPage() {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [vista, setVista] = useState<'mes' | 'semana' | 'dia'>('mes');
  const [eventos] = useState<Evento[]>([
    {
      id: '1',
      titulo: 'Pedido Grande - Empresa XYZ',
      descripcion: '30 sándwiches para reunión corporativa',
      fecha: '2025-10-29',
      hora: '10:00',
      tipo: 'pedido',
      cliente: 'Empresa XYZ',
      completado: false
    },
    {
      id: '2',
      titulo: 'Entrega a Oficina Central',
      descripcion: 'Delivery de pedido #045',
      fecha: '2025-10-29',
      hora: '12:30',
      tipo: 'entrega',
      cliente: 'Carlos Rodríguez',
      completado: false
    },
    {
      id: '3',
      titulo: 'Reunión con Proveedor',
      descripcion: 'Renegociación precios de pan',
      fecha: '2025-10-30',
      hora: '09:00',
      tipo: 'reunion',
      completado: false
    },
    {
      id: '4',
      titulo: 'Mantenimiento Horno',
      descripcion: 'Limpieza y mantenimiento programado',
      fecha: '2025-11-02',
      hora: '16:00',
      tipo: 'mantenimiento',
      completado: false
    },
    {
      id: '5',
      titulo: 'Pedido Aniversario',
      descripcion: 'Fiesta de 50 personas',
      fecha: '2025-11-05',
      hora: '14:00',
      tipo: 'pedido',
      cliente: 'Familia González',
      completado: false
    }
  ]);

  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    tipo: 'pedido' as Evento['tipo'],
    cliente: ''
  });

  // Navegación del calendario
  const mesAnterior = () => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1));
  };

  const mesSiguiente = () => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 1));
  };

  const hoy = () => {
    setFechaActual(new Date());
  };

  // Generar días del mes
  const generarDiasMes = () => {
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();
    
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    
    const dias = [];
    
    // Días del mes anterior (para completar la primera semana)
    const diaInicioSemana = primerDia.getDay();
    const mesAnteriorUltimoDia = new Date(year, month, 0).getDate();
    
    for (let i = diaInicioSemana - 1; i >= 0; i--) {
      dias.push({
        fecha: new Date(year, month - 1, mesAnteriorUltimoDia - i),
        esMesActual: false,
        eventos: []
      });
    }
    
    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(year, month, dia);
      const eventosDia = eventos.filter(evento => 
        evento.fecha === fecha.toISOString().split('T')[0]
      );
      
      dias.push({
        fecha,
        esMesActual: true,
        eventos: eventosDia
      });
    }
    
    // Días del siguiente mes (para completar la última semana)
    const diasRestantes = 42 - dias.length; // 6 semanas * 7 días
    for (let dia = 1; dia <= diasRestantes; dia++) {
      dias.push({
        fecha: new Date(year, month + 1, dia),
        esMesActual: false,
        eventos: []
      });
    }
    
    return dias;
  };

  const dias = generarDiasMes();
  const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getColorTipo = (tipo: Evento['tipo']) => {
    const colores = {
      pedido:
        'border border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200',
      entrega:
        'border border-emerald-200 bg-emerald-100 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200',
      reunion:
        'border border-violet-200 bg-violet-100 text-violet-900 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200',
      mantenimiento:
        'border border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
      otro:
        'border border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
    };
    return colores[tipo];
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500';

  const agregarEvento = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el evento
    alert('Evento agregado exitosamente');
    setNuevoEvento({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      tipo: 'pedido',
      cliente: ''
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Calendario
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Eventos, pedidos y recordatorios.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          + Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendario Principal */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          {/* Controles */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={mesAnterior}
                className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                ←
              </button>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}
              </h2>
              <button
                type="button"
                onClick={mesSiguiente}
                className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                →
              </button>
              <button
                type="button"
                onClick={hoy}
                className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Hoy
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setVista('mes')}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  vista === 'mes'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Mes
              </button>
              <button
                type="button"
                onClick={() => setVista('semana')}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  vista === 'semana'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => setVista('dia')}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  vista === 'dia'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Día
              </button>
            </div>
          </div>

          {/* Vista Mensual */}
          {vista === 'mes' && (
            <div className="grid grid-cols-7 gap-1">
              {/* Encabezado de días */}
              {nombresDias.map(dia => (
                <div
                  key={dia}
                  className="p-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-400"
                >
                  {dia}
                </div>
              ))}
              
              {/* Días del calendario */}
              {dias.map((dia, index) => (
                <div
                  key={index}
                  className={`min-h-24 rounded-lg border p-2 transition-colors ${
                    dia.esMesActual
                      ? 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800/60'
                      : 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500'
                  } ${
                    dia.fecha.toDateString() === new Date().toDateString()
                      ? 'border-2 border-blue-500 ring-1 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20'
                      : ''
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center text-sm font-medium ${
                        dia.fecha.toDateString() === new Date().toDateString()
                          ? 'rounded-full bg-blue-600 text-white dark:bg-blue-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {dia.fecha.getDate()}
                    </span>
                  </div>
                  
                  {/* Eventos del día */}
                  <div className="space-y-1">
                    {dia.eventos.slice(0, 2).map(evento => (
                      <div
                        key={evento.id}
                        className={`text-xs p-1 rounded border ${getColorTipo(evento.tipo)} truncate`}
                        title={evento.titulo}
                      >
                        {evento.hora} {evento.titulo}
                      </div>
                    ))}
                    {dia.eventos.length > 2 && (
                      <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                        +{dia.eventos.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vista Semana (simplificada) */}
          {vista === 'semana' && (
            <div className="text-center p-8 text-slate-500 dark:text-slate-400">
              Vista Semanal - En desarrollo
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-500">
                Próximamente podrás ver tu semana de trabajo organizada
              </div>
            </div>
          )}

          {/* Vista Día (simplificada) */}
          {vista === 'dia' && (
            <div className="text-center p-8 text-slate-500 dark:text-slate-400">
              Vista Diaria - En desarrollo
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-500">
                Próximamente podrás gestionar tu día hora por hora
              </div>
            </div>
          )}
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Formulario Nuevo Evento */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">Nuevo Evento</h3>
            <form onSubmit={agregarEvento} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Título
                </label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={nuevoEvento.titulo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Descripción
                </label>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={nuevoEvento.descripcion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    className={inputClass}
                    value={nuevoEvento.fecha}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, fecha: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Hora
                  </label>
                  <input
                    type="time"
                    required
                    className={inputClass}
                    value={nuevoEvento.hora}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, hora: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tipo
                </label>
                <select
                  className={inputClass}
                  value={nuevoEvento.tipo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, tipo: e.target.value as Evento['tipo']})}
                >
                  <option value="pedido">Pedido</option>
                  <option value="entrega">Entrega</option>
                  <option value="reunion">Reunión</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Cliente (opcional)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={nuevoEvento.cliente}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, cliente: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Agregar Evento
              </button>
            </form>
          </div>

          {/* Próximos Eventos */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">Próximos Eventos</h3>
            <div className="space-y-3">
              {eventos.slice(0, 5).map(evento => (
                <div
                  key={evento.id}
                  className="rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{evento.titulo}</h4>
                    <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${getColorTipo(evento.tipo)}`}>
                      {evento.tipo}
                    </span>
                  </div>
                  <p className="mb-2 text-xs text-slate-600 dark:text-slate-400">{evento.descripcion}</p>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{evento.fecha} a las {evento.hora}</span>
                    {evento.cliente && <span>{evento.cliente}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leyenda */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">Leyenda</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded border border-blue-200 bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Pedidos</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded border border-emerald-200 bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Entregas</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded border border-violet-200 bg-violet-100 dark:border-violet-800 dark:bg-violet-950/60" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Reuniones</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded border border-amber-200 bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Mantenimiento</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Otros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}