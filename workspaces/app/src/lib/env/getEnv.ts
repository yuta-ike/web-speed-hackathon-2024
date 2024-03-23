export const getEnv = (envName: string, defaultValue?: string) => {
  if (import.meta.env?.['VITE_IS_VITE'] === 'true' && envName === 'API_URL') {
    return 'http://localhost:8000/';
  }
  return process.env[envName] || defaultValue;
};
