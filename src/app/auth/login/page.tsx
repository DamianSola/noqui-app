import { connection } from 'next/server'
import LoginForm from '@/components/authComponents/LoginForm';

export default async function LoginPage() {
   await connection()
  return <LoginForm />;
}