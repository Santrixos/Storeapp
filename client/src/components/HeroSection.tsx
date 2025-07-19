import { Button } from "@/components/ui/button";
import { Download, Play, Zap, Sparkles, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [aiMode, setAiMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiMode(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden min-h-[80vh] flex items-center">
      {/* Ultra futuristic animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-blue-950/30"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating holographic elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float opacity-40" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-2xl animate-float opacity-50" style={{animationDelay: '-4s'}}></div>
        
        {/* Digital particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* AI Status Indicator */}
          <div className="mb-8 flex justify-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 transition-all duration-1000 ${
              aiMode 
                ? 'border-green-400 bg-green-400/10' 
                : 'border-cyan-400 bg-cyan-400/10'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 animate-pulse ${
                aiMode ? 'bg-green-400' : 'bg-cyan-400'
              }`}></div>
              <span className={`text-sm font-mono tracking-wider ${
                aiMode ? 'text-green-400' : 'text-cyan-400'
              }`}>
                {aiMode ? 'AI NEXUS ACTIVO' : 'SISTEMA CONECTADO'}
              </span>
              <Cpu className={`ml-3 h-4 w-4 ${
                aiMode ? 'text-green-400 animate-spin' : 'text-cyan-400 animate-pulse'
              }`} />
            </div>
          </div>

          {/* Main Title with 3D effect */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-black mb-4 leading-none">
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
                THE STYLE
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse-slow" style={{animationDelay: '1s'}}>
                OF NEXUS
              </span>
            </h1>
            
            {/* Holographic reflection */}
            <div className="absolute top-full left-0 w-full opacity-20 transform rotate-x-180 bg-gradient-to-b from-cyan-500/30 to-transparent h-20 blur-sm"></div>
          </div>

          {/* Subtitle with typing effect */}
          <div className="mb-12">
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                Inteligencia Artificial
              </span> + 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                {" "}Tecnología Cuántica
              </span>
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Descubre aplicaciones del futuro con recomendaciones impulsadas por IA. 
              La próxima generación de distribución de apps está aquí.
            </p>
          </div>

          {/* Futuristic Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16">
            <Button className="group relative px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30 border border-cyan-400/30">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Zap className="mr-3 h-6 w-6 animate-pulse" />
                Explorar con IA
                <Sparkles className="ml-3 h-5 w-5 group-hover:animate-spin" />
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="group px-10 py-6 bg-black/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 text-white hover:border-purple-400 hover:scale-105 shadow-xl shadow-purple-500/20"
            >
              <div className="flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Demo Interactivo
              </div>
            </Button>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Apps Analizadas por IA", icon: Cpu },
              { number: "99.9%", label: "Precisión de Recomendaciones", icon: Zap },
              { number: "24/7", label: "Asistente IA Disponible", icon: Sparkles }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <stat.icon className="h-8 w-8 text-cyan-400 mb-4 mx-auto animate-pulse" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
