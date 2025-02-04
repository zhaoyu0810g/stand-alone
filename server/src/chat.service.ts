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

const appendSystemMessages = (
  messages: ChatCompletionMessageParam[],
  retrievalData: string,
): void => {
  const systemMessage: ChatCompletionMessageParam = {
    role: 'system',
    content:
      'You are an expert in agenda planning.\n' +
      'When the user requests "prepare my day" or similar, generate a structured response containing:\n' +
      '- `reply`: A brief response.\n' +
      '- `summaryOfTheDay`: A concise overview.\n' +
      '- `agenda`: A chronological breakdown of key events.\n' +
      '- `todos`: A list of tasks for the day.\n' +
      'Use the retrieved data to enhance accuracy.\n' +
      'For any other questions, only populate `reply` and avoid setting `summaryOfTheDay`, `agenda`, or `todos`.\n' +
      `Here is the retrieved data from various sources (calendar, email, docs, etc.): ${retrievalData}`,
  };

  messages.unshift(systemMessage);
};

@Injectable()
export class ChatService {
  async prepareMyDay(
    retrievalData: string,
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletionMessageParam[]> {
    appendSystemMessages(messages, retrievalData);

    console.log(messages);

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
