// src/app/negocios/[id]/edit/page.tsx
'use client'
import React, { useState, useEffect } from "react";
import EditBusinessForm from "@/components/forms/EditBusinessForm";
import {getBusinessById} from "@/services/business";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default function EditBusinessPage({ params }: PageProps) {
     const { id } = React.use(params);
  
  const [business, setBusiness] = useState({ id: '', name: '', guests: [] , owner: ''});

    const fetchBusiness = async () => {
        // console.log("Fetching business with id:", id);
      const data = await getBusinessById(id);
      console.log("Fetched business data:", data.data);
      
      setBusiness({
        id: data.data.id,
        name: data.data.name,
        guests: data.data.guests || [],
        owner: data.data.owner.name || ''
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
