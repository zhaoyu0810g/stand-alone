import axios, { AxiosResponse } from 'axios';
import { ChatResponse, Message } from '../types';

export interface Item {
  id: number;
  name: string;
  description?: string;
}

export const chatService = {
  async post(messages: Message[]): Promise<AxiosResponse<Message[]>> {
    return axios.post<Message[]>("http://localhost:3000/chat", {messages});
  },

  async test(): Promise<AxiosResponse<ChatResponse>> {
    return axios.get<ChatResponse>("http://localhost:3000/chat/test");
  }
}