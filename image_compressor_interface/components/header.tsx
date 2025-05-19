import Link from "next/link"
import Image from "next/image"
import { Home, Users } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-40 h-20 transform hover:scale-105 transition-transform">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-removebg-preview-U7Q7nc9m083YbQ2g5LTP6WzpaOLNKE.png"
                  alt="Université Mohammed V de Rabat"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="relative w-40 h-20 transform hover:scale-105 transition-transform">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emi-LOGO1-QmZHSTYLuyKNtXXvMGjrAubDniW8NW.png"
                  alt="EMI Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors font-medium"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors font-medium"
              >
                <Users size={20} />
                <span>About Us</span>
              </Link>
            </nav>

            <div className="md:hidden">{/* Mobile menu button would go here if needed */}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
