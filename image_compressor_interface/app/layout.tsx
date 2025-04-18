import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dimensionality Reduction by Autoencoder",
  description: "An integrated project for image dimensionality reduction using autoencoders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="autoencoder-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'