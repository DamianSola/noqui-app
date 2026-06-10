interface DashboardHeaderProps {
  userName: string | null;
  businessCount: number;
}

export function DashboardHeader({ userName, businessCount }: DashboardHeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  const today = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // capitalize first letter
  const todayStr = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{todayStr}</p>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mt-0.5">
          {greeting}, {userName ?? "empresario"} 👋
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Tenés <span className="font-medium text-neutral-700 dark:text-neutral-300">{businessCount} negocios</span> activos este mes.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/negocios/nuevo"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Nuevo negocio
        </a>
        <a
          href="/configuracion"
          className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
          </svg>
        </a>
      </div>
    </div>
  );
}