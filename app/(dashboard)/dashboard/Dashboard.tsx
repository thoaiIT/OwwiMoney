'use client';
import FormSheet from '@/components/Sheet/FormSheet';
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
    if (!session?.user?.emailConfirmed) router.replace('/verification'); // todo: show modal alert
    console.log(session);
  }, [session]);
  return (
    <div>
      Dashboard
      <hr />
      <Link href="/api/auth/signout?callbackUrl=/login">Logout</Link>
      <FormSheet
        titleSheet="Are you sure absolutely sure?"
        side={'right'}
        allowCloseOutside
      >
        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
      </FormSheet>
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default Dashboard;
