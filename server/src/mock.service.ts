import { Injectable } from '@nestjs/common';

import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import "dotenv/config"; // Load environment variables

// TODO: Remove the below code, log the OPENAI_API_KEY environment variable during prototype for easier debugging
console.log("ChatService", process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const mockDataContract = z.object({
  fromZoomWorkingCalendar: z.array(z.string()),
  fromGooglePersonalCalendar: z.array(z.string()),
  messengersFromFriends: z.array(z.string()),
  messengersFromWifeAndMom: z.array(z.string()),
});

let defaultMockData = JSON.stringify({
  "fromZoomWorkingCalendar": [
    "11:00 AM - Research Team Sync-up: Discussing the latest advancements in AI algorithms and machine learning models. Prepare questions related to the new research paper on neural networks before the meeting.",
    "2:00 PM - AI Project Update: Presentation on the current progress of the ongoing AI automation tool project. Prepare a summary of the key milestones achieved this month.",
    "4:30 PM - Client Collaboration Session: Discussion with the client on integrating facial recognition technology into their security software. Review the integration documents and prepare a feasibility report before the call."
  ],
  "fromGooglePersonalCalendar": [
    "7:00 PM - Dentist Appointment: Don't forget the dentist appointment downtown at Dr. Smith's clinic.",
    "6:00 PM - Yoga Class: Join the evening yoga class for relaxation and stress management techniques.",
    "8:00 PM - Dinner with Family: Family dinner night, make sure to arrive at The Green Olive restaurant."
  ],
  "messengersFromFriends": [
    "Tom: \"Hey, are you available for lunch today? It's been a while since we caught up. Let's meet at our usual spot around 12:30 PM.\"",
    "Jessica: \"Hi! Let's plan our weekend hiking trip. Are you free to chat this evening about the routes and logistics?\"",
    "Mark: \"Game night at my place on Friday! Bring your favorite board games and snacks. What time works for you?\""
  ],
  "messengersFromWifeAndMom": [
    "Wife: \"Hey love, can you pick up some groceries from the supermarket on your way home? We need milk, bread, and eggs.\"",
    "Mom: \"Dear, I just read about a storm in Seattle. Can you check the latest weather update and let me know if everything is okay?\"",
    "Brother: \"Can you help me set up the new smart speaker I just bought? I'll stop by tomorrow evening. Let me know if that's alright.\""
  ]
});

@Injectable()
export class MockService {
  async gen(): Promise<string> {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert at generating mock data from email, messages, calendar of an AI engineer, your response should be the direct answer, including a lot of details and rich information" },
        {
          role: "user", content: "help to write an mock retrieval result, from email, messages, calendar of an AI engineer. The response should be raw text, split into 4 parts "
            + "first part is line of strings, have 4 mock meetings, should have string, ending, AI engineer related meetings, mock the meeting description, need have some content about preparation from this AI engineer"
            + "second part is line of strings, have 2 family calenars, the time should before/after working hour e.g. dentist appointment at 1:00pm today"
            + "thrid part is raw text. have 3 messages received from friends, e.g. Tom want to schedule lunch with him today lunch, another friend want to schedule activity with this AI engineer. "
            + "fourth part is line of strings, have 3 messages received from family member, e.g. wife asking to buy something from super market, Mom asking to check weather of Seattle"
        }],
      response_format: zodResponseFormat(mockDataContract, "mockData"),
    });

    const parsed = completion.choices[0].message.parsed;

    defaultMockData = JSON.stringify(parsed, null, 2);
    return defaultMockData;
  }

  setMockData(data: string): string {
    defaultMockData = data;
    return defaultMockData
  }


  getMockData(): string {
    return defaultMockData;
  }
}
