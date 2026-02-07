import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import ScrollBackground from '@/components/ScrollBackground'

export const metadata: Metadata = {
  title: 'Design Engineer',
  description: 'Coded prototypes and collapsing design/engineering roles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScrollBackground />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
