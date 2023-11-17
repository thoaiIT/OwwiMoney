'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteCookies } from '../../../actions/cookies';

const Dashboard: React.FC<any> = () => {
  const router = useRouter();

  return (
    <div>
      Dashboard
      <hr />
      <button
        onClick={() => {
          signOut({ redirect: false }).then(async () => {
            await deleteCookies('isAuthenticated');
            await deleteCookies('emailConfirmed');
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
