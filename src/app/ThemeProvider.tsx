// components/ThemeProvider.jsx
'use client' // ✅ DEBE ser Client Component

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }:any) {
  const [mounted, setMounted] = useState(false)
  
  // ✅ EVITA HYDRATION MISMATCH
  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ Render placeholder hasta montaje en cliente
  if (!mounted) {
    return <>{children}</> // Sin tema aplicado temporalmente
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}