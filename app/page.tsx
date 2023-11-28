import { options } from '@/app/api/auth/[...nextauth]/options';
import HomePage from '@/components/home/Home';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(options);

  if (session?.user) {
    redirect('/dashboard');
  } else {
    console.log('Session has expired');
  }

  return <HomePage />;
}
