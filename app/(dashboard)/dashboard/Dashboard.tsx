'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteCookies } from '../../../actions/cookies';

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      Dashboard
      <hr />
      <button
        onClick={() => {
          signOut({ redirect: false }).then(async () => {
            await deleteCookies('isAuthenticated');
            router.push('/login');
          });
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
