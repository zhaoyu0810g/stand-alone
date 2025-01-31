import axios, { AxiosResponse } from 'axios';

export const ragMockService = {
  async update(data: string): Promise<AxiosResponse<string>> {
    return axios.post<string>("http://localhost:3000/mock", {data});
  },

  async get(): Promise<AxiosResponse<string>> {
    return axios.get<string>("http://localhost:3000/mock");
  },

  async gen(): Promise<AxiosResponse<string>> {
    return axios.get<string>("http://localhost:3000/mock/gen");
  }

}