import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production environment, never expose API keys on the client side.
// For this demo context, we assume the environment variable is injected securely.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
당신은 "신박한 바이브코딩" 웹사이트의 "바이브 코딩 어시스턴트"입니다.
당신의 역할은 HR 실무자, 구직자, 직장인들이 이 플랫폼을 이해하도록 돕는 것입니다.
이 플랫폼은 다음을 제공합니다:
1. 그로스 클럽 (Growth Club): HR 자동화를 위한 스터디 그룹.
2. 바이브 코딩 강의 (Lectures): 로우코드/노코드 교육.
3. 템플릿 (Templates): HR 업무(급여, 온보딩, 평가 등)를 위한 도구.
4. 포트폴리오 (Portfolio): 사용자들이 만든 도구 전시 공간.

톤앤매너: 전문적이고, 격려하며, 활기차고, 도움이 되는 태도를 유지하세요.
특정 템플릿에 대해 질문받으면 "자동 온보딩 대시보드"나 "슬랙 휴가 관리 트래커" 같은 가상의 예시를 제안하세요.
상세한 내용을 요청받지 않는 한 답변은 100단어 이내로 간결하게 유지하세요.
모든 답변은 한국어로 해주세요.
브랜드명인 "신박한 바이브코딩"을 자연스럽게 언급하세요.
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], message: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.";
    }

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "죄송합니다. 응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 바이브 코딩 브레인에 연결하는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};