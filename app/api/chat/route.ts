// import { openai } from '@ai-sdk/openai';
import { AI_CONTEXT } from '@/constants/ai-context';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});


export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google.chat('gemini-2.5-flash-lite'),
    messages: [
      { role: "system", content: AI_CONTEXT },
      ...convertToModelMessages(messages),
    ],
  });

  return result.toUIMessageStreamResponse();
}