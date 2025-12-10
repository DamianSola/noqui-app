// app/companies/new/page.tsx (para App Router)
import { Metadata } from 'next';
import CreateCompanyForm from '@/components/forms/CreateBusinessForm';

export const metadata: Metadata = {
  title: 'Crear Nueva Empresa',
  description: 'Crea una nueva empresa y compártela con tu equipo',
};

export default function NewCompanyPage() {
  return <CreateCompanyForm />;
}