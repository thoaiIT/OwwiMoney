'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });
  useEffect(() => {
    if (!session?.user?.emailConfirmed) redirect('/verification');
    console.log(session);
  });
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
