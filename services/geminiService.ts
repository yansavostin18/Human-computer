import { GoogleGenAI, Type } from "@google/genai";
import { CardStats, Character, PowerLevel } from "../types";

// Ensure the API_KEY is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cardStatsSchema = {
  type: Type.OBJECT,
  properties: {
    intelligence: {
      type: Type.NUMBER,
      description: "A number from 1 to 100 representing intelligence.",
    },
    strength: {
      type: Type.NUMBER,
      description: "A number from 1 to 100 representing physical strength.",
    },
    speed: {
      type: Type.NUMBER,
      description: "A number from 1 to 100 representing speed.",
    },
    durability: {
      type: Type.NUMBER,
      description: "A number from 1 to 100 representing durability.",
    },
  },
  required: ["intelligence", "strength", "speed", "durability"],
};


const cardDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        stats: cardStatsSchema,
        backstory: {
            type: Type.STRING,
            description: "A short, engaging backstory for the character (2-4 sentences)."
        }
    },
    required: ["stats", "backstory"],
}

export const generateCardDetails = async (characterName: Character, powerLevel: PowerLevel): Promise<{ stats: CardStats, backstory: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate stats and a backstory for the character "${characterName}" at a "${powerLevel}" power level. The stats should be numbers between 1 and 100, reflecting the specified power level. For example, 'Low' should have stats generally below 40, 'Medium' between 40-70, and 'Hard' above 70. For 'Mary Jane', if power level is 'Low', describe her as a regular person. If 'Medium' or 'Hard', imagine an alternate reality where she has powers and describe that.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: cardDetailsSchema,
        systemInstruction: "You are a creative writer for a trading card game based on the Spider-Man universe. Create compelling and appropriate details for the cards.",
      },
    });

    const jsonText = response.text.trim();
    const cardData = JSON.parse(jsonText);
    
    if (!cardData.stats || !cardData.backstory) {
      throw new Error("Invalid data structure received from API.");
    }

    return cardData;
  } catch (error) {
    console.error("Error generating card details:", error);
    throw new Error("Failed to generate card details from Gemini API.");
  }
};


export const generateCardImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '3:4',
        },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }

  } catch (error) {
    console.error("Error generating card image:", error);
    throw new Error("Failed to generate card image from Imagen API.");
  }
};
