"use client";

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        aria-label="Abrir menú"
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-navy-700"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-7 h-7 text-navy-800" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <nav
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-right-10"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar menú"
              className="self-end mb-8 p-2 rounded focus:outline-none focus:ring-2 focus:ring-navy-700"
              onClick={() => setOpen(false)}
            >
              <X className="w-7 h-7 text-navy-800" />
            </button>
            <Link href="#beneficios" className="text-lg font-medium text-navy-800 hover:text-navy-600" onClick={() => setOpen(false)}>
              Beneficios
            </Link>
            <Link href="#contacto" className="text-lg font-medium text-navy-800 hover:text-navy-600" onClick={() => setOpen(false)}>
              Contacto
            </Link>
            <Link href="#" className="text-lg font-medium text-navy-800 hover:text-navy-600" onClick={() => setOpen(false)}>
              Iniciar sesión
            </Link>
            <Link href="#" className="text-lg font-medium text-white bg-navy-700 rounded px-4 py-2 text-center hover:bg-navy-800 transition-colors" onClick={() => setOpen(false)}>
              Probar gratis
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu; 