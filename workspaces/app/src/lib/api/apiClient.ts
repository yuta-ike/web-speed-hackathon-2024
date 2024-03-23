import axios from 'axios';

import { getEnv } from '../env/getEnv';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: getEnv('API_URL', '/'),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const apiClient = createAxiosInstance();
