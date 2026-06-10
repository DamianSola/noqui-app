// src/app/negocios/[id]/edit/page.tsx
'use client'
import React, { useState, useEffect } from "react";
import EditBusinessForm from "@/components/forms/EditBusinessForm";
import { businessService} from "@/services/business";
// import type { Business } from "@/types/business.ts";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Business {
  id: string;
  name: string;
  guests: any[];
  owner: string;
} 

// interface ResponseData {
//   id: string;
//   name: string;
//   guests: any[];
//   owner: string;
// }

export default function EditBusinessPage({ params }: PageProps) {
     const { id } = React.use(params);
  
  const [business, setBusiness] = useState<Business>({ id: '', name: '', guests: [] , owner: ''});

    const fetchBusiness = async () => {
        // console.log("Fetching business with id:", id);

      const data : Business | any = await businessService.getById(id);

        if (!data) {
          console.log("Fetched business data:", data);
          throw new Error(`Business with id ${id} not found`);
        }
      
      setBusiness({
        id: data.id,
        name: data.name,
        guests: data.guests,
        owner: data.owner
      });
    }
  useEffect(() => {
   fetchBusiness()
  }, []);

// console.log(business)

return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8">
      <EditBusinessForm
        business={business}
        onUpdated={(b) => {
          console.log("Negocio actualizado", b);
        }}
        onDeleted={() => {
          // Podés usar redirect, router.push, etc., pero acá estás en server.
          // Lo típico es manejar esto en el Client Component (por ejemplo usando useRouter).
          console.log("Negocio eliminado");
        }}
      />
    </div>
  );
}
