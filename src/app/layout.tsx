import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog Platform',
  description: 'A simple blog platform built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Blog Platform</h1>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
          <Toaster position="bottom-right" />
        </main>
      </body>
    </html>
  )
}