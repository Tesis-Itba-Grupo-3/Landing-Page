"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Clock, FileIcon as FileTemplate, FileSpreadsheet } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import MobileMenu from "@/components/ui/MobileMenu"
import { useState, useEffect } from "react"

export default function LandingPage() {
  // Hero
  const hero = useInView()
  // Beneficios
  const beneficios = useInView()
  // Demo
  const demo = useInView()
  // Quiénes somos
  const quienes = useInView()
  // Contacto
  const contacto = useInView()

  // Estados para validación y feedback del formulario
  const [formState, setFormState] = useState<'idle' | 'error' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  // Estado para mostrar el botón scroll to top
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Estado para barra de progreso de scroll
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
      setScrollProgress(progress);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Scroll suave para navegación
  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Validación y manejo de envío
  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim();
    const company = (form.elements.namedItem('company') as HTMLInputElement)?.value.trim();
    // Validación simple
    if (!name || !email || !company) {
      setFormError('Por favor, completa todos los campos obligatorios.');
      setFormState('error');
      return;
    }
    // Si pasa validación, enviar a Formspree
    setFormState('idle');
    form.submit();
    setFormState('success');
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra de progreso de scroll */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div
          className="h-1 bg-gradient-to-r from-sky-400 via-navy-500 to-navy-700 transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 mt-2">
            <img
              src="/images/logo-negro.svg"
              alt="Iterio"
              style={{ height: '68px', width: 'auto', display: 'block' }}
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#beneficios"
              onClick={handleSmoothScroll}
              className="text-sm font-medium text-navy-800 hover:text-navy-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 rounded"
            >
              Beneficios
            </a>
            <a
              href="#demo"
              onClick={handleSmoothScroll}
              className="text-sm font-medium text-navy-800 hover:text-navy-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 rounded"
            >
              Demo
            </a>
            <a
              href="#quienes-somos"
              onClick={handleSmoothScroll}
              className="text-sm font-medium text-navy-800 hover:text-navy-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 rounded"
            >
              Quiénes somos
            </a>
            <a
              href="#contacto"
              onClick={handleSmoothScroll}
              className="text-sm font-medium text-navy-800 hover:text-navy-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 rounded"
            >
              Contacto
            </a>
          </nav>
          <MobileMenu />
          <div className="flex items-center gap-4">
            {/* <Button variant="outline" className="hidden md:flex border-navy-700 text-navy-700 hover:bg-navy-50 transition-transform duration-150 hover:scale-105 hover:shadow-lg">
              Iniciar sesión
            </Button> */}
            <Button className="bg-navy-700 text-white hover:bg-navy-800 transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => {
              const contacto = document.getElementById('contacto');
              if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
            }}>Probar gratis</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={hero.ref} className={`relative overflow-hidden bg-gradient-to-b from-white to-sky-50 py-16 md:py-24 transition-all duration-700 ${hero.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Animación de ruta y avión de fondo mejorada con rulo y loop */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <svg width="100%" height="100%" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', right: 0, bottom: 0, width: '100%', height: '100%'}}>
              <defs>
                <linearGradient id="route-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
                {/* Path con curva suave al inicio */}
                <path id="routePath" d="M1300 480 Q1000 400 900 350 Q800 300 700 320 Q600 340 400 200 Q300 150 200 80 Q150 50 100 20" />
              </defs>
              {/* Ruta animada punteada con curva suave */}
              <path
                d="M1300 480 Q1000 400 900 350 Q800 300 700 320 Q600 340 400 200 Q300 150 200 80 Q150 50 100 20"
                stroke="url(#route-fade)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="14 12"
                strokeDashoffset="0">
                <animate
                  attributeName="opacity"
                  values="1;1;0"
                  keyTimes="0;0.8;1"
                  dur="6s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </path>
              {/* Avión animado */}
              <g>
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  keyPoints="0;0.7;1"
                  keyTimes="0;0.7;1"
                  calcMode="linear"
                  rotate="auto">
                  <mpath xlinkHref="#routePath" />
                </animateMotion>
                <polygon points="0,-10 20,0 0,10 6,0" fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
              </g>
            </svg>
          </div>
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex flex-col space-y-6 md:w-1/2">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-navy-900">
                  Simplifica tus cotizaciones de viajes a medida
                </h1>
                <p className="text-lg md:text-xl text-navy-700">
                  Automatizá el armado de los viajes, ganando tiempo y fidelizando a tus viajeros.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-navy-700 text-white hover:bg-navy-800 h-12 px-6 text-base transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => {
                  const contacto = document.getElementById('contacto');
                  if (contacto) contacto.scrollIntoView({ behavior: 'smooth' });
                }}>Solicitar demo</Button>
                {/* <Button
                  variant="outline"
                  className="border-navy-700 text-navy-700 hover:bg-navy-50 h-12 px-6 text-base"
                >
                  Probar gratis
                </Button> */}
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              {/* Animación SVG de ejemplo */}
              <div className="w-full flex items-center justify-center">
                <svg width="340" height="240" viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-lg shadow-lg bg-white">
                  <rect x="20" y="40" width="300" height="160" rx="24" fill="#F1F5FB" />
                  <rect x="50" y="80" width="220" height="20" rx="8" fill="#B3C6E2">
                    <animate attributeName="width" values="220;120;220" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="50" y="120" width="180" height="20" rx="8" fill="#7CA7E6">
                    <animate attributeName="width" values="180;260;180" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="270" cy="160" r="18" fill="#3B82F6">
                    <animate attributeName="cy" values="160;100;160" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <rect x="80" y="170" width="60" height="12" rx="6" fill="#D1E3F8">
                    <animate attributeName="x" values="80;200;80" dur="2.5s" repeatCount="indefinite" />
                  </rect>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white"></div>
        </section>
        {/* Separador onda Hero -> Beneficios */}
        <div className="-mt-4">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20">
            <path fill="#F1F5FB" d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z" />
          </svg>
        </div>
        {/* Benefits Section */}
        <section ref={beneficios.ref} id="beneficios" className={`py-16 md:py-24 transition-all duration-700 ${beneficios.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Beneficios clave para tu agencia</h2>
              <p className="text-lg text-navy-700 max-w-2xl mx-auto">
                Diseñado específicamente para agencias de viajes que crean experiencias personalizadas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Redacción automática de cotizaciones</h3>
                <p className="text-navy-700">
                  Genera documentos profesionales con descripciones detalladas de cada destino y actividad en segundos.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                  <FileTemplate className="w-6 h-6 text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Plantillas adaptadas al tipo de viaje</h3>
                <p className="text-navy-700">
                  Utiliza plantillas específicas para cada tipo de viaje: luna de miel, familiar, aventura, cultural y
                  más.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">Ahorro de tiempo en tareas repetitivas</h3>
                <p className="text-navy-700">
                  Automatiza el proceso de cotización para dedicar más tiempo a lo que realmente importa: tus clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Demo Section */}
        <section ref={demo.ref} id="demo" className={`py-16 md:py-24 bg-gray-50 transition-all duration-700 ${demo.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Demo de la plataforma</h2>
              <p className="text-lg text-navy-700 max-w-3xl mx-auto">
                Mirá un video de cómo Iterio puede transformar la forma en que creas tus cotizaciones.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full rounded-lg min-h-[480px]"
                    src="https://www.loom.com/embed/8aa8c4b5551e4b9fad0c2594b1b9d598?sid=ca13fc5d-ee45-4fe1-b60b-6bf50a4e9a07&hideEmbedTopBar=true&hide_owner=true&hide_speed=true"
                    title="Loom video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
              <div className="mt-6 text-center text-navy-700">
                <p className="text-sm">
                  <span className="font-semibold">Última actualización:</span> 23/06/2025
                </p>
                <p className="text-xs mt-2 max-w-2xl mx-auto">
                  Este video es una demostración de la versión actual de la plataforma. Trabajamos constantemente en mejoras y nuevas funcionalidades, por lo que la versión que pruebes puede tener características adicionales.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Separador onda Beneficios -> Quiénes somos */}
        <div className="-mt-4">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20">
            <path fill="#E6ECF7" d="M0,48 C360,0 1080,80 1440,32 L1440,80 L0,80 Z" />
          </svg>
        </div>
        {/* Quiénes somos Section */}
        <section ref={quienes.ref} id="quienes-somos" className={`py-16 md:py-24 bg-navy-50 transition-all duration-700 flex flex-col items-center border-t border-navy-100 ${quienes.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">Quiénes somos</h2>
            <p className="text-lg text-navy-700 max-w-2xl mx-auto mb-12 text-center">
              Somos un equipo apasionado dedicados a crear soluciones innovadoras para agencias de viajes. Nuestra misión es simplificar procesos y potenciar la creatividad de nuestros clientes a través de la tecnología.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Developer 1 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300 group hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <Image src="/images/Manu.jpg" alt="Manuela Reggio" width={160} height={160} className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Manuela Reggio</h3>
                <p className="text-navy-700 text-center mb-2"></p>
                <a href="https://www.linkedin.com/in/manuela-reggio-6672b524b/" target="_blank" rel="noopener noreferrer" className="text-navy-400 hover:text-navy-700 transition-colors duration-150 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.591v5.605z"/></svg>
                </a>
              </div>
              {/* Developer 2 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300 group hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <Image src="/images/Leo.jpg" alt="Leonel Scalise" width={160} height={160} className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Leonel Scalise</h3>
                <p className="text-navy-700 text-center mb-2"></p>
                <a href="https://www.linkedin.com/in/leonel-scalise-b62690185/" target="_blank" rel="noopener noreferrer" className="text-navy-400 hover:text-navy-700 transition-colors duration-150 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.591v5.605z"/></svg>
                </a>
              </div>
              {/* Developer 3 */}
              <div className="flex flex-col items-center bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300 group hover:-translate-y-2 hover:scale-105 transition-transform ease-in-out">
                <Image src="/images/Isa.jpg" alt="Isabella Serrano" width={160} height={160} className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Isabella Serrano</h3>
                <p className="text-navy-700 text-center mb-2"></p>
                <a href="https://www.linkedin.com/in/isabella-serrano-ortega-609550286/" target="_blank" rel="noopener noreferrer" className="text-navy-400 hover:text-navy-700 transition-colors duration-150 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.591v5.605z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={contacto.ref} id="contacto" className={`py-16 md:py-24 bg-white transition-all duration-700 ${contacto.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">¿Tenes alguna pregunta?</h2>
                <p className="text-lg text-navy-700">
                  Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.
                </p>
              </div>
              <form 
                action="https://formspree.io/f/xdkgjzno" 
                method="POST" 
                className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm relative"
                onSubmit={handleContactSubmit}
                role="form"
              >
                {/* Feedback visual accesible */}
                <div aria-live="polite">
                  {formError && (
                    <div className="mb-2 text-red-600 text-center animate-pulse">{formError}</div>
                  )}
                  {formState === 'success' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl z-10 animate-in fade-in">
                      {/* Avión de papel animado */}
                      <svg className="w-16 h-16 text-green-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12L3 3L7 12L3 21L21 12Z" className="animate-bounce">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 12 12; 15 12 12; 0 12 12"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                      <p className="text-lg font-semibold text-green-700">¡Mensaje enviado con éxito!</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-navy-700">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="Tu nombre" 
                      className="placeholder:text-navy-400 border-navy-200 focus-visible:ring-2 focus-visible:ring-navy-500 focus:border-navy-700 transition-all" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-navy-700">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="placeholder:text-navy-400 border-navy-200 focus-visible:ring-2 focus-visible:ring-navy-500 focus:border-navy-700 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-navy-700">
                    Nombre de la agencia <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nombre de tu agencia de viajes"
                    className="placeholder:text-navy-400 border-navy-200 focus-visible:ring-2 focus-visible:ring-navy-500 focus:border-navy-700 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-navy-700">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    className="placeholder:text-navy-400 border border-navy-200 rounded-md p-2 w-full min-h-[100px] focus-visible:ring-2 focus-visible:ring-navy-500 focus:border-navy-700 transition-all resize-y"
                  />
                </div>
                <Button type="submit" className="w-full bg-navy-700 text-white hover:bg-navy-800 h-12">Enviar mensaje</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-navy-900 text-white py-12 border-t border-navy-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <div className="mb-2">
                <img
                  src="/images/logo-blanco.svg"
                  alt="Iterio"
                  style={{ height: '68px', width: 'auto', display: 'block' }}
                />
              </div>
              <p className="text-navy-300 mb-6">
                La solución integral para agencias de viajes que diseñan experiencias a medida.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-navy-300 hover:text-white transition-colors duration-150 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-navy-300 hover:text-white transition-colors duration-150 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-navy-300 hover:text-white transition-colors duration-150 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contacto</h3>
              <address className="not-italic text-navy-300">
                <p>tesisitbagrupo3@gmail.com</p>
                <p>+54 9 11 50543283</p>
                <p>Calle Ejemplo 123</p>
                <p>Buenos Aires, Argentina</p>
              </address>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-12 pt-6 text-center text-navy-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Iterio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      {/* Botón flotante Scroll to Top */}
      {showScrollTop && (
        <button
          aria-label="Volver arriba"
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-50 bg-navy-700 text-white p-3 rounded-full shadow-lg hover:bg-navy-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-500 animate-in fade-in"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  )
}
