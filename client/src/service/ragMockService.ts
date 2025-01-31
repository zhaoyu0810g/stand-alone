import axios, { AxiosResponse } from 'axios';
import { serverURL } from './const';

export const ragMockService = {
  async update(data: string): Promise<AxiosResponse<string>> {
    return axios.post<string>(`${serverURL}/mock`, {data});
  },

  async get(): Promise<AxiosResponse<string>> {
    return axios.get<string>(`${serverURL}/mock`);
  },

  async gen(): Promise<AxiosResponse<string>> {
    return axios.get<string>(`${serverURL}/mock/gen`);
  }

}