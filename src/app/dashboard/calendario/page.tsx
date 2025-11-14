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
      pedido: 'bg-blue-100 text-blue-800 border-blue-200',
      entrega: 'bg-green-100 text-green-800 border-green-200',
      reunion: 'bg-purple-100 text-purple-800 border-purple-200',
      mantenimiento: 'bg-orange-100 text-orange-800 border-orange-200',
      otro: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colores[tipo];
  };

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
    <div className="p-6 dark">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Calendario</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario Principal */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          {/* Controles */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={mesAnterior}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ←
              </button>
              <h2 className="text-xl font-bold">
                {meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}
              </h2>
              <button 
                onClick={mesSiguiente}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                →
              </button>
              <button 
                onClick={hoy}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
              >
                Hoy
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setVista('mes')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  vista === 'mes' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Mes
              </button>
              <button 
                onClick={() => setVista('semana')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  vista === 'semana' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Semana
              </button>
              <button 
                onClick={() => setVista('dia')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  vista === 'dia' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
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
                <div key={dia} className="p-2 text-center font-semibold text-gray-600 text-sm">
                  {dia}
                </div>
              ))}
              
              {/* Días del calendario */}
              {dias.map((dia, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-2 border rounded-lg ${
                    dia.esMesActual 
                      ? 'bg-white hover:bg-gray-50' 
                      : 'bg-gray-50 text-gray-400'
                  } ${
                    dia.fecha.toDateString() === new Date().toDateString() 
                      ? 'border-blue-500 border-2' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${
                      dia.fecha.toDateString() === new Date().toDateString()
                        ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : ''
                    }`}>
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
                      <div className="text-xs text-gray-500 text-center">
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
            <div className="text-center p-8 text-gray-500">
              Vista Semanal - En desarrollo
              <div className="mt-4 text-sm">
                Próximamente podrás ver tu semana de trabajo organizada
              </div>
            </div>
          )}

          {/* Vista Día (simplificada) */}
          {vista === 'dia' && (
            <div className="text-center p-8 text-gray-500">
              Vista Diaria - En desarrollo
              <div className="mt-4 text-sm">
                Próximamente podrás gestionar tu día hora por hora
              </div>
            </div>
          )}
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Formulario Nuevo Evento */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Nuevo Evento</h3>
            <form onSubmit={agregarEvento} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={nuevoEvento.titulo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  value={nuevoEvento.descripcion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-2 border rounded-lg"
                    value={nuevoEvento.fecha}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, fecha: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full p-2 border rounded-lg"
                    value={nuevoEvento.hora}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, hora: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente (opcional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={nuevoEvento.cliente}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, cliente: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Agregar Evento
              </button>
            </form>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Próximos Eventos</h3>
            <div className="space-y-3">
              {eventos.slice(0, 5).map(evento => (
                <div
                  key={evento.id}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">{evento.titulo}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getColorTipo(evento.tipo)}`}>
                      {evento.tipo}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{evento.descripcion}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{evento.fecha} a las {evento.hora}</span>
                    {evento.cliente && <span>{evento.cliente}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leyenda */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Leyenda</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-2"></div>
                <span className="text-sm">Pedidos</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded mr-2"></div>
                <span className="text-sm">Entregas</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-100 border border-purple-200 rounded mr-2"></div>
                <span className="text-sm">Reuniones</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded mr-2"></div>
                <span className="text-sm">Mantenimiento</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded mr-2"></div>
                <span className="text-sm">Otros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}