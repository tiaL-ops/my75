import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const saveData = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getData = (key: string): any | null => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};
