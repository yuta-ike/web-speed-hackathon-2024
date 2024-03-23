import ky from 'ky';

import { getEnv } from '../../../../app/src/lib/env/getEnv';

const createKyInstance = () => {
  const instance = ky.create({
    credentials: 'include',
    prefixUrl: getEnv('API_URL', '/'),
    timeout: false,
  });

  return instance;
};

export const apiClient = createKyInstance();
