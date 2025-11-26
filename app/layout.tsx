import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Omega-Visual | The Operating System for Code',
  description: 'Build compilers, kernels and optimized software through visual nodes. Assembly x86-64 to execution, in real-time.',
  openGraph: {
    title: 'Omega-Visual - Visual Assembly Development',
    description: 'The first visual node editor for system development. Houdini meets Assembly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omega-Visual - Visual Assembly Development',
    description: 'The first visual node editor for system development. Houdini meets Assembly.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

