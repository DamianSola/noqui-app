// hooks/useAuthToken.ts
import { useSession } from 'next-auth/react';

export function useAuthToken() {
  const { data: session } = useSession();
  return session?.accessToken || null;
}

// Uso:
// const token = useAuthToken();