// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';
'use client';
import CompaniesSection from '@/components/business/businessSeccion';
import { useEffect, useState } from "react";
import {businessService} from "@/services/business";
// import { useAuth } from '@/context/authContext';
// import CompaniesSection from "@/components/CompaniesSection";
import { useSession } from 'next-auth/react';
import { Business } from '@/types/business';


interface Company {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  guests: string[];
}

interface CompaniesPageProps {
  companies: Company[];
}

const CompaniesPage: React.FC<CompaniesPageProps> = () => {
 const [business, setBusiness] = useState([]);
  let ownerId: string = "ID_DEL_USUARIO_LOGUEADO";
  let token: string | undefined = undefined;
 

  const {data} = useSession();


  if(data && data.user) {
    // @ts-ignore
    ownerId = data.user.id;
    // @ts-ignore
    // token = data.accessToken;
  }

  // console.log(ownerId)
 const fetchCompanies = async () => {
      try {
        const data: Business[] = await businessService.getAll();
        // console.log("Empresas obtenidas:", data);
      // @ts-expect-error
        setBusiness(data);        
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

  useEffect(() => {

    fetchCompanies();
  }, [ownerId]);
  return( <CompaniesSection business={business} />);
};



export default CompaniesPage;

