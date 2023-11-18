'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC<any> = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect("/api/auth/signin?callbackUrl=/ClientMember");
    // },
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
