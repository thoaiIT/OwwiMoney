'use client';
import { signOut, useSession } from 'next-auth/react';
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
      <button
        onClick={() => {
          signOut({ redirect: false }).then(async () => {
            router.push('/login');
          });
        }}
      >
        logout
      </button>
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default Dashboard;
