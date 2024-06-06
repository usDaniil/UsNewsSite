import type { AxiosResponse } from 'axios';
import axios from 'axios';

const aiApiService = axios.create({ baseURL: process.env.BASE_API_AI });
aiApiService.interceptors.response.use(
  (value): AxiosResponse<unknown> => value.data,
);
aiApiService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);
export default aiApiService;
