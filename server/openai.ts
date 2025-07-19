import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAppRecommendations(userQuery: string): Promise<{
  recommendations: Array<{
    category: string;
    reason: string;
    keywords: string[];
  }>;
  suggestedSearchTerms: string[];
}> {
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

    return response.data[0].url || null;
  } catch (error) {
    console.error("Error generating app icon:", error);
    return null;
  }
}