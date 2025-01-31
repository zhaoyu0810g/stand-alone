import axios, { AxiosResponse } from 'axios';
import { ChatResponse, Message } from '../types';
import { serverURL } from './const';

export const chatService = {
  async post(messages: Message[]): Promise<AxiosResponse<Message[]>> {
    return axios.post<Message[]>( `${serverURL}/chat`, {messages});
  },

  async test(): Promise<AxiosResponse<ChatResponse>> {
    return axios.get<ChatResponse>(`${serverURL}/chat/test`);
  }
}