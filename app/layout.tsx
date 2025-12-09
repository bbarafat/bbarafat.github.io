import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FluidBackground from '@/components/FluidBackground'
import profileData from '@/data/profile.json'

const inter = Inter({ subsets: ['latin'] })

const { personal, skills, experience, projects, education, certifications } = profileData

export const metadata: Metadata = {
  title: 'Arafat Bright Bello - Profile',
  description: personal.title,
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FluidBackground /> 
        {children}
      </body>
    </html>
  )
}

