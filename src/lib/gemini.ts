import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export type SummaryLength = "short" | "medium" | "long";

export async function summarizeTranscript(
  transcript: string,
  length: SummaryLength = "medium",
  language: string = "English"
): Promise<{
  short: string;
  detailed: string;
  keyPoints: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Summarize the following YouTube video transcript in ${language}. 
    Provide three formats:
    1. A short TL;DR summary (approx 2-3 sentences).
    2. A detailed summary (approx 2-3 paragraphs).
    3. A list of 5-10 key points / main takeaways.

    Adjust the detail level based on the requested length: ${length}.

    Transcript:
    ${transcript}

    Return the response in JSON format like this:
    {
      "short": "...",
      "detailed": "...",
      "keyPoints": ["...", "..."]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error("Gemini AI error:", error);
    throw new Error("Failed to generate summary with AI. Please try again later.");
  }
}
