import { Injectable } from '@nestjs/common';

import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import "dotenv/config"; // Load environment variables
import { start } from 'repl';

// TODO: Remove the below code, log the OPENAI_API_KEY environment variable during prototype for easier debugging
console.log("ChatService", process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const Agenda = z.object({
  startTime: z.string(),
  endTime: z.string(),
  agendaSubject: z.string(),
  agendaDetails: z.string(),
  myPreparation: z.string(),
  source: z.string(),
  isHighPriority: z.boolean(),
});

const TODO = z.object({
  shortSummary: z.string(),
  source: z.string(),
  isHighPriority: z.boolean(),
});

const summaryOfTheDay = z.object({
  summaryOftheDay: z.string(),
  agenda: z.array(Agenda),
  todos: z.array(TODO),
});

@Injectable()
export class ChatService {
  async test(retrivalData: string): Promise<string> {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert at arrange agenda and structured data extraction. The following are retravial data from a calenda, gmail, docs etc...:" + retrivalData },
        { role: "user", content: "prepare my day" },
      ],
      response_format: zodResponseFormat(summaryOfTheDay, "summaryOfTheDay"),
    });

    const math_reasoning = completion.choices[0].message.parsed;

    return JSON.stringify(math_reasoning, null, 2);
  }

  async prepareMyDay(retrivalData: string): Promise<string> {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert at arrange agenda and structured data extraction. The following are retravial data from a calenda, gmail, docs etc...:" + retrivalData },
        { role: "user", content: "prepare my day" },
      ],
      response_format: zodResponseFormat(summaryOfTheDay, "summaryOfTheDay"),
    });

    const math_reasoning = completion.choices[0].message.parsed;

    return JSON.stringify(math_reasoning, null, 2);
  }
}
