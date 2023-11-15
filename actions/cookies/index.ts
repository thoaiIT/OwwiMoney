'use server';
import { cookies } from 'next/headers';
import { encrypt } from '../../helper/lib/hash';
export const setCookies = (key: string, value: string) => {
  const cookieStorage = cookies();
  cookieStorage.set(key, value);
};

export const deleteCookies = (key: string) => {
  const cookieStorage = cookies();
  cookieStorage.delete(key);
};
