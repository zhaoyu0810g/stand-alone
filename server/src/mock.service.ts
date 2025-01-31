import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import 'dotenv/config'; // Load environment variables

// TODO: Remove the below code, log the OPENAI_API_KEY environment variable during prototype for easier debugging
console.log('ChatService', process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const mockDataContract = z.object({
  fromZoomWorkingCalendar: z.array(z.string()),
  fromGooglePersonalCalendar: z.array(z.string()),
  messengersFromFriends: z.array(z.string()),
  messengersFromWifeAndMom: z.array(z.string()),
});

let defaultMockData = JSON.stringify({
  fromZoomWorkingCalendar: [
    'Meeting with AI Ethics Committee - 10:00 AM-12:00 PM - Join the ethics committee to discuss guidelines for responsible AI development. Prepare notes on current AI systems ethics implications.',
    'Deep Learning Model Review - 1:30 PM-3:00 PM - Review the recent improvements in neural network architecture with the R&D team. Bring prepared visualizations on model performance statistics.',
    "Algorithm Optimization and Performance Tuning - 3:30 PM-5:00 PM - Analyze current algorithm's efficiency and explore optimization techniques. Prepare a report on resource utilization.",
    "Weekly AI Engineering Team Sync - 5:30 PM-6:30 PM - Weekly sync meeting to address team progress and upcoming deadlines. Prepare a summary document of your team's achievements.",
  ],
  fromGooglePersonalCalendar: [
    'Dentist Appointment - 7:30 AM - Routine check-up and cleaning before starting the day.',
    "Dinner with Family - 7:00 PM - Reservation at Le Gourmet to celebrate Dad's birthday.",
  ],
  messengersFromFriends: [
    'Tom: "Hey! Want to grab lunch today around 12:30 at our usual spot? Let me know what you think!"',
    'Lucy: "How about a hiking trip this Sunday morning? It\'ll be fun to catch up and enjoy some fresh air!"',
    'Raj: "Caught the latest AI conference online. Let\'s discuss over a game night this Friday?"',
  ],
  messengersFromWifeAndMom: [
    'Wife: "Hey love, can you pick up some groceries on your way back? Need veggies and milk. Thanks!"',
    'Mom: "Can you check the weather forecast for Seattle? I\'m planning my visit and want to pack accordingly."',
    'Wife: "Don\'t forget about the parent-teacher meeting tomorrow evening. Let\'s go together after work."',
  ],
});

@Injectable()
export class MockService {
  async gen(): Promise<string> {
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at generating mock data from email, messages, calendar of an AI engineer, your response should be the direct answer, including a lot of details and rich information',
        },
        {
          role: 'user',
          content:
            'help to write an mock retrieval result, from email, messages, calendar of an AI engineer. The response should be raw text, split into 4 parts ' +
            'first part is line of strings, have 4 mock meetings, should have string, ending, AI engineer related meetings, mock the meeting description, need have some content about preparation from this AI engineer' +
            'second part is line of strings, have 2 family calenars, the time should before/after working hour e.g. dentist appointment at 1:00pm today' +
            'thrid part is raw text. have 3 messages received from friends, e.g. Tom want to schedule lunch with him today lunch, another friend want to schedule activity with this AI engineer. ' +
            'fourth part is line of strings, have 3 messages received from family member, e.g. wife asking to buy something from super market, Mom asking to check weather of Seattle',
        },
      ],
      response_format: zodResponseFormat(mockDataContract, 'mockData'),
    });

    const parsed = completion.choices[0].message.parsed;

    defaultMockData = JSON.stringify(parsed, null, 2);
    return defaultMockData;
  }

  setMockData(data: string): string {
    defaultMockData = data;
    return defaultMockData;
  }

  getMockData(): string {
    return defaultMockData;
  }
}
