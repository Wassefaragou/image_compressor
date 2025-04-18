"use client"

import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Footer() {
  // Use client-side rendering for the year to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState("2025")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-700 pb-2">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="bg-blue-700 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <a href="mailto:aragou.wassif@gmail.com" className="hover:text-blue-200 transition-colors">
                  aragou.wassif@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="bg-blue-700 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                  <Phone size={18} />
                </div>
                <a href="tel:+212689212747" className="hover:text-blue-200 transition-colors">
                  +212 689 212 747
                </a>
              </div>
            
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/Wassefaragou/My_projects" className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/wassef-aragou-7569a9270/" className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-700 pb-2">About the Project</h3>
            <p className="text-gray-200 leading-relaxed">
              This project demonstrates advanced dimensionality reduction techniques using autoencoder neural networks.
              Developed as part of research at École Mohammadia d'Ingénieurs (EMI), Université Mohammed V de Rabat, it
              showcases the power of deep learning in image processing.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">© {currentYear} Wassef Aragou. All rights reserved.</p>
          <p className="text-sm text-gray-300">Dimensionality Reduction by Autoencoder | Version 1.0</p>
        </div>
      </div>
    </footer>
  )
}

