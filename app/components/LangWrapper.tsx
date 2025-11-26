'use client'

import { useI18n } from '@/lib/i18n-context'
import { useEffect } from 'react'

export default function LangWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <>{children}</>
}

