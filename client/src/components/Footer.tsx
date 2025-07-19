import { Box, Twitter, Instagram, MessageCircle, Send, Zap, Brain, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-cyber-pulse">
                <Brain className="text-2xl text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent animate-hologram">
                  THE STYLE OF NEXUS
                </h3>
                <p className="text-gray-400 font-mono flex items-center space-x-2">
                  <span>BY L3HO</span>
                  <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Plataforma líder en distribución de aplicaciones móviles con tecnología de vanguardia.
              Descubre, descarga y disfruta de las mejores apps en un entorno seguro y moderno.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 border border-blue-400/30"
              >
                <Twitter className="text-white group-hover:animate-pulse" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 border border-purple-400/30"
              >
                <Instagram className="text-white group-hover:animate-pulse" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-110 border border-indigo-400/30"
              >
                <MessageCircle className="text-white group-hover:animate-pulse" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-110 border border-cyan-400/30"
              >
                <Send className="text-white group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Aplicaciones Populares
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Nuevos Lanzamientos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Búsqueda Avanzada
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Desarrolladores
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Soporte</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Reportar Problema
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyan-400/20 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>© 2024</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">L3HO</span>
            <span>. Todos los derechos reservados.</span>
            <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
          </p>
          <p className="text-gray-500 mt-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">THE STYLE OF NEXUS</span> - Tecnología del futuro, hoy.
          </p>
        </div>
      </div>
    </footer>
  );
}
