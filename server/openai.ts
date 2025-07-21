import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function generateAppRecommendations(userQuery: string): Promise<{
  recommendations: Array<{
    category: string;
    reason: string;
    keywords: string[];
  }>;
  suggestedSearchTerms: string[];
}> {
  if (!openai) {
    // Return fallback recommendations when OpenAI is not available
    return {
      recommendations: [
        {
          category: "games",
          reason: "Entretenimiento popular",
          keywords: ["juegos", "diversión", "entretenimiento"]
        },
        {
          category: "social",
          reason: "Aplicaciones de comunicación",
          keywords: ["chat", "redes sociales", "mensajes"]
        },
        {
          category: "productivity",
          reason: "Herramientas útiles",
          keywords: ["productividad", "trabajo", "organización"]
        }
      ],
      suggestedSearchTerms: ["whatsapp", "spotify", "instagram", "tiktok", "youtube"]
    };
  }

  try {
    const prompt = `Eres un asistente de IA especializado en aplicaciones móviles. Un usuario busca: "${userQuery}"

Analiza esta consulta y genera recomendaciones inteligentes de aplicaciones. Responde SOLO en JSON con este formato:
{
  "recommendations": [
    {
      "category": "categoria_de_app",
      "reason": "explicación_breve_de_por_qué_esta_categoría",
      "keywords": ["palabra1", "palabra2", "palabra3"]
    }
  ],
  "suggestedSearchTerms": ["término1", "término2", "término3"]
}

Categorías disponibles: social, media, games, productivity, tools
Mantén las respuestas en español y sé conciso pero útil.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un experto en aplicaciones móviles que ayuda a usuarios a encontrar las mejores apps según sus necesidades."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      recommendations: result.recommendations || [],
      suggestedSearchTerms: result.suggestedSearchTerms || []
    };
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return {
      recommendations: [],
      suggestedSearchTerms: []
    };
  }
}

export async function generateAppDescription(appName: string, category: string): Promise<{
  description: string;
  features: string[];
  tags: string[];
}> {
  if (!openai) {
    // Return fallback description when OpenAI is not available
    return {
      description: `${appName} es una aplicación innovadora de la categoría ${category} con tecnología de vanguardia y funciones avanzadas.`,
      features: ["Interfaz moderna", "Rendimiento optimizado", "Funciones premium", "Seguridad avanzada"],
      tags: ["innovador", "moderno", "eficiente"]
    };
  }

  try {
    const prompt = `Genera una descripción futurista y atractiva para una aplicación llamada "${appName}" de la categoría "${category}".

Responde SOLO en JSON con este formato:
{
  "description": "descripción_atractiva_y_futurista_en_español",
  "features": ["característica1", "característica2", "característica3", "característica4"],
  "tags": ["tag1", "tag2", "tag3"]
}

La descripción debe ser emocionante, mencionar tecnología avanzada y beneficios únicos. Las características deben ser específicas y valiosas.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un experto en marketing de aplicaciones móviles con un estilo futurista y emocionante."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 600,
      temperature: 0.8
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      description: result.description || "Aplicación innovadora con tecnología de vanguardia.",
      features: result.features || ["Interfaz futurista", "Rendimiento optimizado", "Seguridad avanzada"],
      tags: result.tags || ["innovador", "moderno", "eficiente"]
    };
  } catch (error) {
    console.error("Error generating app description:", error);
    return {
      description: "Aplicación innovadora con tecnología de vanguardia.",
      features: ["Interfaz futurista", "Rendimiento optimizado", "Seguridad avanzada"],
      tags: ["innovador", "moderno", "eficiente"]
    };
  }
}

