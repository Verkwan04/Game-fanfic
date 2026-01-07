import { GoogleGenAI } from "@google/genai";
import { Attributes } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null; // Silent fail, use fallback
  }
  return new GoogleGenAI({ apiKey });
};

// Fallback comments library for when API is unavailable
const FALLBACK_COMMENTS = [
  "大大饿饿饭饭！\n太太神仙下凡！\n虽然有点OOC但还是好香。\n呜呜呜我的CP是真的！\n前排围观大神。",
  "路过吃瓜。\n不懂就问，这是什么瓜？\n纯路人觉得挺好看的。\n这文笔绝了！\n催更催更！",
  "kswl！\n民政局搬来了请原地结婚！\n这就是成年人的快乐吗？\n感觉有点危险...\n大大注意安全啊。",
  "我是来看评论的。\n虽然但是，这不违法吗？\n支持大大！\n黑粉滚粗！\n这就去买本支持！",
  "太真实了简直世另我。\n呜呜呜刀死我了。\n给太太递笔！\n产粮辛苦了！\n摩多摩多！"
];

export const generateFanComments = async (
  actionContext: string,
  stats: Attributes
): Promise<string> => {
  const ai = getClient();
  
  // Use fallback if no AI or for randomness if stats are very low
  if (!ai) {
    // Return a random set of fallback comments
    const randomIndex = Math.floor(Math.random() * FALLBACK_COMMENTS.length);
    return FALLBACK_COMMENTS[randomIndex];
  }

  const prompt = `
    你是一个负责模拟虚构同人社区（类似贴吧、微博、Ins的混合体）评论区的AI。
    
    【游戏背景】：玩家是一个同人作者，原作是《XXX》。
    
    【玩家当前状态】:
    - 知名度: ${stats.popularity} (越高黑粉越多，争吵越多)
    - 创作力: ${stats.creativity} (低分会被喷文笔差/OOC)
    - 法律意识: ${stats.legal} (低分时会有“法盲”、“不管管吗”的评论)
    - 情商: ${stats.eq}
    
    【当前剧情/操作】: "${actionContext}"
    
    请生成 4-5 条 极其真实的网友评论。
    
    【格式要求】:
    1. 不要任何前缀，直接返回评论内容。每行一条。
    2. 语气风格要多样化：
       - 有的像是微博/小红书（带emoji，语气激动，喊妈/喊老婆/kswl）。
       - 有的像是贴吧/论坛（语气冲，带嘲讽，缩写，黑话）。
       - 有的像是路人（吃瓜，看戏）。
    3. 包含对当前行为的直接反馈。如果涉及敏感/违规/出本，评论区要有明显的恐慌或举报党。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || FALLBACK_COMMENTS[0];
  } catch (error) {
    console.warn("AI Generation failed, using fallback:", error);
    // Return random fallback on error
    const randomIndex = Math.floor(Math.random() * FALLBACK_COMMENTS.length);
    return FALLBACK_COMMENTS[randomIndex];
  }
};

export const generateFateCard = async (
  endingTitle: string,
  endingText: string,
  predefinedPoem?: string
): Promise<{ poem: string; imageUrl: string }> => {
  const ai = getClient();
  
  // If we have no API key but have a poem, return just the poem
  if (!ai) {
    return { 
      poem: predefinedPoem || "命数天定，无字天书。", 
      imageUrl: "" 
    };
  }

  // If poem is provided, we only need to generate the image
  // We use a specific prompt for Ink Wash style
  const imagePrompt = `
    Traditional Chinese Ink Wash Painting (Shuimo) of: ${endingTitle}.
    Context: ${endingText}.
    Style: Masterpiece, minimalist, black and white ink on rice paper, high contrast, ancient aesthetics, artistic, abstract, with a small red seal stamp.
    No text, no letters.
  `;

  try {
    // gemini-2.5-flash-image supports image generation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: imagePrompt,
    });

    let imageUrl = "";
    let generatedPoem = predefinedPoem || "云深不知处...";

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else if (part.text && !predefinedPoem) {
           generatedPoem = part.text.trim();
        }
      }
    }

    return { poem: generatedPoem, imageUrl };
  } catch (error) {
    console.warn("AI Image Generation failed:", error);
    return { 
      poem: predefinedPoem || "运去金成铁，时来铁似金。\n只叹尘缘浅，空留梦中身。", 
      imageUrl: "" 
    };
  }
};