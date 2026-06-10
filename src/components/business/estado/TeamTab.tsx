import type { Business } from "@/types/business.ts";
import { Avatar } from "./Avatar";

interface MemberRowProps {
  seed: string;
  label: string;
  role: "owner" | "guest";
}

function MemberRow({ seed, label, role }: MemberRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-3">
        <Avatar seed={seed} size="md" />
        <div>
          <p className="text-sm font-semibold">
            {role === "owner" ? "Propietario" : "Colaborador"}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            {seed}
          </p>
        </div>
      </div>
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
          role === "owner"
            ? "text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40"
            : "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800"
        }`}
      >
        {role === "owner" ? "Owner" : "Invitado"}
      </span>
    </div>
  );
}

interface TeamTabProps {
  business: Pick<Business, "ownerId" | "guests">;
}

export function TeamTab({ business }: TeamTabProps) {
  const { ownerId, guests } = business;
  const totalMembers = guests.length + 1;

  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Miembros del equipo ({totalMembers})
      </h2>

      <MemberRow seed={ownerId} label="Propietario" role="owner" />

      {guests.map((g) => (
        <MemberRow key={g} seed={g} label="Colaborador" role="guest" />
      ))}

      <button className="w-full py-3 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-sm text-neutral-500 dark:text-neutral-400 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
        + Invitar colaborador
      </button>
    </section>
  );
}