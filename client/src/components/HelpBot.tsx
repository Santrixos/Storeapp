import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Bot, Sparkles, Search, Download, Star, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
}

interface HelpBotProps {
  onSearchDemo?: () => void;
  onCategoryDemo?: (category: string) => void;
  onFeaturedDemo?: () => void;
}

export default function HelpBot({ onSearchDemo, onCategoryDemo, onFeaturedDemo }: HelpBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      text: "¡Hola! Soy NexusBot 🤖 Tu guía personal en THE STYLE OF NEXUS. ¿Te ayudo a navegar?",
      actions: [
        { 
          label: "Ver buscador", 
          action: () => onSearchDemo?.(),
          icon: <Search className="h-4 w-4" />
        },
        { 
          label: "Explorar categorías", 
          action: () => onCategoryDemo?.("games"),
          icon: <Smartphone className="h-4 w-4" />
        }
      ]
    },
    {
      text: "💡 Tip: Usa el buscador inteligente para encontrar apps específicas o describe lo que necesitas.",
      actions: [
        { 
          label: "Mostrar buscador", 
          action: () => onSearchDemo?.(),
          icon: <Search className="h-4 w-4" />
        }
      ]
    },
    {
      text: "⭐ ¿Sabías que puedes ver las apps destacadas y en tendencia? ¡Aquí están las más populares!",
      actions: [
        { 
          label: "Ver destacadas", 
          action: () => onFeaturedDemo?.(),
          icon: <Star className="h-4 w-4" />
        }
      ]
    },
    {
      text: "📱 Explora por categorías: Juegos, Social, Productividad, Multimedia y Herramientas.",
      actions: [
        { 
          label: "Ver Juegos", 
          action: () => onCategoryDemo?.("games"),
          icon: <Smartphone className="h-4 w-4" />
        },
        { 
          label: "Ver Social", 
          action: () => onCategoryDemo?.("social"),
          icon: <MessageCircle className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🔥 Para descargar una app, simplemente haz clic en ella y luego en el botón de descarga. ¡Es así de fácil!",
      actions: [
        { 
          label: "Mostrar proceso", 
          action: () => {
            addMessage("1. Haz clic en cualquier app\n2. Se abrirá una ventana con detalles\n3. Clic en 'Descargar APK'\n4. ¡Listo para instalar!", true);
          },
          icon: <Download className="h-4 w-4" />
        }
      ]
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(tips[0].text, true, tips[0].actions);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const addMessage = (text: string, isBot: boolean, actions?: Message['actions']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickAction = (actionText: string) => {
    addMessage(actionText, false);
    
    // Bot responses based on user action
    setTimeout(() => {
      if (actionText.includes("buscar")) {
        addMessage("Perfecto! El buscador inteligente puede entender consultas como 'juegos de carreras' o 'apps de música'. También puedes usar filtros avanzados.", true);
      } else if (actionText.includes("categoría")) {
        addMessage("¡Excelente elección! Cada categoría tiene apps cuidadosamente seleccionadas. También puedes filtrar por rating o popularidad.", true);
      } else if (actionText.includes("descargar")) {
        addMessage("Genial! Todas nuestras descargas son seguras y están verificadas. ¡Disfruta tu nueva app!", true);
      } else {
        addMessage("¡Perfecto! ¿Hay algo más en lo que te pueda ayudar? 😊", true);
      }
    }, 1000);
  };

  const quickActions = [
    "¿Cómo buscar apps?",
    "Ver por categoría",
    "¿Cómo descargar?",
    "¿Son seguras las apps?",
    "Mostrar destacadas"
  ];

  return (
    <>
      {/* Floating Bot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          {/* Notification Bubble */}
          {!isOpen && (
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute bottom-16 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-lg shadow-xl max-w-xs mb-2"
            >
              <div className="text-sm font-medium">
                {tips[currentTip].text.split(' ').slice(0, 8).join(' ')}...
              </div>
              <div className="absolute bottom-0 right-4 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 transform rotate-45 translate-y-1.5"></div>
            </motion.div>
          )}
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-2xl border-2 border-white/20"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
            </motion.div>
          </Button>

          {/* Pulse animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-75 animate-ping"></div>
          )}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-96 max-w-[90vw] z-40"
          >
            <Card className="bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <div className="relative">
                    <Bot className="h-6 w-6" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  NexusBot
                  <Badge variant="secondary" className="ml-auto bg-cyan-500/20 text-cyan-300">
                    <Sparkles className="h-3 w-3 mr-1" />
                    IA
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {/* Messages */}
                <div className="space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-gray-800 text-gray-100 border border-cyan-500/30' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      }`}>
                        <div className="text-sm whitespace-pre-line">{message.text}</div>
                        
                        {/* Action Buttons */}
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                onClick={action.action}
                                className="h-8 text-xs bg-gray-700/50 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                              >
                                {action.icon}
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-700 pt-3">
                  <div className="text-xs text-gray-400 mb-2">Acciones rápidas:</div>
                  <div className="flex flex-wrap gap-1">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuickAction(action)}
                        className="h-7 text-xs text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}