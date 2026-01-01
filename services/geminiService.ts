import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateFactoryResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) return "API Key not configured. Please add your Gemini API key.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, encouraging AI assistant for a Sri Lankan factory owner. You speak primarily in Sinhala, but can use English terms where appropriate for business context. Keep answers practical, simple, and related to manufacturing, business, or the specific 100-day training plan."
      }
    });
    return response.text || "ක්ෂමාවන්න, මට පිළිතුරක් ලබා දීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "දෝෂයක් සිදුවිය. කරුණාකර ඔබගේ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.";
  }
};

export const translateToSinhala = async (englishText: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following business text into professional but easy-to-understand Sinhala. \n\nText: ${englishText}`,
    });
    return response.text || "පරිවර්තනය අසාර්ථක විය.";
  } catch (error) {
    console.error("Translation Error:", error);
    return "පරිවර්තනය කිරීමේදී දෝෂයක් සිදුවිය.";
  }
};

export const draftBusinessEmail = async (details: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a professional business email in English based on these details (provided in Sinhala/English): "${details}". also provide a Sinhala summary of what the email says below it.`,
    });
    return response.text || "ලිපිය සැකසීම අසාර්ථක විය.";
  } catch (error) {
    console.error("Email Draft Error:", error);
    return "ලිපිය සැකසීමේදී දෝෂයක් සිදුවිය.";
  }
};