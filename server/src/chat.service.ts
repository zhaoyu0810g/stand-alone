import { Injectable } from '@nestjs/common';

import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// TODO: Hardocde for simplicity during prototype, should replace with environment variable process.env.OPENAI_API_KEY
const apiKey = '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'; // Replace with your actual token

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});


@Injectable()
export class ChatService {
  async getHello(): Promise<string> {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },
        { role: "user", content: "how can I solve 8x + 7 = -23" },
      ],
      response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
    });

    const math_reasoning = completion.choices[0].message.parsed;

    return JSON.stringify(math_reasoning, null, 2);
  }
}
