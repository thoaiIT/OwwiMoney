import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
  interface User extends DefaultUser {
    emailConfirmed: boolean | unknown;
    userId: string | unknown;
  }
  interface Session {
    user?: User;
  }
}
