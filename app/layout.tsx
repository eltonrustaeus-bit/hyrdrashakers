import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hydra Shakers – Din personliga vattenflaska',
  description: 'Trött på din tråkiga vattenflaska? Vi hjälper dig skapa en personlig flaska som speglar vem du är. Premium kvalitet med snabb leverans.',
  keywords: ['vattenflaska', 'personlig', 'custom', 'Sverige', 'hydra shakers'],
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Hydra Shakers – Din personliga vattenflaska',
    description: 'Skapa din unika vattenflaska med Hydra Shakers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
