import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../../../app/api/auth/[...nextauth]/options';
import Dashboard from './Dashboard';

const Page = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.emailConfirmed) redirect('/verification');

  console.log('MEMBER PAGE:', session?.user);
  return <Dashboard />;
};

export default Page;
