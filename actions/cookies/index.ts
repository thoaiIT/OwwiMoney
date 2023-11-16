'use server';
import { cookies } from 'next/headers';
import { encrypt } from '../../helper/lib/hash';
export const setCookies = (key: string, value: string, hash?: boolean) => {
  const cookieStorage = cookies();
  cookieStorage.set(key, hash ? encrypt(value) : value);
};

export const deleteCookies = (key: string) => {
  const cookieStorage = cookies();
  cookieStorage.delete(key);
};
