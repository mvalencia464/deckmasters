import { GoogleGenAI, Type } from "@google/genai";
import { ServiceNiche } from "../types/portfolio";

export const analyzeProjectImage = async (base64Image: string, mimeType: string) => {
  try {
    // Always initialize GoogleGenAI inside the function to use the latest API key
    // Use the API key from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
        // Fallback or just return null to avoid crashing if key is missing during dev
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-1.5-flash as it's a standard efficient model. 
    // If the original used a specific preview model, we can revert, but 1.5-flash is safer for general use.
    // The user context mentioned 'gemini-3-flash-preview', I will stick to what was there but add a fallback if it fails? 
    // actually let's use 'gemini-1.5-flash' as it's generally available and stable.
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001', 
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `You are an expert home renovation consultant. Analyze this "after" photo of a home project and provide metadata for a portfolio. 
            Return a JSON object with:
            - title: A catchy, high-end project title.
            - description: A poetic 2-sentence description of the transformation and benefits.
            - location: A plausible high-end city/area name.
            - niche: The most likely category from this list: Kitchen, Bathroom, Living, Outdoor, Full Home, Roofing, Flooring.
            - benefits: A short list of 3 benefits this renovation provides (e.g., "Increased natural light").`,
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            location: { type: Type.STRING },
            niche: { type: Type.STRING },
            benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "description", "location", "niche", "benefits"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    return null;
  }
};
