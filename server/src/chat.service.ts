import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ChatResponse } from './types';
import 'dotenv/config'; // Load environment variables
import { ChatCompletionMessageParam } from 'openai/resources';

// TODO: Remove the below code, log the OPENAI_API_KEY environment variable during prototype for easier debugging
console.log('ChatService', process.env.OPENAI_API_KEY);
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

const response = z.object({
  summaryOftheDay: z.string(),
  agenda: z.array(Agenda),
  todos: z.array(TODO),
  reply: z.string(),
});

const createSystemMessage = (
  retrivalData: string,
): ChatCompletionMessageParam => {
  return {
    role: 'system',
    content:
      'You are an expert at arrange agenda and structured data extraction.\r\n' +
      'If user ask "prepare my day", return the structured data of the day, set `reply`, `summaryOftheDay`, `agenda` and `todos`.\r\n' +
      'If user ask other questions instead of "prepare my day" or something similiar, only set `reply`, donnot set `summaryOftheDay`,  `agenda` or `todos`.\r\n' +
      'The following are retravial data from a calenda, gmail, docs etc...:' +
      retrivalData,
  };
};

@Injectable()
export class ChatService {
  async prepareMyDay(
    retrivalData: string,
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletionMessageParam[]> {
    const systemMessage = createSystemMessage(retrivalData);
    messages.unshift(systemMessage);
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages,
      response_format: zodResponseFormat(response, 'response'),
    });

    const parsed = completion.choices[0].message.parsed;

    // TODO: remove as ChatResponse
    const chatResponse = parsed as ChatResponse;
    const responseMessages: ChatCompletionMessageParam[] = messages.filter(
      (m) => m.role !== 'system',
    );

    responseMessages.push({
      role: 'assistant',
      content: JSON.stringify(chatResponse),
    });

    return responseMessages;
  }
}
