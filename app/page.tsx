'use server';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();

  if (session?.expires) {
    router.replace('/dashboard');
  } else {
    console.log('Session has expired');
  }

  return <div className="ml-6">Home</div>;
}