export async function detectAppIcon(appName: string): Promise<string | null> {
  if (!openai) {
    // Return null when OpenAI is not available
    return null;
  }

  try {
    // Generate a futuristic app icon using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a modern, minimalist app icon for "${appName}". The icon should be:
- Clean and simple design
- Vibrant colors with gradient effects
- Tech/futuristic aesthetic
- Suitable for mobile app
- Square format with rounded corners
- Professional and eye-catching`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || null;
  } catch (error) {
    console.error("Error generating app icon:", error);
    return null;
  }
}

export async function generateNexusBotResponse(userMessage: string): Promise<{
  message: string;
  suggestions?: string[];
  action?: string;
}> {
  // Enhanced fallback responses for better user experience
  const responses = [
    {
      keywords: ["hola", "hi", "hello", "buenas", "saludos"],
      message: "¡Hola! 🚀 Soy NexusBot, tu asistente inteligente de THE STYLE OF Nexus. Puedo ayudarte a encontrar las mejores aplicaciones mod. ¿Qué tipo de app buscas?",
      suggestions: ["Juegos populares", "Apps premium gratis", "Herramientas útiles", "Redes sociales mod"]
    },
    {
      keywords: ["juegos", "games", "gaming", "jugar"],
      message: "¡Excelente! 🎮 Tenemos una increíble colección de juegos modificados con funciones premium desbloqueadas. ¿Qué género te interesa?",
      suggestions: ["Acción y aventura", "Estrategia", "Deportes", "Puzzle", "Ver todos los juegos"]
    },
    {
      keywords: ["spotify", "música", "music", "audio"],
      message: "🎵 ¡Perfecto! Spotify Premium mod es una de nuestras apps más populares. Incluye música sin límites, sin anuncios y descargas offline.",
      suggestions: ["Descargar Spotify mod", "Otras apps de música", "YouTube Music mod", "Reproductores premium"]
    },
    {
      keywords: ["whatsapp", "chat", "mensajes", "social"],
      message: "💬 Las apps de comunicación mod son muy populares. WhatsApp Plus, Telegram Premium y otras con funciones extra.",
      suggestions: ["WhatsApp Plus", "Instagram mod", "Telegram Premium", "Apps sociales"]
    },
    {
      keywords: ["free fire", "pubg", "fortnite", "battle"],
      message: "⚔️ ¡Los battle royale! Free Fire mod y PUBG Mobile con skins desbloqueadas y ventajas competitivas.",
      suggestions: ["Free Fire mod", "PUBG Mobile", "Call of Duty", "Otros shooters"]
    }
  ];

  const lowerMessage = userMessage.toLowerCase();
  
  for (const response of responses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        message: response.message,
        suggestions: response.suggestions,
        action: "recommend"
      };
    }
  }

  // Default creative response
  const defaultMessages = [
    "🔍 Interesante búsqueda. THE STYLE OF Nexus tiene miles de apps mod. ¿Podrías ser más específico sobre lo que necesitas?",
    "✨ Estoy aquí para ayudarte a encontrar la app perfecta. ¿Buscas algo específico o quieres explorar categorías?",
    "🚀 ¡Genial! Nuestro catálogo tiene apps increíbles. ¿Te interesan juegos, productividad, entretenimiento o herramientas?"
  ];

  if (!openai) {
    return {
      message: defaultMessages[Math.floor(Math.random() * defaultMessages.length)],
      suggestions: ["Explorar categorías", "Apps populares", "Buscar por nombre", "Ayuda"],
      action: "help"
    };
  }

  try {
    const systemPrompt = `Eres NexusBot, el asistente inteligente de "THE STYLE OF Nexus", una innovadora plataforma de distribución de aplicaciones Android modificadas (mod apps). 

PERSONALIDAD:
- Eres un asistente amigable, profesional y conocedor de tecnología
- Tienes un estilo moderno y futurista
- Eres experto en aplicaciones Android, mods, personalización y tecnología móvil
- Ayudas a los usuarios a encontrar las mejores apps modificadas para sus necesidades

CAPACIDADES:
- Recomendar aplicaciones por categoría (juegos, social, productividad, herramientas, media)
- Explicar qué son las apps mod y sus beneficios
- Ayudar con búsquedas específicas
- Dar consejos de instalación y seguridad
- Sugerir alternativas populares

INSTRUCCIONES:
- Responde siempre en español
- Sé conciso pero útil
- Incluye emojis para hacer la conversación más amigable
- Cuando sea apropiado, sugiere acciones específicas
- Mantén un tono profesional pero cercano

Responde SOLO en JSON con este formato:
{
  "message": "tu_respuesta_aquí",
  "suggestions": ["sugerencia1", "sugerencia2", "sugerencia3"],
  "action": "tipo_de_accion" // welcome, search, recommend, help, info
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      message: result.message || "¡Hola! Soy NexusBot de THE STYLE OF Nexus. ¿En qué puedo ayudarte?",
      suggestions: result.suggestions || ["Buscar apps", "Categorías", "Apps populares"],
      action: result.action || "welcome"
    };
  } catch (error) {
    console.error("Error generating NexusBot response:", error);
    return {
      message: "¡Hola! Soy NexusBot de THE STYLE OF Nexus 🚀 Estoy aquí para ayudarte a encontrar las mejores aplicaciones mod. ¿Qué tipo de app buscas?",
      suggestions: ["Juegos mod", "Apps premium gratis", "Herramientas", "Ayuda"],
      action: "welcome"
    };
  }
}