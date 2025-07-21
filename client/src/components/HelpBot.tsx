import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Bot, Sparkles, Search, Download, Star, Smartphone, Mic, Gamepad2, Settings, TrendingUp, Zap } from "lucide-react";
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

  const creativeTips = [
    {
      text: "¡Hey! 👋 Soy NexusBot, tu compañero cibernético en esta aventura digital. ¿Listo para explorar el universo de apps?",
      mood: "excited",
      actions: [
        { 
          label: "🚀 ¡Empezar aventura!", 
          action: () => onSearchDemo?.(),
          icon: <Sparkles className="h-4 w-4" />
        },
        { 
          label: "🎮 Ver juegos épicos", 
          action: () => onCategoryDemo?.("games"),
          icon: <Smartphone className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🔍 Psst... El buscador tiene súper poderes! Puede entender tu voz, predecir lo que buscas y hasta leer tu mente (bueno, casi) 🧠✨",
      mood: "mysterious",
      actions: [
        { 
          label: "🎙️ Probar voz", 
          action: () => onSearchDemo?.(),
          icon: <Mic className="h-4 w-4" />
        },
        { 
          label: "🔮 Ver magia IA", 
          action: () => {
            addMessage("¡La IA analiza patrones, predice tendencias y sugiere apps perfectas para ti! Es como tener un genio digital 🧞‍♂️", true);
          },
          icon: <Sparkles className="h-4 w-4" />
        }
      ]
    },
    {
      text: "⚡ ¡FLASH NEWS! Las apps destacadas cambian constantemente. Son como meteoritos digitales: brillantes, poderosas y siempre en movimiento 🌟💫",
      mood: "energetic",
      actions: [
        { 
          label: "⭐ Ver destacadas", 
          action: () => onFeaturedDemo?.(),
          icon: <TrendingUp className="h-4 w-4" />
        },
        { 
          label: "🔥 Tendencias hot", 
          action: () => {
            addMessage("Las tendencias se actualizan en tiempo real basadas en descargas, ratings y actividad de usuarios. ¡Siempre hay algo nuevo!", true);
          },
          icon: <Zap className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🎯 Categorías = portales dimensionales! Cada una te transporta a un universo diferente de apps. ¿A qué dimensión quieres viajar?",
      mood: "playful",
      actions: [
        { 
          label: "🎮 Dimensión Gaming", 
          action: () => onCategoryDemo?.("games"),
          icon: <Gamepad2 className="h-4 w-4" />
        },
        { 
          label: "💬 Mundo Social", 
          action: () => onCategoryDemo?.("social"),
          icon: <MessageCircle className="h-4 w-4" />
        },
        { 
          label: "🛠️ Zona Herramientas", 
          action: () => onCategoryDemo?.("tools"),
          icon: <Settings className="h-4 w-4" />
        }
      ]
    },
    {
      text: "💎 Secreto de descarga ninja: Click → Detalles épicos → Botón mágico → ¡BOOM! App en tu dispositivo. Más fácil que hacer ramen instantáneo 🍜",
      mood: "ninja",
      actions: [
        { 
          label: "🥷 Modo ninja ON", 
          action: () => {
            addMessage("Técnica secreta activada:\n1. 👆 Click sigiloso en app\n2. 👁️ Observa detalles\n3. ⚡ Strike del botón descarga\n4. 🎊 ¡Victoria total!", true);
          },
          icon: <Zap className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🌈 Plot twist: Los iconos de las apps se generan automáticamente con IA! Cada uno es único como un copo de nieve digital ❄️✨",
      mood: "amazed",
      actions: [
        { 
          label: "🎨 Ver magia iconos", 
          action: () => {
            addMessage("La IA analiza el nombre y categoría de cada app para crear iconos únicos con colores, formas y símbolos perfectos. ¡Arte digital en tiempo real! 🎭", true);
          },
          icon: <Sparkles className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🚀 Fun fact: Tenemos más de 1400 apps esperándote! Es como tener una biblioteca de Alejandría, pero para tu bolsillo 📚➡️📱",
      mood: "amazed",
      actions: [
        { 
          label: "📊 Ver estadísticas", 
          action: () => {
            addMessage("🎯 1400+ apps disponibles\n📈 5 categorías principales\n⭐ Miles de ratings\n🔄 Actualizaciones diarias\n¡Y creciendo constantemente!", true);
          },
          icon: <Star className="h-4 w-4" />
        }
      ]
    },
    {
      text: "🎪 ¡BONUS ROUND! Cada app tiene su propia personalidad digital. Algunas son ninjas silenciosas, otras rockstars ruidosas. ¿Cuál es tu estilo? 🦄✨",
      mood: "playful",
      actions: [
        { 
          label: "🥷 Modo stealth", 
          action: () => {
            addMessage("¡Apps ninja activadas! Herramientas de productividad, VPNs, y utilities silenciosas que hacen el trabajo sin hacer ruido 🤫", true);
            onCategoryDemo?.("tools");
          },
          icon: <Settings className="h-4 w-4" />
        },
        { 
          label: "🎸 Modo rockstar", 
          action: () => {
            addMessage("¡A todo volumen! Juegos épicos, apps de música y entretenimiento que ponen a rugir tu dispositivo 🔥🎵", true);
            onCategoryDemo?.("games");
          },
          icon: <Zap className="h-4 w-4" />
        }
      ]
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(creativeTips[0].text, true, creativeTips[0].actions);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setCurrentTip((prev) => (prev + 1) % creativeTips.length);
      }
    }, 6000); // Más frecuente para mayor dinamismo

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
      const responses = {
        "buscar": [
          "¡Increíble! 🔮 El buscador tiene IA que entiende hasta jerga gamer. Prueba 'juegos de zombies' o 'apps para editar fotos aesthetic'",
          "¡Pro tip! 🎯 Puedes buscar por voz, usar filtros ninja y hasta encontrar apps por emojis. ¡El futuro es ahora!",
          "¡Mind blown! 🤯 La búsqueda aprende de ti. Mientras más usas, más inteligente se vuelve. Es como entrenar tu propio Pokémon digital!"
        ],
        "categoría": [
          "¡Portal activado! 🌀 Cada categoría es como un mundo diferente con sus propias reglas y tesoros ocultos.",
          "¡Easter egg! 🥚 Las categorías tienen filtros secretos. Prueba ordenar por 'recientes' para encontrar gemas nuevas.",
          "¡Fun fact! 📊 Las categorías se actualizan automáticamente basadas en tendencias mundiales. ¡Siempre están fresh!"
        ],
        "descargar": [
          "¡Nivel ninja desbloqueado! 🥷 Descarga = Click → Modal épico → Botón mágico → ¡BOOM! App en tu poder.",
          "¡Seguridad level 100! 🛡️ Todas las apps pasan por escaneos anti-malware y verificación de desarrolladores.",
          "¡Speed run! ⚡ Record mundial: De click a app instalada en menos de 30 segundos. ¿Puedes romper el récord?"
        ],
        "seguras": [
          "¡Fort Knox digital! 🏰 Usamos encriptación militar, verificación de developers y AI anti-malware 24/7.",
          "¡Protección level Wakanda! 🛡️ Cada app pasa por más de 50 verificaciones antes de llegar a ti.",
          "¡Tranqui! 😎 Tenemos más seguridad que el banco central. Tu dispositivo está en buenas manos."
        ],
        "destacadas": [
          "¡Las celebridades del app-mundo! ⭐ Destacadas = apps que rompieron internet, trendearon en redes y conquistaron corazones.",
          "¡Plot twist! 🎬 Las destacadas cambian cada 6 horas basadas en descargas reales, ratings y viralidad.",
          "¡VIP access! 💎 Las destacadas son como el red carpet de las apps. Solo las más épicas llegan aquí."
        ],
        "default": [
          "¡Awesome! 🚀 ¿Sabías que soy una IA entrenada con datos de millones de usuarios? ¡Pregúntame lo que sea!",
          "¡Plot twist! 🎭 Cada vez que hablas conmigo, me vuelvo más inteligente. ¡Somos team ahora!",
          "¡Fun fact! 🌟 Puedo hacer más de 47 cosas diferentes. ¿Quieres descubrir mis poderes secretos?",
          "¡Dato curioso! 🤖 Mi algoritmo analiza patrones de comportamiento para predecir qué apps te gustarán. ¡Es como magia, pero con matemáticas!",
          "¡Easter egg desbloqueado! 🥚 Si me preguntas sobre algo específico, puedo generar respuestas únicas basadas en el contexto. ¡Soy un bot, pero creativo!",
          "¡Mind = blown! 🤯 Proceso información en nanosegundos, pero me tomo mi tiempo para darte respuestas con personalidad. ¡La velocidad no está reñida con el estilo!"
        ]
      };

      const getResponse = () => {
        if (actionText.includes("buscar") || actionText.includes("🔍")) return responses.buscar;
        if (actionText.includes("categoría") || actionText.includes("📂")) return responses.categoría;
        if (actionText.includes("descargar") || actionText.includes("📥")) return responses.descargar;
        if (actionText.includes("seguras") || actionText.includes("🛡️")) return responses.seguras;
        if (actionText.includes("destacadas") || actionText.includes("⭐")) return responses.destacadas;
        if (actionText.includes("Sorpréndeme") || actionText.includes("🎮")) {
          // Random surprise responses
          const surprises = [
            "¡PLOT TWIST! 🎬 El juego más descargado tiene menos de 50MB pero más diversión que un parque de atracciones entero!",
            "¡SECRET UNLOCKED! 🗝️ Las apps de productividad más exitosas fueron creadas por equipos de menos de 5 personas. ¡El poder del indie dev!",
            "¡MIND BLOWN! 🤯 Hay una app que puede traducir maullidos de gatos. Sí, en serio. La tecnología ha llegado MUY lejos...",
            "¡EASTER EGG! 🥚 Si buscas 'unicornio', encontrarás apps con las reviews más creativas del universo. ¡La comunidad es épica!"
          ];
          return [surprises[Math.floor(Math.random() * surprises.length)]];
        }
        if (actionText.includes("puedes hacer") || actionText.includes("🤖")) {
          return [
            "¡Lista de súper poderes activada! 💪\n🔮 Predecir apps perfectas para ti\n🎯 Navegar por voz\n🚀 Generar iconos dinámicos\n🎪 Contar chistes de programador\n✨ Y mucho más que irás descubriendo..."
          ];
        }
        if (actionText.includes("épico") || actionText.includes("🎪")) {
          return [
            "¡MODO ÉPICO ACTIVADO! 🎆\n*Efectos especiales activados*\n*Música épica de fondo*\n*Confeti digital cayendo*\n\n¿Listo para explorar el universo de apps como un verdadero héroe digital? 🦸‍♂️✨"
          ];
        }
        if (actionText.includes("tutorial") || actionText.includes("✨")) {
          return [
            "¡Tutorial interactivo iniciado! 🎓\n\n1️⃣ Usa el buscador para encontrar tesoros\n2️⃣ Las categorías son portales a diferentes mundos\n3️⃣ Los iconos son únicos y generados por IA\n4️⃣ ¡Yo estoy aquí para guiarte en todo momento!\n\n¿Por dónde empezamos la aventura? 🗺️"
          ];
        }
        return responses.default;
      };

      const responseArray = getResponse();
      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
      addMessage(randomResponse, true);
    }, 800 + Math.random() * 400); // Tiempo aleatorio para más naturalidad
  };

  const quickActions = [
    "🔍 ¿Cómo buscar apps?",
    "📂 Ver por categoría", 
    "📥 ¿Cómo descargar?",
    "🛡️ ¿Son seguras las apps?",
    "⭐ Mostrar destacadas",
    "🎯 Apps recomendadas",
    "🚀 Novedades",
    "💡 Tips secretos",
    "🎮 ¡Sorpréndeme!",
    "🤖 ¿Qué puedes hacer?",
    "✨ Modo tutorial",
    "🎪 ¡Haz algo épico!"
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
              <div className="text-sm font-medium animate-pulse">
                {creativeTips[currentTip].text.split(' ').slice(0, 10).join(' ')}...
              </div>
              <div className="absolute bottom-0 right-4 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 transform rotate-45 translate-y-1.5">
                <div className="absolute inset-0 animate-ping bg-cyan-400 rounded-sm"></div>
              </div>
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