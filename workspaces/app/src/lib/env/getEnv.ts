export const getEnv = (envName: string, defaultValue?: string) => {
  return process.env[envName] || defaultValue;
};
