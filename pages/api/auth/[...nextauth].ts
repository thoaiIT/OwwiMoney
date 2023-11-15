import { type AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../helper/lib/prismadb';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) { 
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) throw new Error('User not found');
        if (!user.email) {
          throw new Error('Invalid email');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password );
        
        if (!isCorrectPassword) throw new Error('Invalid password');
      
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
  
  }
};
export default NextAuth(authOptions);
