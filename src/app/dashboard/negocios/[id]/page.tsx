import { notFound } from "next/navigation";
import { businessService } from "@/services/business";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessTabs } from "@/components/business/BusinessTabs";

interface BusinessPageProps {
  params: { id: string };
}

/**
 * Server Component — fetches data and composes layout.
 * All interactivity is delegated to <BusinessTabs> ("use client").
 */
export default async function BusinessPage({ params }: BusinessPageProps) {
  const business = await businessService.getById(params.id).catch(() => null);

  if (!business) notFound();
  else console.log("Business data:", business); // Debug log

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <BusinessHeader name={business.name} businessId={business.id} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <BusinessHero business={business} />
        <BusinessTabs business={business} />
      </main>
    </div>
  );
}