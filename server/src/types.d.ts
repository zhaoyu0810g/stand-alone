export type Agenda = {
  startTime: string;
  endTime: string;
  agendaSubject: string;
  agendaDetails: string;
  myPreparation: string;
  source: string;
  isHighPriority: boolean;
};

export type TODO = {
  shortSummary: string;
  source: string;
  isHighPriority: boolean;
};

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string | ChatResponse;
};

export type ChatCompletion = {
  model: string;
  messages: Message[];
  response_format: string;
};

export type ChatResponse = {
  summaryOftheDay: string;
  agenda: AgendaType[];
  todos: TODOType[];
  reply: string;
};

export type PrepareMyDayResponse = {
  chatResponse: ChatResponse;
  messages: Message[];
};
