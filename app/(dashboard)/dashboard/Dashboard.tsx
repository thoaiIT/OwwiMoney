'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();
  useEffect(() => {
    if (!session?.user?.emailConfirmed) router.replace('/verification');
    console.log(session);
  }, [session]);
  return (
    <div>
      Dashboard
      <hr />
      <Link href="/api/auth/signout?callbackUrl=/login">Logout</Link>
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default Dashboard;
