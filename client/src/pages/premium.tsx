import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Star, Zap, Shield, Diamond, Sparkles, Check, ArrowRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import type { App } from "@shared/schema";

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const { data: apps = [] } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  // Filter premium apps (rating > 4.5)
  const premiumApps = apps.filter(app => app.rating >= 4.5).slice(0, 8);

  const plans = [
    {
      id: "basic",
      name: "Nexus Basic",
      price: "Gratis",
      period: "Siempre",
      icon: <Star className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Acceso a apps básicas",
        "Descargas limitadas",
        "Soporte comunidad",
        "Sin anuncios en apps"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "Nexus Pro",
      price: "$9.99",
      period: "mensual",
      icon: <Crown className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Acceso a todas las apps premium",
        "Descargas ilimitadas",
        "Soporte prioritario 24/7",
        "Apps exclusivas",
        "Actualizaciones automáticas",
        "Funciones de IA avanzadas"
      ],
      popular: true
    },
    {
      id: "ultimate",
      name: "Nexus Ultimate",
      price: "$19.99",
      period: "mensual",
      icon: <Diamond className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Todo lo de Pro",
        "Apps beta exclusivas",
        "Personalización avanzada",
        "Backup en la nube",
        "Sincronización multi-dispositivo",
        "Acceso directo a desarrolladores"
      ],
      popular: false
    }
  ];

  const premiumFeatures = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Velocidad Extrema",
      description: "Descargas ultra-rápidas y servidores optimizados",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Seguridad Máxima",
      description: "Apps verificadas y libres de malware garantizado",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "IA Avanzada",
      description: "Recomendaciones personalizadas y búsqueda inteligente",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Contenido Exclusivo",
      description: "Acceso a apps premium y funciones desbloqueadas",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-4"
          >
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium">Experiencia Premium</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent"
          >
            Desbloquea el Poder Total
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Accede a aplicaciones premium, funciones exclusivas y experiencias sin límites 
            con THE STYLE OF Nexus Premium
          </motion.p>
        </div>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Elige Tu Plan Perfecto</h2>
            <p className="text-gray-300">Acceso inmediato a miles de aplicaciones premium</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`bg-black/40 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-purple-500/50 shadow-xl shadow-purple-500/10' 
                    : 'border-purple-500/20 hover:border-purple-400/40'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period !== "Siempre" && (
                        <span className="text-gray-400">/{plan.period}</span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.price === "Gratis" ? "Empezar Gratis" : "Obtener Premium"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium Apps Showcase */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Apps Premium Destacadas</h2>
            <p className="text-gray-300">Las mejores aplicaciones con funciones desbloqueadas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-purple-500/20 hover:border-yellow-400/40 transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {app.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-white group-hover:text-yellow-300 transition-colors text-sm">
                            {app.name}
                          </CardTitle>
                          <p className="text-gray-400 text-xs">{app.developer}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{app.rating}</span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Gift className="h-3 w-3 mr-1" />
                        Obtener
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8"
        >
          <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">¿Listo para la Experiencia Premium?</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya disfrutan de funciones premium y contenido exclusivo
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
          >
            Empezar Prueba Gratuita
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}