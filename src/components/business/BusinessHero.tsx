import type { Business } from "@/types/business.ts";
import { formatDate } from "@/helpers/business";
import { Avatar } from "./estado/Avatar";

const MAX_VISIBLE_AVATARS = 4;

interface BusinessHeroProps {
  business: Business;
}

export function BusinessHero({ business }: BusinessHeroProps) {
  const { name, slug, guests, ownerId, createdAt, updatedAt, deletedAt } =
    business;

  const visibleGuests = guests.slice(0, MAX_VISIBLE_AVATARS);
  const hiddenCount = guests.length - MAX_VISIBLE_AVATARS;

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 p-8 sm:p-10 shadow-xl">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-6">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-3xl font-bold text-white shadow-inner shrink-0">
          {name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
              /{slug}
            </span>
            {deletedAt ? (
              <span className="text-xs font-medium text-red-200 bg-red-500/30 px-2 py-0.5 rounded-full">
                Eliminado
              </span>
            ) : (
              <span className="text-xs font-medium text-emerald-200 bg-emerald-500/30 px-2 py-0.5 rounded-full">
                Activo
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight truncate">
            {name}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Creado el {formatDate(createdAt)} · Actualizado el{" "}
            {formatDate(updatedAt)}
          </p>
        </div>

        {/* Guest avatars */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex -space-x-2">
            <Avatar seed={ownerId} size="md" />
            {visibleGuests.map((g) => (
              <Avatar key={g} seed={g} size="md" />
            ))}
            {hiddenCount > 0 && (
              <span className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs text-white font-semibold">
                +{hiddenCount}
              </span>
            )}
          </div>
          <span className="text-xs text-white/70 hidden sm:block">
            colaboradores
          </span>
        </div>
      </div>
    </section>
  );
}