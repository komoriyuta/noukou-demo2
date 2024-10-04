'use server'

import { GoogleGenerativeAI,SchemaType} from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);

export async function getGeminiResponse(text1: string, text2: string) {
  console.log("Key:",API_KEY)
  try {
    const model = genAI.getGenerativeModel({  model:  "gemini-1.5-flash" ,
                                              generationConfig: {
                                                responseMimeType: "application/json",
                                              },
                                            });
    let prompt;
    prompt = `ふたつの文章が入力されます。この2つの文章の意味について考え、意味の空間の中で中点に存在するであろう文章を生成してください。元の文章について、その意味のみを抽出し、出力結果にはその文字づらがもれることのないようにしてください。できるだけ具体的に出力してください。Provide the output in JSON format with the following structure:
    {
      "explanation": "思考過程をこの要素の中に記述してください。それぞれの意味を解釈したあと、ステップバイステップで中間の適切な文章を生成するようにしてください。"
      "intermediateText": "生成された中間の文章",
    }
    Text 1: ${text1}
    Text 2: ${text2}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return JSON.parse(text);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from Gemini API');
  }
}