'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteCookies, setCookies } from '../../../actions/cookies';

const Dashboard: React.FC<any> = ({ currentUser }) => {
  const router = useRouter();
  console.log({ currentUser, check: currentUser && !currentUser.emailConfirmed });
  if (currentUser && !currentUser.emailConfirmed) {
    (async () => {
      await setCookies('emailConfirmed', currentUser.emailConfirmed);
      // router.push('/verification');
    })();
  }
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
