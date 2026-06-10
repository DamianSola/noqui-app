import type { ActivityEvent } from "@/types/business.ts";
import { ACTIVITY_EVENTS } from "@/helpers/business";

interface ActivityItemProps extends ActivityEvent {
  isLast: boolean;
}

function ActivityItem({ action, detail, time, dot, isLast }: ActivityItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center mt-1">
        <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
        {!isLast && (
          <span className="w-px flex-1 bg-neutral-200 dark:bg-neutral-800 mt-1 min-h-[28px]" />
        )}
      </div>
      <div className="pb-4">
        <p className="text-sm font-semibold">{action}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{detail}</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

export function ActivityTab() {
  return (
    <section className="space-y-0">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
        Actividad reciente
      </h2>
      {ACTIVITY_EVENTS.map((event, i) => (
        <ActivityItem
          key={i}
          {...event}
          isLast={i === ACTIVITY_EVENTS.length - 1}
        />
      ))}
    </section>
  );
}