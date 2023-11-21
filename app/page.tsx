'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(options);

  if (session?.user) {
    redirect('/dashboard');
  } else {
    console.log('Session has expired');
  }

  return <div className="ml-6">Home</div>;
}
