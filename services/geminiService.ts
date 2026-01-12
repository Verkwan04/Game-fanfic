import { GoogleGenAI } from "@google/genai";
import { Attributes } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Simplified Fate Card: Just returns poem text. No images.
export const generateFateCard = async (
  endingTitle: string,
  endingText: string,
  predefinedPoem?: string
): Promise<{ poem: string }> => {
  const ai = getClient();
  
  if (predefinedPoem || !ai) {
    return { 
      poem: predefinedPoem || "命数天定，无字天书。"
    };
  }

  const prompt = `
    你是一个精通中国古诗词的AI。
    请为游戏结局“${endingTitle}”写一首七言绝句或宋词。
    结局描述：${endingText}
    要求：
    1. 意境凄美、或讽刺、或深刻。
    2. 只返回诗句内容，不要标题，不要解释。
    3. 古风韵味浓厚。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return { poem: response.text?.trim() || "云深不知处..." };
  } catch (error) {
    console.warn("AI Generation failed:", error);
    return { 
      poem: "运去金成铁，时来铁似金。\n只叹尘缘浅，空留梦中身。"
    };
  }
};