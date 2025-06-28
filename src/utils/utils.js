import { Platform } from 'react-native';

export const getOllamaUrl = (url) => {
    if (url) return url;
  if (Platform.OS === 'android') return 'http://10.0.2.2:11434';
  return 'http://localhost:11434';
};