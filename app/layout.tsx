import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ClientProviders from "@/components/ClientProviders"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Iterio - Herramienta para agencias de viajes",
  description:
    "Simplifica tus cotizaciones de viajes a medida con Iterio, la herramienta pensada para agencias de viajes pequeñas.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <ClientProviders>
          <div className={inter.className}>
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
