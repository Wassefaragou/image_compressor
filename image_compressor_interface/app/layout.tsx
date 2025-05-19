import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dimensionality Reduction by Autoencoder",
  description: "An integrated project for image dimensionality reduction using autoencoders",
  icons: {
    icon: "/favicon.ico",              
    shortcut: "/favicon.ico",          
    other: [
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="autoencoder-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
