// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';
'use client';
import CompaniesSection from '@/components/business/businessSeccion';
import { useEffect, useState } from "react";
import { getCompanyByOwnerId } from "@/services/business";
// import { useAuth } from '@/context/authContext';
// import CompaniesSection from "@/components/CompaniesSection";
import { useSession } from 'next-auth/react';


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
    ownerId = data.user.data.user.id;
    // @ts-ignore
    token = data.user.data.token;
  }

  // console.log(ownerId)
 const fetchCompanies = async () => {
      try {
        const data = await getCompanyByOwnerId(ownerId, token);
        setBusiness(data.data);
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

