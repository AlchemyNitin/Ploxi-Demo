// src/app/layout.js
import { CartProvider } from '@/contexts/CartContext'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar' // New component
import './globals.css'

export const metadata = {
  title: 'Ploxi Earth | Sustainability Platform',
  description: 'Comprehensive ESG tracking, compliance management, and sustainability solutions.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ConditionalNavbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
